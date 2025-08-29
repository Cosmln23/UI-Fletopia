"use client";
import React from "react";
import styles from "./TopNavbar.module.css";

export type TopNavbarProps = {
  brand?: string;
};

export const TopNavbar: React.FC<TopNavbarProps> = ({ brand = "Fleetopia" }) => {
  return (
    <header className={`${styles.container} glass-border fade-in`}>
      <div className="max-w-6xl flex mr-auto ml-auto pt-4 pr-6 pb-4 pl-6 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{brand}</span>
        </div>
        <nav className="flex items-center gap-8 text-sm text-gray-400">
          <a href="#messages" className="hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="message-circle" className="lucide lucide-message-circle w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg>
          </a>
          <a href="#notifications" className="hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="bell" className="lucide lucide-bell w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
          </a>
          <div className="relative group" tabIndex={0}>
            <a href="#profile" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="user" className="lucide lucide-user w-4 h-4" style={{ strokeWidth: 1.5 }}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </a>
            <div className="hidden group-hover:block group-focus-within:block absolute right-0 top-full min-w-[160px] glass-border rounded-lg p-2 text-sm">
              <a href="/settings" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded">Setări</a>
              <a href="/faq" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded">Ajutor și FAQ</a>
              <a href="/api/auth/signout" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded">Deconectare</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};


