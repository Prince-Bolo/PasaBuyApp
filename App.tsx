import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';

import { supabase } from './lib/supabase';
import { getMyProfile } from './lib/api';
import { Profile } from './types';
import { colors, styles } from './styles/theme';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';

const Stack = createNativeStackNavigator();

const headerStyle = {
  headerStyle: { backgroundColor: colors.ink },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: 'bold' as const },
  contentStyle: { backgroundColor: colors.bg },
};

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check whether we are already signed in from last time. This is
    // what keeps you logged in after closing the app.
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session === null) setLoading(false);
    });

    // Then listen for sign in and sign out. This is what swaps the
    // whole app between the login screens and the dashboard, so no
    // screen has to navigate manually after signing in.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s === null) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Once there is a session, fetch the profile so we know the name
  // and the role.
  useEffect(() => {
    if (session === null) return;
    setLoading(true);
    getMyProfile(session.user.id)
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [session]);

  if (loading) {
    return (
      <View style={[styles.screen, styles.center]}>
        <ActivityIndicator size="large" color={colors.ink} />
        <Text style={[styles.muted, { marginTop: 12 }]}>Starting PasaBuy...</Text>
      </View>
    );
  }

  // ---------- not signed in ----------
  if (session === null || profile === null) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={headerStyle}>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ title: 'PasaBuy' }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: 'Create account' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // ---------- signed in ----------
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Dashboard" options={{ title: 'Dashboard' }}>
          {(props) => <DashboardScreen {...props} profile={profile} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
