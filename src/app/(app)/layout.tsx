import React, { Suspense } from 'react';
import { BottomNav, FooterSection } from '@/shared/ui';
import { TopNavbar } from '@/shared/ui/top-navbar/TopNavbar';
import { AppShell } from '@/shared/ui/layout/AppShell';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={
        <>
          <TopNavbar />
          <BottomNav />
        </>
      }
      footer={<FooterSection />}
    >
      <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
        {children}
      </Suspense>
    </AppShell>
  );
}


