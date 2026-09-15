import 'react-native-url-polyfill/auto';
import { AppState, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// These two values come from the .env file. Expo only passes variables
// through to the app if the name starts with EXPO_PUBLIC_.
const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (url === '' || key === '') {
  console.warn('Supabase keys are missing. Check your .env file.');
}

export const supabase = createClient(url, key, {
  auth: {
    // A browser has localStorage to remember you are signed in.
    // A phone does not, so AsyncStorage does that job instead.
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    // There is no browser address bar on a phone, so there is no
    // sign-in link to read a session out of.
    detectSessionInUrl: false,
  },
});

// Sign-in tokens expire. This keeps refreshing them while the app is
// open, so the user is not kicked out in the middle of using it.
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}