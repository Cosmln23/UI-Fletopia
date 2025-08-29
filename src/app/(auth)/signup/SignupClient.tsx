"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, Button } from '@/components/ui';
import { createBrowserClient } from '@/lib/supabase/client';
import { signupSchema, userMetadataSchema } from '@/lib/validation/auth';

export default function SignupClient() {
  const router = useRouter();
  const search = useSearchParams();
  const redirect = search.get('redirect') ?? '/marketplace';
  const [loading, setLoading] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<Partial<Record<'email' | 'password' | 'confirm' | 'userType' | 'termsAccepted', string>>>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = React.useState<'weak' | 'medium' | 'strong' | null>(null);

  function estimateStrength(pw: string): 'weak' | 'medium' | 'strong' {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
    return score >= 3 ? 'strong' : score === 2 ? 'medium' : 'weak';
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});
    const form = new FormData(e.currentTarget);
    const emailEntry = form.get('email');
    const passwordEntry = form.get('password');
    const confirmEntry = form.get('confirm');
    const userTypeEntry = form.get('userType');
    const termsAccepted = form.get('termsAccepted') === 'on';
    const fullNameEntry = form.get('full_name');
    const companyNameEntry = form.get('company_name');

    const email = typeof emailEntry === 'string' ? emailEntry : '';
    const password = typeof passwordEntry === 'string' ? passwordEntry : '';
    const confirm = typeof confirmEntry === 'string' ? confirmEntry : '';
    const userType = typeof userTypeEntry === 'string' ? userTypeEntry : '';
    const full_name = typeof fullNameEntry === 'string' && fullNameEntry.trim() ? fullNameEntry.trim() : undefined;
    const company_name = typeof companyNameEntry === 'string' && companyNameEntry.trim() ? companyNameEntry.trim() : undefined;

    const parsed = signupSchema.safeParse({ email, password, confirm, userType, termsAccepted, full_name, company_name });
    if (!parsed.success) {
      const errs: typeof fieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof errs;
        errs[key] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }

    try {
      setLoading(true);
      const supabase = createBrowserClient();
      const origin = window.location.origin;
      const md = userMetadataSchema.parse({
        user_type: parsed.data.userType,
        full_name: parsed.data.full_name,
        company_name: parsed.data.company_name,
      });
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          data: md,
          emailRedirectTo: `${origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
        },
      });
      if (error) {
        setFormError(error.message);
        return;
      }
      router.replace(`/login?error=${encodeURIComponent('Verifică email-ul pentru confirmare')}&redirect=${encodeURIComponent(redirect)}`);
    } catch {
      setFormError('A apărut o eroare. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={(e) => { void onSubmit(e); }} className="glass-border rounded-xl p-5 text-gray-100">
      <div className="mb-4">
        <Input name="email" type="email" label="Email" placeholder="you@example.com" required {...(fieldErrors.email ? { error: fieldErrors.email } : {})} />
      </div>
      <div className="mb-2">
        <Input
          name="password"
          type="password"
          label="Parolă"
          placeholder="••••••••"
          onChange={(e) => setPasswordStrength(estimateStrength(e.currentTarget.value))}
          required
          {...(fieldErrors.password ? { error: fieldErrors.password } : {})}
        />
        {passwordStrength ? (
          <div className="text-xs mt-1" aria-live="polite">
            Forță parolă: {passwordStrength === 'weak' ? 'slabă' : passwordStrength === 'medium' ? 'medie' : 'puternică'}
          </div>
        ) : null}
      </div>
      <div className="mb-2">
        <Input name="confirm" type="password" label="Confirmă parola" placeholder="••••••••" required {...(fieldErrors.confirm ? { error: fieldErrors.confirm } : {})} />
      </div>
      <div className="mb-3">
        <label className="block text-sm text-gray-300 mb-1">Tip utilizator</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="userType" value="shipper" className="accent-white" />
            <span className="text-gray-300">Shipper</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="userType" value="carrier" className="accent-white" />
            <span className="text-gray-300">Carrier</span>
          </label>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          <div>- Shipper: postează încărcături pentru transport</div>
          <div>- Carrier: acceptă curse și gestionează flota</div>
        </div>
        {fieldErrors.userType ? <div className="text-red-400 text-sm mt-1">{fieldErrors.userType}</div> : null}
      </div>
      <div className="mb-3 grid grid-cols-1 gap-3">
        <Input name="full_name" type="text" label="Nume complet (opțional)" placeholder="Nume Prenume" />
        <Input name="company_name" type="text" label="Nume companie (opțional)" placeholder="Ex: ACME Logistics SRL" />
      </div>
      <div className="mb-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input name="termsAccepted" type="checkbox" className="accent-white" />
          <span className="text-gray-300">Sunt de acord cu termenii și condițiile</span>
        </label>
        {fieldErrors.termsAccepted ? <div className="text-red-400 text-sm mt-1">{fieldErrors.termsAccepted}</div> : null}
      </div>
      {formError ? <div className="text-red-400 text-sm mb-3">{formError}</div> : null}
      <Button type="submit" loading={loading} className="w-full">Creează cont</Button>
      <div className="text-sm text-gray-300 mt-3 text-center">
        Ai deja cont? <a href="/login" className="hover:text-white">Autentifică-te</a>
      </div>
    </form>
  );
}


