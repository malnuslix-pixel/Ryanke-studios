import { createServerSupabaseClient, verifyAdminAuth } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const defaultDocumentaries = [
  {
    id: 'default-doc-1',
    title: 'Voices of Impact: Grassroots Transformation',
    description: 'A cinematic deep-dive documentary covering community resilience, conservation, and human connection in rural and metropolitan Kenya.',
    drive_url: 'https://drive.google.com/drive/folders/1exampleRyankeyDocs',
    thumbnail_url: '/gallery/corporate.jpg',
    duration: '18 min',
    client_or_topic: 'Community & NGO Storytelling',
    year: '2025',
    cta_label: 'Watch Documentary',
    is_featured: true,
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'default-doc-2',
    title: 'Borders of Elegance: Architectural & Aerial Kenya',
    description: 'Capturing landmark architectural developments and breathtaking 4K aerial cinematography from Rift Valley to Nairobi skies.',
    drive_url: 'https://drive.google.com/drive/folders/1exampleRyankeyAerial',
    thumbnail_url: '/gallery/creative.jpg',
    duration: '12 min',
    client_or_topic: 'Commercial & Aerial Cinema',
    year: '2025',
    cta_label: 'Watch on Google Drive',
    is_featured: false,
    is_active: true,
    sort_order: 2,
  },
];

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('documentaries')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      // Graceful fallback to default seed documentaries
      return NextResponse.json(defaultDocumentaries);
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(defaultDocumentaries);
  }
}

export async function POST(request: Request) {
  try {
    const isAuthed = await verifyAdminAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.drive_url) {
      return NextResponse.json({ error: 'Title and Google Drive URL are required' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('documentaries')
      .insert({
        title: body.title,
        description: body.description || '',
        drive_url: body.drive_url,
        thumbnail_url: body.thumbnail_url || '/gallery/corporate.jpg',
        duration: body.duration || '15 min',
        client_or_topic: body.client_or_topic || 'Documentary',
        year: body.year || new Date().getFullYear().toString(),
        cta_label: body.cta_label || 'Watch Documentary',
        is_featured: Boolean(body.is_featured),
        is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
        sort_order: Number(body.sort_order) || 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
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

    if (!id) {
      return NextResponse.json({ error: 'Missing documentary id' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('documentaries')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const isAuthed = await verifyAdminAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing documentary id' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const { error } = await supabase
      .from('documentaries')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}
