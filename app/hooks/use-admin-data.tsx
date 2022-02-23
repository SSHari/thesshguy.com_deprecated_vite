import { useMatches } from 'remix';
import type { User } from '@supabase/supabase-js';

// Provide admin data access to child admin routes
export function useAdminData() {
  const matches = useMatches();
  const adminRoot = matches.find((match) => match.pathname === '/admin');
  return adminRoot?.data as { user: User };
}
