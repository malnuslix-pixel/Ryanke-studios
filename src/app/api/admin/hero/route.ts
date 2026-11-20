import { createServerSupabaseClient, verifyAdminAuth } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const defaultHero = {
  headline: 'Your Vision, Our Lens',
  subheadline: 'Your Dream Studios',
  description: 'We capture moments that last forever.',
  hero_image_url: '/gallery/hero.jpg',
  cta_text: 'Book Now',
  cta_link: 'https://wa.me/254718445264',
  badge_texts: ['Professional Photography', 'Videography', 'Creative Direction'],
};

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('hero_section')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json(defaultHero);
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(defaultHero);
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
        .from('hero_section')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data);
    } else {
      const { data: existing } = await supabase.from('hero_section').select('id').limit(1).maybeSingle();
      if (existing?.id) {
        const { data, error } = await supabase
          .from('hero_section')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', existing.id)
          .select()
          .single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
      } else {
        const { data, error } = await supabase
          .from('hero_section')
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
