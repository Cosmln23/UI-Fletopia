import { NextResponse, type NextRequest } from 'next/server';
import { loginSchema } from '@/lib/validation/auth';

const AUTH_ROUTES = new Set<string>(['/login', '/signup', '/auth/callback']);

function sanitizeRedirect(input: unknown): string {
  const raw = typeof input === 'string' ? input : '';
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || AUTH_ROUTES.has(raw)) {
    return '/marketplace';
  }
  return raw;
}

export async function POST(req: NextRequest) {
  // Lazy import to avoid build-time env validation
  const mod = await import('@/lib/supabase/server');
  const supabase = mod.createServerClient();
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
  const redirectTo = sanitizeRedirect(redirectEntry);

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message || 'Invalid credentials';
    const url = new URL('/login', origin);
    url.searchParams.set('error', first);
    url.searchParams.set('redirect', redirectTo);
    return NextResponse.redirect(url, { status: 303 });
  }

  const { email, password, remember } = parsed.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  const res = NextResponse.redirect(new URL(redirectTo, origin), { status: 303 });
  // set remember cookie for server cookie lifetime decisions
  res.cookies.set('ft_remember_me', remember ? '1' : '0', { path: '/' });
  if (error) {
    const url = new URL('/login', origin);
    url.searchParams.set('error', error.message);
    url.searchParams.set('redirect', redirectTo);
    return NextResponse.redirect(url, { status: 303 });
  }
  return res;
}


