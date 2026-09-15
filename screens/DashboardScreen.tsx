import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles, colors } from '../styles/theme';
import { signOut } from '../lib/api';
import { Profile } from '../types';

// What each role will eventually be able to do. Showing this makes
// the plan visible instead of leaving the screen looking empty.
const PLANNED: Record<string, string[]> = {
  customer: [
    'Post an errand',
    'Choose a runner',
    'Track the delivery',
    'Release the held payment',
    'Rate the runner',
  ],
  runner: [
    'See open errands nearby',
    'Accept a job and set a fee',
    'Update the delivery status',
    'View earnings',
  ],
  admin: [
    'See every errand in the city',
    'Review reported problems',
    'Decide where held money goes',
    'View reports',
  ],
};

// What already works, so the progress is clear at a glance.
const DONE = [
  'Register a new account',
  'Sign in with email and password',
  'Passwords hashed on the server',
  'Stay signed in after closing the app',
  'Profile saved in the database',
  'Screen changes based on the role',
];

type Props = { profile: Profile };

export default function DashboardScreen({ profile }: Props) {
  const initials = profile.full_name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // created_at comes from Postgres as a text timestamp, so it has to
  // be turned into a Date before it can be formatted.
  const joined = new Date(profile.created_at).toLocaleDateString('en-PH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={[styles.avatar, { backgroundColor: colors.gold }]}>
              <Text style={[styles.avatarText, { color: colors.ink }]}>{initials}</Text>
            </View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.headerHi}>{profile.full_name}</Text>
              <Text style={styles.headerSub}>
                Signed in as a {profile.role}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={signOut}>
            <Text style={[styles.tiny, { color: colors.gold, fontWeight: 'bold' }]}>
              Sign out
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionLabel}>YOUR ACCOUNT</Text>
        <View style={styles.card}>
          <Row label="Name" value={profile.full_name} />
          <Row label="Role" value={capitalise(profile.role)} />
          {profile.vehicle !== '' && <Row label="Vehicle" value={profile.vehicle} />}
          <Row label="Member since" value={joined} last />
        </View>

        <Text style={styles.sectionLabel}>WORKING NOW</Text>
        <View style={styles.card}>
          {DONE.map((item, i) => (
            <View
              key={item}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 7,
                borderBottomWidth: i === DONE.length - 1 ? 0 : 1,
                borderBottomColor: colors.line,
              }}
            >
              <View
                style={{
                  width: 18, height: 18, borderRadius: 9,
                  backgroundColor: colors.green,
                  justifyContent: 'center', alignItems: 'center',
                  marginRight: 11,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' }}>
                  ✓
                </Text>
              </View>
              <Text style={[styles.body14, { flex: 1 }]}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>COMING NEXT</Text>
        <View style={styles.card}>
          {PLANNED[profile.role].map((item, i) => (
            <View
              key={item}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 7,
                borderBottomWidth: i === PLANNED[profile.role].length - 1 ? 0 : 1,
                borderBottomColor: colors.line,
              }}
            >
              <View
                style={{
                  width: 18, height: 18, borderRadius: 9,
                  borderWidth: 1.5, borderColor: colors.line,
                  marginRight: 11,
                }}
              />
              <Text style={[styles.body14, { flex: 1, color: colors.muted }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.escrow, { marginTop: 20 }]}>
          <View style={styles.escrowLock}>
            <Text style={{ fontSize: 15 }}>🔒</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.escrowAmount}>Payments held until delivery</Text>
            <Text style={styles.escrowNote}>
              The main idea of PasaBuy, built in the next milestone
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.infoRow, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.muted}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function capitalise(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
