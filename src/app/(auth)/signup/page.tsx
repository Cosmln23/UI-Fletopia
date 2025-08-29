import React, { Suspense } from 'react';
import SignupClient from './SignupClient';

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="glass-border rounded-xl p-5 text-gray-100">Se încarcă...</div>}>
      <SignupClient />
    </Suspense>
  );
}


