import React, { Suspense } from 'react';
import CallbackClient from './CallbackClient';

export const dynamic = 'force-dynamic';

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', color: 'rgba(255,255,255,0.85)' }}>Finalizăm autentificarea...</div>}>
      <CallbackClient />
    </Suspense>
  );
}


