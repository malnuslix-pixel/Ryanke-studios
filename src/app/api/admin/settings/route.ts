import { createServerSupabaseClient, verifyAdminAuth } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const defaultSettings = {
  studio_name: 'Ryankey Studios',
  tagline: 'Your Dream Studios',
  phone_call: '+254 702 340 700',
  phone_whatsapp: '254718445264',
  email: 'ryankeyimages@gmail.com',
  address_line1: 'Nexus Business Centre',
  address_line2: 'Ruiru Bypass (Kamakis)',
  google_maps_embed_url: '',
  instagram_url: 'https://www.instagram.com/ryankey_studios',
  facebook_url: 'https://www.facebook.com/share/1BKdQC3xD3/',
  tiktok_url: 'https://www.tiktok.com/@_ryankey_',
  whatsapp_url: 'https://wa.me/254718445264',
  logo_url: '',
  favicon_url: '',
  meta_description: "Ryankey Studios is Nairobi's premier creative photography and videography studio.",
  og_image_url: '',
};

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json(defaultSettings);
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(defaultSettings);
  }
}

export async function PUT(request: Request) {
  try {
    const isAuthed = await verifyAdminAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;
    const supabase = createServerSupabaseClient();

    if (id) {
      const { data, error } = await supabase
        .from('site_settings')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data);
    } else {
      // If no ID exists yet, check if a row exists or insert
      const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();
      if (existing?.id) {
        const { data, error } = await supabase
          .from('site_settings')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', existing.id)
          .select()
          .single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
      } else {
        const { data, error } = await supabase
          .from('site_settings')
          .insert({ ...updates, updated_at: new Date().toISOString() })
          .select()
          .single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
      }
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}
