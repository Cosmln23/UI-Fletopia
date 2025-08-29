import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Lazy import to avoid build-time env validation
    const mod = await import('@/lib/supabase/server');
    const supabase = mod.createServerClient();
    const { error } = await supabase.auth.getSession();
    if (error) throw error;
    return NextResponse.json({ status: 'ok' });
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}



