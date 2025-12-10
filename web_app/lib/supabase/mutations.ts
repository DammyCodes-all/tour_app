// lib/supabase/mutations.ts
import { createClient } from './client';
import { Tour, TourStep } from '@/lib/types';
import { toast } from 'sonner';

const supabase = createClient();

export const createTourInDb = async (title: string, description: string): Promise<Tour | null> => {
  const { data, error } = await supabase
    .from('tours')
    .insert([{ title, description, is_published: false }])
    .select()
    .single();

  if (error) {
    console.error('Error creating tour:', error);
    toast.error('Failed to create tour.');
    return null;
  }

  toast.success('Tour created successfully!');
  return data;
};

export const updateTourInDb = async (tourId: string, title: string, description: string): Promise<Tour | null> => {
  const { data, error } = await supabase
    .from('tours')
    .update({ title, description })
    .eq('id', tourId)
    .select()
    .single();

  if (error) {
    console.error('Error updating tour:', error);
    toast.error('Failed to update tour.');
    return null;
  }

  toast.success('Tour updated successfully!');
  return data;
};

export const deleteTourInDb = async (tourId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('tours')
    .delete()
    .eq('id', tourId);

  if (error) {
    console.error('Error deleting tour:', error);
    toast.error('Failed to delete tour.');
    return false;
  }

  toast.success('Tour deleted successfully!');
  return true;
};

export const addStepToDb = async (
  tour_id: string,
  stepData: Omit<TourStep, 'id' | 'step_number' | 'step_id'>,
  step_number: number
): Promise<TourStep | null> => {
  const step_id = `${tour_id}-step-${step_number}`; // Generate a simple step_id

  const { data, error } = await supabase
    .from('tour_steps')
    .insert([
      {
        tour_id,
        title: stepData.title,
        content: stepData.content,
        target_selector: stepData.target_selector,
        step_number,
        step_id,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding step:', error);
    toast.error('Failed to add step.');
    return null;
  }

  toast.success('Step added successfully!');
  return data;
};

export const updateStepInDb = async (updatedStep: TourStep): Promise<TourStep | null> => {
  const { id, title, content, target_selector, step_number, step_id } = updatedStep; // include all required fields
  const { data, error } = await supabase
    .from('tour_steps')
    .update({ title, content, target_selector, step_number, step_id }) // include all fields that might be updated
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating step:', error);
    toast.error('Failed to update step.');
    return null;
  }

  toast.success('Step updated successfully!');
  return data;
};

export const deleteStepInDb = async (stepId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('tour_steps')
    .delete()
    .eq('id', stepId);

  if (error) {
    console.error('Error deleting step:', error);
    toast.error('Failed to delete step.');
    return false;
  }

  toast.success('Step deleted successfully!');
  return true;
};
