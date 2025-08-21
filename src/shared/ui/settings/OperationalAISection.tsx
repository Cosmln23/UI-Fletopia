import React from "react";
import styles from "./OperationalAISection.module.css";

export type OperationalAISectionProps = {
  role?: "Transportator" | "Expeditor";
};

export const OperationalAISection: React.FC<OperationalAISectionProps> = ({ role = "Transportator" }) => {
  return (
    <section className={`${styles.section}`}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Setări Operaționale (AI)</h2>
        <p className="text-gray-400">Configurări care alimentează motorul AI</p>
      </div>

      {role === "Transportator" ? (
        <div className="space-y-6">
          <div className="glass-border rounded-lg p-4">
            <h3 className="text-sm font-medium text-white mb-2">Baza de Operațiuni (Home Base)</h3>
            <p className="text-xs text-gray-400 mb-3">Setează locația ta de bază pentru ca Agentul "The Scout" să prioritizeze cursele de retur.</p>
            <input placeholder="Adresă bază operațiuni" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" />
          </div>
          <div className="glass-border rounded-lg p-4">
            <h3 className="text-sm font-medium text-white mb-2">Flotă / Vehicule</h3>
            <p className="text-xs text-gray-400 mb-3">Selectează tipurile operate</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Van 3.5t",
                "Truck 7.5t",
                "Trailer",
                "Refrigerated",
                "Flatbed",
              ].map((t) => (
                <label key={t} className="text-xs text-gray-300 bg-white/5 border border-white/10 rounded px-2 py-1 cursor-pointer">
                  <input type="checkbox" className="mr-2 align-middle" />
                  {t}
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-border rounded-lg p-4">
            <h3 className="text-sm font-medium text-white mb-2">Locații Frecvente</h3>
            <p className="text-xs text-gray-400 mb-3">Salvează adrese utilizate des</p>
            <div className="grid md:grid-cols-2 gap-3">
              <input placeholder="Nume locație (ex: Depozit Principal)" className="glass-input px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
              <input placeholder="Adresă" className="glass-input px-3 py-2 rounded-lg text-white bg-transparent focus:outline-none" />
              <button className="glass-border hover:bg-white/5 transition-all px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg">Adaugă locație</button>
            </div>
          </div>
          <div className="glass-border rounded-lg p-4">
            <h3 className="text-sm font-medium text-white mb-2">Preferințe "Magic Poster"</h3>
            <p className="text-xs text-gray-400 mb-3">Setează un tip implicit de vehicul</p>
            <select className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
              <option value="">Nespecificat</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
              <option value="trailer">Trailer</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-700 mt-6">
        <button className="bg-gray-800 hover:bg-red-500 transition-colors px-6 py-2 rounded-lg text-white font-medium">Salvează</button>
      </div>
    </section>
  );
};


