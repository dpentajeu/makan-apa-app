import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client with React Native specific configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper functions for common operations
export const supabaseHelpers = {
  // Auth helpers
  auth: {
    signUp: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { data, error };
    },

    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      return { error };
    },

    getCurrentUser: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      return { user, error };
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      return supabase.auth.onAuthStateChange(callback);
    },
  },

  // Database helpers
  db: {
    // Generic query helper
    query: async (table: string, query?: any) => {
      let queryBuilder = supabase.from(table).select('*');
      
      if (query) {
        Object.keys(query).forEach(key => {
          queryBuilder = queryBuilder.eq(key, query[key]);
        });
      }
      
      const { data, error } = await queryBuilder;
      return { data, error };
    },

    // Insert helper
    insert: async (table: string, data: any) => {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select();
      return { data: result, error };
    },

    // Update helper
    update: async (table: string, id: string, data: any) => {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select();
      return { data: result, error };
    },

    // Delete helper
    delete: async (table: string, id: string) => {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      return { error };
    },
  },

  // Storage helpers
  storage: {
    uploadFile: async (bucket: string, path: string, file: any) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file);
      return { data, error };
    },

    getPublicUrl: (bucket: string, path: string) => {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);
      return data.publicUrl;
    },

    deleteFile: async (bucket: string, path: string) => {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);
      return { error };
    },
  },
};

export default supabase; 