import React from "react";
import styles from "./QuickActionsSection.module.css";

export type QuickActionCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
};

export type QuickActionsSectionProps = {
  cards?: QuickActionCardProps[];
};

const DefaultCards: QuickActionCardProps[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="package" className="lucide lucide-package w-[20px] h-[20px]" style={{ strokeWidth: 1.5, width: 20, height: 20 }}><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
    ),
    title: "I have cargo to transport",
    description: "Quick cargo posting with AI-powered route optimization and instant carrier matching.",
    ctaLabel: "Get started",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="search" className="lucide lucide-search w-[20px] h-[20px]" style={{ strokeWidth: 1.5, width: 20, height: 20, color: "rgb(156, 163, 175)" }}><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
    ),
    title: "I'm looking for cargo to transport",
    description: "Browse available cargo loads with smart filtering and real-time availability updates.",
    ctaLabel: "Search loads",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="map-pin" className="lucide lucide-map-pin w-[20px] h-[20px] text-gray-400" style={{ strokeWidth: 1.5, width: 20, height: 20 }}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
    ),
    title: "Track My Shipments",
    description: "Monitor your active shipments in real-time.",
    ctaLabel: "View shipments",
  },
];

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({ cards = DefaultCards }) => {
  return (
    <section id="about" className={`${styles.section} max-w-4xl mr-auto ml-auto pt-24 pr-6 pb-24 pl-6`}>
      <div className="flex items-center gap-3 mb-12 animate-on-scroll in-view">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="zap" className="lucide lucide-zap w-5 h-5 text-gray-400" style={{ strokeWidth: 1.5 }}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
        <h2 className="text-xl font-medium text-white">Quick Actions</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="glass-card p-6 rounded-xl hover:bg-white/5 transition-all cursor-pointer animate-on-scroll in-view">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex bg-gray-400/10 rounded-lg items-center justify-center">{card.icon}</div>
              <h3 className="font-medium text-white">{card.title}</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4">{card.description}</p>
            <div className="flex gap-2 text-xs text-gray-400 items-center">
              <span>{card.ctaLabel}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" className="lucide lucide-arrow-right w-3 h-3" style={{ strokeWidth: 1.5 }}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


