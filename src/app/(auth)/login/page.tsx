import React, { Suspense } from 'react';
import LoginClient from './LoginClient';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="glass-border rounded-xl p-5 text-gray-100">Se încarcă...</div>}>
      <LoginClient />
    </Suspense>
  );
}


