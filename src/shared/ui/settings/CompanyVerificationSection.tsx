import React from "react";
import styles from "./CompanyVerificationSection.module.css";

export type CompanyVerificationSectionProps = {
  companyName?: string;
  vatId?: string;
  address?: string;
  status?: "Neverificat" | "În curs" | "Verificat";
};

export const CompanyVerificationSection: React.FC<CompanyVerificationSectionProps> = ({
  companyName = "",
  vatId = "",
  address = "",
  status = "Neverificat",
}) => {
  return (
    <section className={`${styles.section}`}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Companie și Verificare</h2>
        <p className="text-gray-400">Legitimitate B2B și încredere</p>
      </div>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-2">Denumire Companie</label>
            <input defaultValue={companyName} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Cod Fiscal (CUI / VAT ID)</label>
            <input defaultValue={vatId} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-2">Adresă Sediu Social</label>
          <input defaultValue={address} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Status Verificare:</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            status === "Verificat" ? "bg-green-500 text-black" : status === "În curs" ? "bg-yellow-500 text-black" : "bg-white/10 text-white"
          }`}>
            {status}
          </span>
          <button className="glass-border hover:bg-white/5 transition-all px-3 py-1 text-xs font-medium text-white rounded-lg">Inițiază Verificarea</button>
        </div>
        <div className="glass-border rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">Încărcare Documente (Transportatori)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Licență de Transport</label>
              <input type="file" className="block w-full text-xs text-gray-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Asigurare CMR</label>
              <input type="file" className="block w-full text-xs text-gray-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Upload securizat (MVP: validare manuală)</p>
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-700">
          <button className="bg-gray-800 hover:bg-red-500 transition-colors px-6 py-2 rounded-lg text-white font-medium">Salvează</button>
        </div>
      </div>
    </section>
  );
};


