"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, Button } from '@/components/ui';
import { createBrowserClient } from '@/lib/supabase/client';
import { loginSchema } from '@/lib/validation/auth';

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const redirect = search.get('redirect') ?? '/marketplace';
  const initialError = search.get('error') ?? undefined;
  const [loading, setLoading] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<Partial<Record<'email' | 'password', string>>>({});
  const [formError, setFormError] = React.useState<string | null>(initialError ?? null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});
    const form = new FormData(e.currentTarget);
    const emailEntry = form.get('email');
    const passwordEntry = form.get('password');
    const rememberEntry = form.get('remember');
    const email = typeof emailEntry === 'string' ? emailEntry : '';
    const password = typeof passwordEntry === 'string' ? passwordEntry : '';
    const remember = typeof rememberEntry === 'string' ? rememberEntry === 'on' : false;

    const parsed = loginSchema.safeParse({ email, password, remember });
    if (!parsed.success) {
      const errs: Partial<Record<'email' | 'password', string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === 'email' || key === 'password') errs[key] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }

    try {
      setLoading(true);
      // Remember me cookie (used by server/middleware cookie strategy)
      document.cookie = `ft_remember_me=${remember ? '1' : '0'}; path=/`;
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setFormError(error.message);
        return;
      }
      router.replace(redirect);
    } catch (err) {
      setFormError('A apărut o eroare. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass-border rounded-xl p-5 text-gray-100">
      <div className="mb-4">
        <Input name="email" type="email" label="Email" placeholder="you@example.com" error={fieldErrors.email} required />
      </div>
      <div className="mb-2">
        <Input name="password" type="password" label="Parolă" placeholder="••••••••" error={fieldErrors.password} required />
      </div>
      <div className="flex items-center justify-between mb-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input name="remember" type="checkbox" className="accent-white" />
          <span className="text-gray-300">Ține-mă minte</span>
        </label>
        <a href="/signup" className="text-gray-300 hover:text-white">Nu ai cont? Înregistrează-te</a>
      </div>
      {formError ? <div className="text-red-400 text-sm mb-3">{formError}</div> : null}
      <Button type="submit" loading={loading} className="w-full">Autentificare</Button>
    </form>
  );
}


