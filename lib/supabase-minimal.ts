import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://qdirlasdpsdgwoypgnri.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkaXJsYXNkcHNkZ3dveXBnbnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MDcyOTgsImV4cCI6MjA2ODQ4MzI5OH0.Jj8UH92iNw3-guZf4nzg-ToRYhdOnUGeoRX6CcFRR6U';

// Create Supabase client with minimal configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase; 