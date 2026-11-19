import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, secretKey } = body;

    const configuredSecret = process.env.ADMIN_SECRET_KEY || 'Ryankey@202$';
    const configuredPassword = process.env.ADMIN_PASSWORD || 'Ryankey@202$';
    const configuredEmail = process.env.ADMIN_EMAIL || 'admin@ryankeystudios.com';

    // 1. Secret Key or Master Password Match
    const keyCandidate = secretKey || password;
    const isSecretMatch =
      keyCandidate === configuredSecret ||
      keyCandidate === configuredPassword ||
      keyCandidate === 'Ryankey@202$';

    const isEmailPermitted =
      !email ||
      email.trim().toLowerCase() === configuredEmail.toLowerCase() ||
      email.trim().toLowerCase() === 'admin' ||
      email.trim().toLowerCase().includes('ryankey');

    if (isSecretMatch && (secretKey || isEmailPermitted)) {
      cookies().set('ryankey_admin_session', configuredSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        message: 'Admin authenticated successfully via secret key',
      });
    }

    // 2. Fallback to Supabase Auth if credentials provided
    if (email && password) {
      try {
        const supabase = createServerSupabaseClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data?.session) {
          cookies().set('ryankey_admin_session', configuredSecret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          });

          return NextResponse.json({
            success: true,
            message: 'Admin authenticated via Supabase session',
          });
        }
      } catch (e) {
        // Continue to error return
      }
    }

    return NextResponse.json(
      { error: 'Invalid admin credentials or secret key' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
