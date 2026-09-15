import { StyleSheet } from 'react-native';

// Every colour in the app. Change one line here and the whole app changes.
export const colors = {
  ink: '#0F3D3E',
  ink2: '#17595C',
  gold: '#F5B700',
  bg: '#EEF1F0',
  card: '#FFFFFF',
  text: '#132321',
  muted: '#6B7A78',
  line: '#DDE4E2',
  green: '#2E7D5B',
  red: '#B23A48',
  amber: '#8A6800',
};

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { padding: 18 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },

  // ---------- text ----------
  h1: { fontSize: 26, fontWeight: 'bold', color: colors.text },
  h2: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  sectionLabel: {
    fontSize: 11, fontWeight: 'bold', color: colors.muted,
    letterSpacing: 1, marginTop: 20, marginBottom: 10,
  },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  body14: { fontSize: 14, color: colors.text, lineHeight: 21 },
  muted: { fontSize: 13, color: colors.muted },
  tiny: { fontSize: 11, color: colors.muted },
  bold: { fontWeight: '600' },

  // ---------- dark header ----------
  header: {
    backgroundColor: colors.ink, padding: 18, paddingTop: 20,
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerHi: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  headerSub: { color: '#A9C2C0', fontSize: 12, marginTop: 2 },
  headerBox: {
    backgroundColor: colors.ink2, borderRadius: 12, padding: 14, marginTop: 14,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  headerBoxLabel: { color: '#A9C2C0', fontSize: 11 },
  headerBoxValue: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginTop: 2 },

  // ---------- cards ----------
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 10 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  emptyCard: {
    backgroundColor: colors.card, borderRadius: 12, padding: 24,
    alignItems: 'center', borderWidth: 1, borderColor: colors.line,
    borderStyle: 'dashed', marginTop: 6,
  },

  // ---------- buttons ----------
  btn: {
    backgroundColor: colors.gold, borderRadius: 11, paddingVertical: 15,
    alignItems: 'center', marginBottom: 10,
  },
  btnText: { color: colors.text, fontSize: 15, fontWeight: 'bold' },
  btnDark: { backgroundColor: colors.ink },
  btnDarkText: { color: '#FFFFFF' },
  btnGhost: {
    backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.ink,
    borderRadius: 11, paddingVertical: 13, alignItems: 'center', marginBottom: 10,
  },
  btnGhostText: { color: colors.ink, fontSize: 14, fontWeight: '600' },
  btnDanger: { borderColor: colors.red },
  btnDangerText: { color: colors.red },
  btnSmall: { paddingVertical: 9, paddingHorizontal: 14, borderRadius: 9, marginBottom: 0 },
  btnSmallText: { fontSize: 13 },

  // ---------- inputs ----------
  input: {
    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line,
    borderRadius: 10, paddingHorizontal: 13, paddingVertical: 12,
    fontSize: 15, color: colors.text, marginBottom: 14,
  },
  inputTall: { height: 88, textAlignVertical: 'top' },

  // ---------- status pill ----------
  pill: { borderRadius: 6, paddingHorizontal: 9, paddingVertical: 4 },
  pillText: { fontSize: 11, fontWeight: 'bold' },

  // ---------- escrow band, the signature piece ----------
  escrow: {
    backgroundColor: colors.ink, borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 14,
  },
  escrowLock: {
    width: 34, height: 34, borderRadius: 9, backgroundColor: colors.gold,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  escrowAmount: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  escrowNote: { color: '#A9C2C0', fontSize: 11, marginTop: 2 },

  // ---------- status steps ----------
  step: { flexDirection: 'row', marginBottom: 2 },
  stepDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.line },
  stepBar: { width: 2, flex: 1, backgroundColor: colors.line, marginVertical: 2 },
  stepCol: { alignItems: 'center', marginRight: 11 },
  stepText: { paddingBottom: 16, flex: 1 },

  // ---------- info rows ----------
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: colors.line,
  },
  infoValue: { fontSize: 13, fontWeight: '600', color: colors.text, flexShrink: 1, textAlign: 'right', marginLeft: 12 },

  // ---------- misc ----------
  avatar: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: colors.ink2,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  stars: { color: colors.gold, fontSize: 16, letterSpacing: 2 },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  stat: {
    backgroundColor: colors.card, borderRadius: 12, padding: 13,
    width: '50%', marginBottom: 10,
  },
  statInner: { margin: 5 },
  statValue: { fontSize: 21, fontWeight: 'bold', color: colors.text },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 12 },
});

// Colour and label for each status, kept in one place so every screen agrees.
export const statusInfo: Record<string, { label: string; bg: string; fg: string }> = {
  posted:     { label: 'Looking for a runner', bg: '#FDF2D6', fg: colors.amber },
  accepted:   { label: 'Runner accepted',      bg: '#FDF2D6', fg: colors.amber },
  buying:     { label: 'Buying your items',    bg: '#FDF2D6', fg: colors.amber },
  delivering: { label: 'On the way',           bg: '#FDF2D6', fg: colors.amber },
  delivered:  { label: 'Waiting for you',      bg: '#E4F1EA', fg: colors.green },
  completed:  { label: 'Completed',            bg: '#E4F1EA', fg: colors.green },
  disputed:   { label: 'Reported',             bg: '#FBE9EB', fg: colors.red },
  refunded:   { label: 'Refunded',             bg: '#FBE9EB', fg: colors.red },
};
