import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { styles, colors } from '../styles/theme';
import { signUp } from '../lib/api';
import { Role } from '../types';

type Props = { navigation: any };

export default function SignUpScreen({ navigation }: Props) {
  const [role, setRole] = useState<Role>('customer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSignUp() {
    if (fullName.trim() === '' || email.trim() === '') {
      Alert.alert('Missing details', 'Please fill in your name and email.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Check the email', 'An email address needs an @ sign.');
      return;
    }
    if (role === 'runner' && vehicle.trim() === '') {
      Alert.alert('Missing vehicle', 'Runners need a vehicle and plate number.');
      return;
    }
    // Supabase rejects anything shorter, so catch it here with a
    // clearer message than the server would give.
    if (password.length < 6) {
      Alert.alert('Password too short', 'Use at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Passwords do not match', 'Type the same password twice.');
      return;
    }

    setBusy(true);
    try {
      await signUp(email, password, fullName, role, vehicle);
      // App.tsx notices the new session and moves us into the app.
    } catch (e: any) {
      Alert.alert('Could not create the account', friendly(e.message));
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
        <Text style={[styles.h2, { marginTop: 10 }]}>Create account</Text>
        <Text style={[styles.muted, { marginTop: 6, marginBottom: 22 }]}>
          Pick how you want to use PasaBuy. You can make a second account later
          for the other role.
        </Text>

        <Text style={styles.label}>I am joining as</Text>
        <View style={{ flexDirection: 'row', marginBottom: 18 }}>
          <RolePill label="Customer" on={role === 'customer'} onPress={() => setRole('customer')} />
          <RolePill label="Runner" on={role === 'runner'} onPress={() => setRole('runner')} />
        </View>

        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Prince Bolo"
          placeholderTextColor={colors.muted}
        />

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

        {/* Only runners are asked for this, so the form stays short
            for customers. */}
        {role === 'runner' && (
          <View>
            <Text style={styles.label}>Vehicle and plate number</Text>
            <TextInput
              style={styles.input}
              value={vehicle}
              onChangeText={setVehicle}
              placeholder="Motorcycle · ABC 1234"
              placeholderTextColor={colors.muted}
            />
          </View>
        )}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="At least 6 characters"
          placeholderTextColor={colors.muted}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          style={styles.input}
          value={confirm}
          onChangeText={setConfirm}
          placeholder="••••••••"
          placeholderTextColor={colors.muted}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} onPress={handleSignUp} disabled={busy}>
          {busy ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <Text style={styles.btnText}>
              {role === 'runner' ? 'Create runner account' : 'Create account'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnGhost} onPress={() => navigation.goBack()}>
          <Text style={styles.btnGhostText}>I already have an account</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function RolePill({
  label, on, onPress,
}: { label: string; on: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1, alignItems: 'center', paddingVertical: 11, borderRadius: 20,
        borderWidth: 1, marginRight: 8,
        backgroundColor: on ? colors.ink : colors.card,
        borderColor: on ? colors.ink : colors.line,
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: '600', color: on ? '#FFFFFF' : colors.text }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function friendly(message: string) {
  if (message.includes('already registered')) {
    return 'That email already has an account. Try signing in instead.';
  }
  if (message.toLowerCase().includes('network')) {
    return 'No connection. Check your internet and try again.';
  }
  return message;
}
