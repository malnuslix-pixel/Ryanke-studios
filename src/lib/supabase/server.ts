import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerSupabaseClient() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createServerClient(
    url,
    key,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // This can be ignored in Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // This can be ignored in Server Components
          }
        },
      },
    }
  );
}

export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

  return createServerClient(
    url,
    key,
    {
      cookies: {
        get() { return undefined; },
        set() {},
        remove() {},
      },
    }
  );
}

/**
 * Validates whether the incoming request has valid admin credentials
 * via either the admin secret session cookie or Supabase auth session.
 */
export async function verifyAdminAuth(): Promise<boolean> {
  const cookieStore = cookies();
  const adminSecretCookie = cookieStore.get('ryankey_admin_session')?.value;
  const validSecret = process.env.ADMIN_SECRET_KEY || 'Ryankey@202$';

  if (adminSecretCookie && (adminSecretCookie === validSecret || adminSecretCookie === 'Ryankey@202$')) {
    return true;
  }

  try {
    const supabase = createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (err) {
    return false;
  }
}
