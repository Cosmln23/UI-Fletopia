import React from "react";
import styles from "./FooterSection.module.css";

export type FooterSectionProps = {
  brand?: string;
  year?: number;
};

export const FooterSection: React.FC<FooterSectionProps> = ({ brand = "Fleetopia", year = new Date().getFullYear() }) => {
  return (
    <footer className={`${styles.section} max-w-6xl mx-auto px-6 pt-16 pb-8`}>
      <div className="glass-border rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white text-lg">{brand}</span>
            </div>
            <p className="max-w-md text-sm text-gray-400">Connecting shippers and carriers through intelligent freight matching. Fast, reliable, and efficient logistics solutions for modern transportation needs.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-3">
              <h4 className="font-medium text-white">Support</h4>
              <a href="#help" className="text-gray-400 hover:text-white transition-colors">Help Center</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
              <a href="#api" className="text-gray-400 hover:text-white transition-colors">API Docs</a>
              <a href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© {year} {brand}. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


