import React from "react";
import styles from "./HeroSection.module.css";

export type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  backgroundImageUrl?: string;
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Fleetopia",
  subtitle = "How can we help you today? Pick your path below.",
  backgroundImageUrl = "https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80",
  primaryCtaHref = "#transport-cargo",
  primaryCtaLabel = "I have cargo to transport",
  secondaryCtaHref = "#find-cargo",
  secondaryCtaLabel = "I'm looking for cargo to transport",
}) => {
  return (
    <section
      className={`${styles.section} pt-16 pr-6 pl-6 items-center justify-center bg-cover`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <h1 className="md:text-7xl slide-up delay-400 text-4xl font-normal text-white tracking-tight font-serif text-center mb-4">
        {title}
      </h1>
      <p className="max-w-md fade-in delay-600 text-2xl text-gray-400 text-center mb-12">{subtitle}</p>
      <div className="flex gap-4 items-center">
        <a
          href={primaryCtaHref}
          className="glass-border hover:bg-white/5 transition-all flex items-center gap-2 text-sm font-medium bg-gray-900 text-white rounded-lg px-6 py-2 slide-left delay-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="package" className="lucide lucide-package w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
          {primaryCtaLabel}
        </a>
        <a
          href={secondaryCtaHref}
          className="hover:text-white transition-colors flex items-center gap-2 text-sm text-gray-400 px-6 py-2 slide-right delay-1000"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="search" className="lucide lucide-search w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
          {secondaryCtaLabel}
        </a>
      </div>
    </section>
  );
};


