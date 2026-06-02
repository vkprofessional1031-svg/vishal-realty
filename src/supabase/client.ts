import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Bulletproof URL validation to prevent Supabase SDK from crashing on startup due to placeholder strings
const isValidUrl = (urlStr: string | undefined): boolean => {
  if (!urlStr || urlStr.startsWith('your_') || urlStr.includes('_project_url')) return false;
  try {
    new URL(urlStr);
    return true;
  } catch (_) {
    return false;
  }
};

let supabaseClient: any;

if (isValidUrl(supabaseUrl) && supabaseAnonKey && !supabaseAnonKey.startsWith('your_')) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    "⚠️ Supabase is not configured or contains placeholder keys in your .env file.\n" +
    "Using a mock client proxy to prevent application crash. Public website will load static coming soon fallbacks."
  );

  // A premium recursive chaining proxy that returns empty states gracefully instead of crashing
  const createMockProxy = (): any => {
    const mockHandler = {
      get: (target: any, prop: string): any => {
        if (prop === 'then') {
          return (resolve: any) => resolve({ 
            data: { session: null, publicUrl: '' }, 
            error: new Error("Supabase is not configured. Please fill in `.env` file credentials.") 
          });
        }
        
        // Handle standard properties like 'auth' or 'storage'
        if (prop === 'auth') {
          return new Proxy({}, mockHandler);
        }
        if (prop === 'storage') {
          return new Proxy({}, mockHandler);
        }

        // Return a proxy function that supports method chaining
        const mockFn = () => new Proxy({}, mockHandler);
        return new Proxy(mockFn, mockHandler);
      },
      apply: (target: any, thisArg: any, argumentsList: any): any => {
        return new Proxy({}, mockHandler);
      }
    };
    return new Proxy({}, mockHandler);
  };

  supabaseClient = createMockProxy();
}

export const supabase = supabaseClient;
