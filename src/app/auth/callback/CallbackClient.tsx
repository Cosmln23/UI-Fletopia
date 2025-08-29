"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';

export default function CallbackClient() {
  const router = useRouter();
  const search = useSearchParams();

  React.useEffect(() => {
    const run = async () => {
      try {
        const supabase = createBrowserClient();
        const code = search.get('code');
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        }
      } catch {
        // ignore; if it fails, user can try login manually
      } finally {
        const redirectTo = search.get('redirect') || '/marketplace';
        router.replace(redirectTo);
      }
    };
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', color: 'rgba(255,255,255,0.85)' }}>
      Finalizăm autentificarea...
    </div>
  );
}


