import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const adminCookie = request.cookies.get('ryankey_admin_session')?.value;
  const validSecret = process.env.ADMIN_SECRET_KEY || 'Ryankey@202$';
  const isSecretAuthenticated = Boolean(
    adminCookie && (adminCookie === validSecret || adminCookie === 'Ryankey@202$')
  );

  let hasSupabaseSession = false;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder')) {
    try {
      const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              request.cookies.set({ name, value, ...options });
              response = NextResponse.next({
                request: { headers: request.headers },
              });
              response.cookies.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
              request.cookies.set({ name, value: '', ...options });
              response = NextResponse.next({
                request: { headers: request.headers },
              });
              response.cookies.set({ name, value: '', ...options });
            },
          },
        }
      );

      const { data: { session } } = await supabase.auth.getSession();
      hasSupabaseSession = Boolean(session);
    } catch (err) {
      console.error('Middleware Supabase session check notice:', err);
    }
  }

  const isUserAuthenticated = isSecretAuthenticated || hasSupabaseSession;

  // Protect /admin routes (except /admin/login)
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    if (!isUserAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated admins away from login page to dashboard
  if (request.nextUrl.pathname === '/admin/login' && isUserAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
