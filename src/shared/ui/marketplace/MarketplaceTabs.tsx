import React from "react";
import styles from "./MarketplaceTabs.module.css";

export type TabKey = "all-offers" | "my-cargo" | "my-quotes" | "active-deals";

export type MarketplaceTabsProps = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  onAddCargo?: () => void;
};

export const MarketplaceTabs: React.FC<MarketplaceTabsProps> = ({ active, onChange, onAddCargo }) => {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "all-offers", label: "ALL OFFERS" },
    { key: "my-cargo", label: "MY CARGO" },
    { key: "my-quotes", label: "MY QUOTES" },
    { key: "active-deals", label: "ACTIVE DEALS" },
  ];
  return (
    <div className="flex items-center justify-between mb-8 animate-on-scroll in-view">
      <div className={`${styles.tabs} text-sm text-gray-400`}>
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`hover:text-white transition-colors border-b pb-2 ${active === t.key ? "tab-active border-transparent" : "border-transparent"}`}
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:text-white transition-colors flex items-center gap-2 text-sm text-gray-400 pt-2 pr-6 pb-2 pl-6" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="trash-2" className="w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          Delete Cargo
        </button>
        <button className="glass-border hover:bg-white/5 transition-all flex gap-2 text-sm font-medium text-white bg-gray-900 rounded-lg pt-2 pr-6 pb-2 pl-6 items-center" type="button" onClick={() => onAddCargo?.()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="plus" className="w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
          Add Cargo
        </button>
      </div>
    </div>
  );
};


