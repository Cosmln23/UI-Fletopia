import React from "react";
import styles from "./MarketplaceTabs.module.css";

export type TabKey = "all-offers" | "my-cargo" | "my-quotes" | "active-deals";
export type UserRole = "shipper" | "carrier" | "admin";

export type MarketplaceTabsProps = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  onAddCargo?: () => void;
  role?: UserRole;
  counts?: Partial<Record<TabKey, number>>;
};

export const MarketplaceTabs: React.FC<MarketplaceTabsProps> = ({ active, onChange, onAddCargo, role = "carrier", counts }) => {
  const baseTabs: { key: TabKey; label: string; visible: boolean }[] = [
    { key: "all-offers", label: "ALL LOADS", visible: true },
    { key: "my-cargo", label: "MY CARGO", visible: role !== "carrier" },
    { key: "my-quotes", label: "MY BIDS", visible: role !== "shipper" },
    { key: "active-deals", label: "ACTIVE DEALS", visible: true },
  ];
  const tabs = baseTabs.filter((t) => t.visible);
  return (
    <div className="flex items-center justify-between mb-8 animate-on-scroll in-view">
      <div className={`${styles.tabs} text-sm text-gray-400`}>
        {tabs.map((t) => {
          const badge = counts?.[t.key];
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              className={`hover:text-white transition-colors border-b pb-2 ${isActive ? "tab-active border-transparent" : "border-transparent"}`}
              onClick={() => onChange(t.key)}
            >
              <span className="inline-flex items-center gap-2">
                {t.label}
                {typeof badge === 'number' ? (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/90 text-black' : 'bg-white/10 text-white'}`}>{badge}</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <button className="glass-border hover:bg-white/5 transition-all flex gap-2 text-sm font-medium text-white bg-gray-900 rounded-lg pt-2 pr-6 pb-2 pl-6 items-center" type="button" onClick={() => onAddCargo?.()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="plus" className="w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
          Post Cargo
        </button>
      </div>
    </div>
  );
};


