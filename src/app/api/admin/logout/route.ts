import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    cookies().delete('ryankey_admin_session');
    try {
      const supabase = createServerSupabaseClient();
      await supabase.auth.signOut();
    } catch (e) {}

    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: true });
  }
}
