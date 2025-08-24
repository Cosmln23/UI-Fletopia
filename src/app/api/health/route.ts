import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createServerClient();
    // simple ping via a lightweight RPC (auth check)
    const { error } = await supabase.auth.getSession();
    if (error) throw error;
    return NextResponse.json({ status: 'ok' });
  } catch (e) {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}



