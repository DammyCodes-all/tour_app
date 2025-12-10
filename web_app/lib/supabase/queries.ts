// lib/supabase/queries.ts

import { Tour, TourAnalytics } from '@/lib/types';
import { createClient } from './client';

const supabase = createClient();

/**
 * NOTE: This is a placeholder for a real Supabase query.
 * In a real implementation, you would use the Supabase client to fetch data.
 *
 * Example:
 * const { data, error } = await supabase.from('tours').select('*');
 */

export const getTours = async (userId: string): Promise<Tour[]> => {
  console.log(`Fetching tours for user: ${userId} from Supabase`);
  
  // Step 1: Fetch the basic tour data for the user
  const { data: tours, error } = await supabase
    .from('tours')
    .select('id, title, description, created_at, is_published')
    .eq('user_id', userId);

  if (error) {
    console.error("Error fetching tours (simple query):", error);
    // Let the calling function handle the toast message
    throw new Error("Failed to fetch tours.");
  }

  if (!tours || tours.length === 0) {
    return [];
  }

  // Step 2: Fetch the steps for the retrieved tours
  const tourIds = tours.map(t => t.id);
  const { data: steps, error: stepsError } = await supabase
      .from('tour_steps')
      .select('*')
      .in('tour_id', tourIds);

  if (stepsError) {
      console.error("Error fetching steps separately:", stepsError);
      // If steps fail, return tours without steps and log the issue
      return tours.map(t => ({ ...t, steps: [] }));
  }

  // Step 3: Manually join tours and steps in code
  const toursWithSteps = tours.map(tour => ({
      ...tour,
      steps: steps.filter(step => step.tour_id === tour.id) || []
  }));

  return toursWithSteps;
};

export const getTourById = async (tourId: string): Promise<Tour | null> => {
  console.log(`Fetching tour with id: ${tourId} from Supabase`);
  const { data: fetchedTour, error } = await supabase
    .from('tours')
    .select('*, tour_steps(*)')
    .eq('id', tourId)
    .single();

  if (error) {
    console.error(`Error fetching tour ${tourId}:`, error);
    return null;
  }

  if (fetchedTour) {
    const tour: Tour = {
      ...fetchedTour,
      steps: fetchedTour.tour_steps || [], // Map tour_steps to steps
    };
    // Clean up the original tour_steps property if it exists, to match Tour interface
    delete (tour as any).tour_steps;
    return tour;
  }
  return null;
};

export const getTourAnalytics = async (tourId: string): Promise<TourAnalytics | null> => {
  console.log(`Fetching analytics for tour ${tourId} (Supabase)`);

  // Fetch tour-level summaries
  const { data: tourSummary, error: tourSummaryError } = await supabase
    .from('tour_daily_summary')
    .select('total_starts, total_completions')
    .eq('tour_id', tourId)
    .order('summary_date', { ascending: false })
    .limit(1)
    .single();

  if (tourSummaryError && tourSummaryError.code !== 'PGRST116') { // PGRST116 means 0 rows
    console.error(`Error fetching tour daily summary for ${tourId}:`, tourSummaryError);
    return null;
  }

  // Fetch step-level summaries
  const { data: stepSummaries, error: stepSummariesError } = await supabase
    .from('step_daily_summary')
    .select('step_id, step_skips, step_drop_offs')
    .eq('tour_id', tourId)
    .order('summary_date', { ascending: false })
    .limit(100); // Limit to a reasonable number of steps per tour for now

  if (stepSummariesError && stepSummariesError.code !== 'PGRST116') {
    console.error(`Error fetching step daily summary for ${tourId}:`, stepSummariesError);
    return null;
  }

  const dropOffs: Record<string, number> = {};
  let totalSkips = 0;

  if (stepSummaries) {
    stepSummaries.forEach(summary => {
      if (summary.step_id) {
        dropOffs[summary.step_id] = summary.step_drop_offs || 0;
      }
      totalSkips += summary.step_skips || 0;
    });
  }

  return {
    tourId: tourId,
    starts: tourSummary?.total_starts || 0,
    completions: tourSummary?.total_completions || 0,
    dropOffs: dropOffs,
    skips: totalSkips,
  };
};

export const getAllToursAnalytics = async (tourIds: string[]): Promise<Record<string, TourAnalytics>> => {
  console.log("Fetching analytics for specific tours (Supabase)");
  const analyticsMap: Record<string, TourAnalytics> = {};

  if (tourIds.length === 0) {
    return analyticsMap;
  }

  // Fetch all tour-level summaries for the specific tours
  const { data: allTourSummaries, error: allTourSummariesError } = await supabase
    .from('tour_daily_summary')
    .select('*')
    .in('tour_id', tourIds);

  if (allTourSummariesError) {
    console.error('Error fetching all tour summaries:', allTourSummariesError);
    return analyticsMap;
  }

  // Process to get the latest summary for each tour
  const latestTourSummaries = allTourSummaries.reduce((acc, summary) => {
    if (!acc[summary.tour_id] || new Date(summary.summary_date) > new Date(acc[summary.tour_id].summary_date)) {
      acc[summary.tour_id] = summary;
    }
    return acc;
  }, {} as Record<string, typeof allTourSummaries[0]>);

  // Fetch all step-level summaries for the specific tours
  const { data: allStepSummaries, error: allStepSummariesError } = await supabase
    .from('step_daily_summary')
    .select('*')
    .in('tour_id', tourIds);
  
  if (allStepSummariesError) {
    console.error('Error fetching all step summaries:', allStepSummariesError);
    return analyticsMap;
  }

  // Process to get the latest summary for each step
  const latestStepSummaries = allStepSummaries.reduce((acc, summary) => {
    const key = `${summary.tour_id}-${summary.step_id}`;
    if (!acc[key] || new Date(summary.summary_date) > new Date(acc[key].summary_date)) {
      acc[key] = summary;
    }
    return acc;
  }, {} as Record<string, typeof allStepSummaries[0]>);

  // Populate the analyticsMap
  for (const tourId in latestTourSummaries) {
    const summary = latestTourSummaries[tourId];
    analyticsMap[tourId] = {
      tourId: tourId,
      starts: summary.total_starts || 0,
      completions: summary.total_completions || 0,
      dropOffs: {},
      skips: 0,
    };
  }

  for (const key in latestStepSummaries) {
    const summary = latestStepSummaries[key];
    if (analyticsMap[summary.tour_id]) {
      analyticsMap[summary.tour_id].dropOffs[summary.step_id] = summary.step_drop_offs || 0;
      analyticsMap[summary.tour_id].skips += summary.step_skips || 0;
    }
  }

  return analyticsMap;
};
