import { supabase } from './supabase';
import { Profile, Role } from '../types';

// Every call to the server lives in this file. No screen talks to
// Supabase directly, so if the backend ever changes, it changes here.

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  role: Role,
  vehicle: string
) {
  // The data object is handed to the database trigger, which uses it
  // to build the profile row automatically.
  const { error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: { full_name: fullName.trim(), role, vehicle: vehicle.trim() },
    },
  });
  if (error) throw error;
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) throw error;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getMyProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}