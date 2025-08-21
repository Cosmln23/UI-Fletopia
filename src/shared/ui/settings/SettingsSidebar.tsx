import React from "react";
import styles from "./SettingsSidebar.module.css";

export type SettingsKey =
  | "profile"
  | "company"
  | "operational"
  | "subscription"
  | "preferences";

export type SettingsSidebarProps = {
  active: SettingsKey;
  onChange: (key: SettingsKey) => void;
};

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ active, onChange }) => {
  const items: { key: SettingsKey; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profil General", icon: Icons.settings },
    { key: "company", label: "Companie și Verificare", icon: Icons.user },
    { key: "operational", label: "Setări Operaționale (AI)", icon: Icons.zap },
    { key: "subscription", label: "Abonament și Facturare", icon: Icons.dollar },
    { key: "preferences", label: "Preferințe și Securitate", icon: Icons.lock },
  ];
  return (
    <aside className={`w-80 flex-shrink-0`}>
      <div className={`glass-card rounded-xl pt-6 pr-6 pb-6 pl-6 ${styles.sidebar}`}>
        <nav className="space-y-2">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={`flex items-center gap-3 transition-colors text-sm font-medium rounded-lg pt-3 pr-4 pb-3 pl-4 w-full text-left ${
                active === it.key ? "glass-border settings-nav-active" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="w-4 h-4 inline-block" aria-hidden>{it.icon}</span>
              {it.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

const Icons = {
  settings: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
  ),
  user: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  ),
  zap: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
  ),
  dollar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
  ),
  lock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
  ),
};


