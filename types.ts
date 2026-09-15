// These field names match the database columns exactly, so what you
// see in the Supabase table editor is what you write in the code.

export type Role = 'customer' | 'runner' | 'admin';

export type Profile = {
  id: string;
  full_name: string;
  role: Role;
  phone: string;
  vehicle: string;
  created_at: string;
};