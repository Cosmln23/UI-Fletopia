import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/lib/supabase/types';
import { loginSchema } from '@/lib/validation/auth';

const AUTH_ROUTES = new Set<string>(['/login', '/signup', '/auth/callback']);

function sanitizeRedirect(input: unknown): string {
  const raw = typeof input === 'string' ? input : '';
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || AUTH_ROUTES.has(raw)) {
    return '';
  }
  return raw;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const emailEntry = formData.get('email');
  const passwordEntry = formData.get('password');
  const rememberEntry = formData.get('remember');
  const redirectEntry = formData.get('redirect');

  const parsed = loginSchema.safeParse({
    email: typeof emailEntry === 'string' ? emailEntry : '',
    password: typeof passwordEntry === 'string' ? passwordEntry : '',
    remember: typeof rememberEntry === 'string' ? rememberEntry === 'on' : false,
  });

  const origin = new URL(req.url).origin;
  const requestedRedirect = sanitizeRedirect(redirectEntry);

  // Prepare response early for cookie mutations
  const res = NextResponse.redirect(new URL('/', origin), { status: 303 });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message || 'Invalid credentials';
    const url = new URL('/login', origin);
    url.searchParams.set('error', first);
    if (requestedRedirect) url.searchParams.set('redirect', requestedRedirect);
    return NextResponse.redirect(url, { status: 303 });
  }

  // set remember cookie for server cookie lifetime decisions
  const { email, password, remember } = parsed.data;
  res.cookies.set('ft_remember_me', remember ? '1' : '0', { path: '/' });

  // Create supabase client bound to req/res to persist cookies
  const mod = await import('@/lib/supabase/server');
  const supabase = mod.createRouteHandlerClient(req, res);
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const url = new URL('/login', origin);
    url.searchParams.set('error', error.message);
    if (requestedRedirect) url.searchParams.set('redirect', requestedRedirect);
    return NextResponse.redirect(url, { status: 303 });
  }

  // Determine final redirect: prefer requested redirect; else role-based default
  if (requestedRedirect) {
    return NextResponse.redirect(new URL(requestedRedirect, origin), { status: 303 });
  }

  try {
    // Fetch user profile role for default destination
    const { data: { user } } = await supabase.auth.getUser();
    let fallback = '/marketplace';
    if (user?.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle<{ role: Database['public']['Enums']['user_role'] }>();
      if (profile?.role === 'admin') fallback = '/dashboard';
      else if (profile?.role === 'shipper') fallback = '/marketplace';
      else fallback = '/marketplace';
    }
    return NextResponse.redirect(new URL(fallback, origin), { status: 303 });
  } catch {
    return NextResponse.redirect(new URL('/marketplace', origin), { status: 303 });
  }
}


