import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await request.json();

    const {
      client_name,
      client_phone,
      service,
      preferred_date,
      duration,
      details,
      source = 'form',
    } = body;

    if (!client_name || !client_phone) {
      return NextResponse.json(
        { error: 'Client name and phone are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        client_name,
        client_phone,
        service: service || 'General Inquiry',
        preferred_date: preferred_date || null,
        duration: duration || null,
        details: details || null,
        status: 'new',
        source,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
