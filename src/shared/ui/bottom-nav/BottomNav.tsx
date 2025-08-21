"use client";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.css";

export type BottomNavProps = {
  labels?: {
    home?: string;
    marketplace?: string;
    settings?: string;
  };
};

export const BottomNav: React.FC<BottomNavProps> = ({
  labels = { home: "Home", marketplace: "Marketplace", settings: "Settings" },
}) => {
  const pathname = usePathname();
  const isMarketplace = pathname?.startsWith("/marketplace");
  const isSettings = pathname?.startsWith("/settings");
  const isHome = pathname === "/";
  return (
    <nav className={`${styles.container} glass-border`}>
      <div className="max-w-6xl flex mr-auto ml-auto pt-4 pr-6 pb-4 pl-6 items-center justify-center">
        <div className="flex gap-12 text-sm text-gray-400 items-center">
          <a href="/" className={`transition-colors flex flex-col items-center gap-1 ${isHome ? "text-white" : "hover:text-white"}`} aria-current={isHome ? "page" : undefined}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="home" className="lucide lucide-home w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span>{labels.home}</span>
          </a>
          <a href="/marketplace" className={`transition-colors flex flex-col items-center gap-1 ${isMarketplace ? "text-white" : "hover:text-white"}`} aria-current={isMarketplace ? "page" : undefined}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="shopping-bag" className="lucide lucide-shopping-bag w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="M16 10a4 4 0 0 1-8 0"></path><path d="M3.103 6.034h17.794"></path><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path></svg>
            <span>{labels.marketplace}</span>
          </a>
          <a href="/settings" className={`transition-colors flex flex-col items-center gap-1 ${isSettings ? "text-white" : "hover:text-white"}`} aria-current={isSettings ? "page" : undefined}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="settings" className="lucide lucide-settings w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <span>{labels.settings}</span>
          </a>
        </div>
      </div>
    </nav>
  );
};


