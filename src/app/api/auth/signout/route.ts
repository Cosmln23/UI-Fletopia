import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const origin = new URL(req.url).origin;
  const res = NextResponse.redirect(new URL('/', origin));
  // Clear remember cookie regardless of Supabase state
  res.cookies.set('ft_remember_me', '0', { path: '/', maxAge: 0 });
  // Defer Supabase import to runtime to avoid build-time env validation
  try {
    const mod = await import('@/lib/supabase/server');
    const supabase = mod.createServerClient();
    await supabase.auth.signOut();
  } catch {
    // Ignore; best-effort signout. Cookie cleared and redirect performed.
  }
  return res;
}


