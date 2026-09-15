# PasaBuy — Milestone 1

Register, sign in, and a dashboard. Real accounts on a real database.

Only eight files. Nothing half-built to apologise for.

---

## Do these in order

### Step 1 — Make the backend (10 minutes)

Go to **supabase.com** and sign up free.

Click **New project**:
- Name: `pasabuy`
- Set a database password and write it down
- Region: **Southeast Asia (Singapore)**
- Wait about two minutes

### Step 2 — Make the table

Left sidebar → **SQL Editor** → **New query**.

Open `supabase/schema.sql` from this folder, copy everything, paste it in, press
**Run**.

You should see "Success. No rows returned". Click **Table Editor** in the
sidebar and you will see a `profiles` table.

### Step 3 — Turn off email confirmation

**Do not skip this.** It is the number one reason the app looks broken.

Go to **Authentication → Sign In / Providers → Email** and switch
**Confirm email** off.

Otherwise every account you make has to click a link in an email before it can
sign in, which makes demonstrating impossible.

### Step 4 — Copy your keys

**Project Settings → API**. Copy two things:
- **Project URL**
- the **anon public** key (the long one, NOT service role)

### Step 5 — Make the app

```bash
npx create-expo-app@latest PasaBuyApp --template expo-template-blank-typescript@sdk-54
cd PasaBuyApp
```

### Step 6 — Install packages

```bash
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

### Step 7 — Add your keys

Make a file called `.env` beside `package.json`:

```
EXPO_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=paste-your-anon-key-here
```

The names must start with `EXPO_PUBLIC_` or Expo ignores them.

Then open `.gitignore` and add a line saying `.env` so your keys never reach
GitHub.

### Step 8 — Copy the files in

```
PasaBuyApp/
  App.tsx              <- replace the one already there
  types.ts             <- beside App.tsx
  .env                 <- you made this in step 7
  lib/
    supabase.ts
    api.ts
  screens/
    SignInScreen.tsx
    SignUpScreen.tsx
    DashboardScreen.tsx
  styles/
    theme.ts
```

Three new folders: `lib`, `screens`, `styles`.

### Step 9 — Run it

```bash
npx expo start --clear
```

The `--clear` matters the first time, because Expo caches environment variables.

---

## Test it before class

1. Tap **Create an account**, fill it in as a Customer, submit
2. You land on the dashboard with your name on it
3. Tap **Sign out**
4. Sign back in with the same email and password
5. **Close Expo Go completely, reopen it.** You should still be signed in
6. Go to Supabase → **Table Editor → profiles**. Your row is there
7. Make a second account as a Runner. The dashboard shows different plans

Step 5 and step 6 are the two worth showing.

---

## Presenting it

**Opening**

"This is our progress on PasaBuy. We built the account system first, because
everything else depends on knowing who is using the app. What is working now is
registration, login, and a dashboard that changes based on your role."

**Then demo, in this order**

1. **Register.** "Signing up as a customer. Notice it checks the fields before
   sending anything to the server."
2. **Land on the dashboard.** "It greets me by name. That name came back from
   the database, not from the phone."
3. **Show the checklist on screen.** "Green ticks are what works now. Empty
   circles are the next milestone."
4. **Sign out and sign back in.** "Same account, and the password is checked on
   the server."
5. **Close the app fully and reopen it.** "Still signed in. The session is kept
   on the phone so users do not log in every time."
6. **Open Supabase on the laptop, show the profiles table.** "This is the real
   database. That row is the account I just made."
7. **Register a runner on a second account.** "The dashboard is different,
   because the app reads the role from the database."

Step 6 is the one that proves it is real. Have the Supabase tab already open.

**If asked what the backend is**

"Supabase. It gives us a Postgres database and an authentication system. The app
talks to it over HTTPS. Passwords are hashed on their servers, we never store or
see them."

**If asked how it is secured**

"Row Level Security. The rules are in the database itself, so they apply even if
someone bypasses our app and calls the API directly. Right now the rule is that
you can only edit your own profile."

**If asked what is next**

"The errands table, so a customer can post a job and a runner can accept it.
Then the held-payment logic, which is the main idea of the app."

---

## If something breaks

**"Supabase keys are missing"** — `.env` is in the wrong folder, or you did not
restart with `--clear`.

**Sign up works, sign in fails** — email confirmation is still on. Step 3.

**Sign up works but it sticks on loading** — the trigger did not run. Check
Table Editor → profiles. If empty, re-run `schema.sql`.

**Nothing loads** — check your internet. This version needs a connection.

---

## Making an admin account later

Sign up normally, then in Supabase go to **Table Editor → profiles**, find the
row, change `role` to `admin`, and sign out and back in.

There is no admin button on the sign-up screen on purpose. Anyone could tap it.
