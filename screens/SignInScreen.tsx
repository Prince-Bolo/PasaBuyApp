import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { styles, colors } from '../styles/theme';
import { signIn } from '../lib/api';

type Props = { navigation: any };

export default function SignInScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSignIn() {
    // Check the form before bothering the server.
    if (email.trim() === '' || password === '') {
      Alert.alert('Missing details', 'Enter your email and password.');
      return;
    }

    setBusy(true);
    try {
      await signIn(email, password);
      // Nothing to navigate to. App.tsx is listening for the sign-in
      // and swaps the whole navigator over by itself.
    } catch (e: any) {
      Alert.alert('Could not sign in', friendly(e.message));
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.screen} contentContainerStyle={styles.body}>
        <View
          style={{
            width: 56, height: 56, borderRadius: 17, backgroundColor: colors.ink,
            justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 22,
          }}
        >
          <Text style={{ color: colors.gold, fontSize: 26, fontWeight: 'bold' }}>P</Text>
        </View>

        <Text style={styles.h1}>Welcome back</Text>
        <Text style={[styles.muted, { marginTop: 6, marginBottom: 26 }]}>
          Sign in to post an errand or to start accepting jobs.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          placeholderTextColor={colors.muted}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor={colors.muted}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} onPress={handleSignIn} disabled={busy}>
          {busy ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <Text style={styles.btnText}>Sign in</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnGhost}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.btnGhostText}>Create an account</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Supabase error messages are written for developers. This turns the
// common ones into something a normal person can act on.
function friendly(message: string) {
  if (message.includes('Invalid login')) {
    return 'That email and password do not match an account.';
  }
  if (message.includes('Email not confirmed')) {
    return 'This account has not been confirmed yet.';
  }
  if (message.toLowerCase().includes('network')) {
    return 'No connection. Check your internet and try again.';
  }
  return message;
}
