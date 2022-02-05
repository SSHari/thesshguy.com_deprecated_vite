import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import invariant from 'tiny-invariant';

let supabase: SupabaseClient;

declare global {
  var __supabase: SupabaseClient | undefined;
}

const supabaseUrl = process.env.SUPABASE_URL;
invariant(!!supabaseUrl, 'The env variable SUPABASE_URL needs to be set.');

const supabaseKey = process.env.SUPABASE_KEY;
invariant(!!supabaseKey, 'The env variable SUPABASE_KEY needs to be set.');

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  if (!global.__supabase) {
    global.__supabase = createClient(supabaseUrl, supabaseKey);
  }
  supabase = global.__supabase;
}

export { supabase };
