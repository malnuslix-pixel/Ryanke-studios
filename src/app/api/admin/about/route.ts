import { createServerSupabaseClient, verifyAdminAuth } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const defaultAbout = {
  title: 'About Us',
  subtitle: 'Where Vision Meets Artistry',
  story: 'Ryankey Studios is a premier photography and videography studio dedicated to capturing compelling visual narratives.',
  ceo_name: 'Brian Abuga',
  ceo_title: 'Founder & Lead Photographer',
  ceo_image_url: '/gallery/founder.jpg',
  stats: [
    { value: '5000+', label: 'Clients Served' },
    { value: '1000+', label: 'Projects' },
    { value: '100+', label: 'Brands' },
  ],
  unique_points: [
    { title: 'Cinematic Precision', description: 'Industry-standard camera and lighting equipment' },
    { title: 'Creative Direction', description: 'Personalized guidance from moodboard to final delivery' },
  ],
};

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json(defaultAbout);
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(defaultAbout);
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
        .from('about_content')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data);
    } else {
      const { data: existing } = await supabase.from('about_content').select('id').limit(1).maybeSingle();
      if (existing?.id) {
        const { data, error } = await supabase
          .from('about_content')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', existing.id)
          .select()
          .single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
      } else {
        const { data, error } = await supabase
          .from('about_content')
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
