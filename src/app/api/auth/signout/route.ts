import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  const origin = new URL(req.url).origin;
  const res = NextResponse.redirect(new URL('/', origin));
  // Clear remember cookie
  res.cookies.set('ft_remember_me', '0', { path: '/', maxAge: 0 });
  return res;
}


