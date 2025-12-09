"use server";

import { createClient } from "@/lib/supabase/server";
export const SignUp = async (name: string, email: string, password: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: name } },
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Supabase client");
  }
};
export const LogIn = async (email: string, password: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Supabase client");
  }
};

export const LogOut = async () => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Supabase client");
  }
};
