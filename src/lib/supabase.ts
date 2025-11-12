import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SolLog {
  id: string;
  sol_number: number;
  quote: string;
  summary: string;
  tags: string[];
  created_at: string;
}

export interface ScienceProblem {
  id: string;
  category: string;
  description: string;
  quote: string;
  science_explanation: string;
  created_at: string;
}
