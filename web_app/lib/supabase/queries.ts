// lib/supabase/queries.ts

import { Tour } from '@/lib/types';
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

// Add other query placeholders as needed
// e.g., getStepsForTour, getTourAnalytics, etc.
