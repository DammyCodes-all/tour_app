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

export const getTours = async (): Promise<Tour[]> => {
  console.log("Fetching all tours from Supabase");
  const { data: tours, error } = await supabase.from('tours').select('*, tour_steps(*)');
  if (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
  return tours || [];
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

export const getAllToursAnalytics = async (): Promise<Record<string, TourAnalytics>> => {
  console.log("Fetching all tours analytics (Supabase)");
  const analyticsMap: Record<string, TourAnalytics> = {};

  // Fetch all tour-level summaries (most recent for each tour)
  const { data: allTourSummaries, error: allTourSummariesError } = await supabase
    .rpc('get_latest_tour_daily_summaries'); // Assuming an RPC to get latest summary for each tour

  if (allTourSummariesError) {
    console.error('Error fetching all tour summaries:', allTourSummariesError);
    return analyticsMap;
  }

  // Fetch all step-level summaries (most recent for each tour/step)
  const { data: allStepSummaries, error: allStepSummariesError } = await supabase
    .rpc('get_latest_step_daily_summaries'); // Assuming an RPC to get latest summary for each step

  if (allStepSummariesError) {
    console.error('Error fetching all step summaries:', allStepSummariesError);
    return analyticsMap;
  }

  allTourSummaries.forEach((summary: any) => {
    analyticsMap[summary.tour_id] = {
      tourId: summary.tour_id,
      starts: summary.total_starts || 0,
      completions: summary.total_completions || 0,
      dropOffs: {}, // Will be populated by stepSummaries
      skips: 0,     // Will be populated by stepSummaries
    };
  });

  allStepSummaries.forEach((summary: any) => {
    if (analyticsMap[summary.tour_id]) {
      analyticsMap[summary.tour_id].dropOffs[summary.step_id] = summary.step_drop_offs || 0;
      analyticsMap[summary.tour_id].skips += summary.step_skips || 0;
    }
  });

  return analyticsMap;
};
