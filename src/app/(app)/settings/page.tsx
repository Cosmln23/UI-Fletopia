"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FooterSection, SettingsSidebar, ProfileGeneralSection, CompanyVerificationSection, OperationalAISection, SubscriptionBillingSection, PreferencesSecuritySection } from "@/shared/ui";

type SettingsKey = Parameters<typeof SettingsSidebar>[0]["active"];

export default function SettingsPage() {
  const router = useRouter();
  const search = useSearchParams();
  const sectionFromQuery = useMemo(() => (search.get('section') as SettingsKey) ?? 'profile', [search]);
  const [active, setActive] = useState<SettingsKey>(sectionFromQuery);

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" } as IntersectionObserverInit;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    }, observerOptions);
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keep URL in sync when active changes
  useEffect(() => {
    const current = search.get('section');
    if (current !== active) {
      const params = new URLSearchParams(search.toString());
      params.set('section', active);
      router.replace(`/settings?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const breadcrumb = (
    <div className="mb-8">
      <nav className="text-sm text-gray-400 mb-1">
        <a href="/" className="hover:text-white">Home</a>
        <span className="mx-2">/</span>
        <span className="text-gray-300">Settings</span>
        <span className="mx-2">/</span>
        <span className="text-gray-100 capitalize">{active}</span>
      </nav>
      <h1 className="text-3xl font-semibold text-white tracking-tight">Settings</h1>
      <p className="text-gray-400">Gestionați contul, verificarea și preferințele aplicației</p>
    </div>
  );

  return (
    <div className="antialiased text-gray-100 bg-black pb-20">
      <section className="min-h-screen bg-[url(https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80)] bg-cover pt-20 pb-20">
        <div className="max-w-7xl mr-auto ml-auto pt-8 pr-6 pb-8 pl-6">
          {breadcrumb}
          <div className="flex gap-6 flex-col md:flex-row">
            <div className="md:w-auto w-full">
              <SettingsSidebar active={active} onChange={setActive} />
            </div>
            <div className="flex-1 w-full">
              <div className="glass-card rounded-xl pt-8 pr-8 pb-8 pl-8">
                {active === "profile" && <ProfileGeneralSection />}
                {active === "company" && <CompanyVerificationSection />}
                {active === "operational" && <OperationalAISection />}
                {active === "subscription" && <SubscriptionBillingSection />}
                {active === "preferences" && <PreferencesSecuritySection />}
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  );
}


