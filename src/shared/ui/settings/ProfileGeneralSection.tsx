import React from "react";
import styles from "./ProfileGeneralSection.module.css";

export type ProfileGeneralSectionProps = {
  fullName?: string;
  email?: string;
  phone?: string;
  role?: "Transportator" | "Expeditor";
  language?: string;
  theme?: "dark" | "light";
};

export const ProfileGeneralSection: React.FC<ProfileGeneralSectionProps> = ({
  fullName = "",
  email = "",
  phone = "",
  role = "Transportator",
  language = "Română",
  theme = "dark",
}) => {
  return (
    <section className={`${styles.section}`}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Profil General</h2>
        <p className="text-gray-400">Identitatea de bază a utilizatorului</p>
      </div>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-2">Nume Complet</label>
            <input defaultValue={fullName} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Introduceți numele" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Email</label>
            <input defaultValue={email} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="email@example.com" disabled />
            <p className="text-xs text-gray-500 mt-1">Schimbarea email-ului se face prin flux securizat</p>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Telefon</label>
            <input
              defaultValue={phone}
              className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400"
              placeholder="Ex: +40 712 345 678"
              pattern="^\+?\d[\d\s-]{7,}$"
              title="Introduceți un număr valid (ex: +40 712 345 678)"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Rol utilizator</label>
            <input value={role} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" disabled />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-2">Limbă</label>
            <select defaultValue={language} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
              <option>Română</option>
              <option>English</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Temă</label>
            <select defaultValue={theme} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
              <option value="dark">Dark Mode</option>
              <option value="light">Light Mode</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-700">
          <button className="bg-gray-800 hover:bg-red-500 transition-colors px-6 py-2 rounded-lg text-white font-medium">Salvează</button>
        </div>
      </div>
    </section>
  );
};


