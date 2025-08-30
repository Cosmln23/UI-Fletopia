import React from "react";
import styles from "./CompanyVerificationSection.module.css";

export type VerificationStatus = "unverified" | "pending" | "verified";

export interface CompanyVerificationData {
  companyName?: string;
  vatId?: string;
  address?: string;
  status?: VerificationStatus;
}

type DocRequirement = { id: string; title: string; description: string };

const requirements: DocRequirement[] = [
  { id: "reg", title: "Certificat înregistrare", description: "Dovada existenței legale a companiei" },
  { id: "vat", title: "Certificat TVA (opțional)", description: "Dacă firma este plătitoare de TVA" },
  { id: "license", title: "Licență transport (carrier)", description: "Obligatoriu pentru transportatori" },
  { id: "insurance", title: "Asigurare CMR", description: "Acoperire pentru marfă în tranzit" },
];

function statusPill(status: VerificationStatus = "unverified"): { label: string; className: string } {
  if (status === "verified") return { label: "Verificat", className: "bg-emerald-400 text-black" };
  if (status === "pending") return { label: "În curs", className: "bg-yellow-400 text-black" };
  return { label: "Neverificat", className: "bg-white/10 text-white" };
}

export type CompanyVerificationSectionProps = CompanyVerificationData;

export const CompanyVerificationSection: React.FC<CompanyVerificationSectionProps> = ({
  companyName = "",
  vatId = "",
  address = "",
  status = "unverified",
}) => {
  const pill = statusPill(status);
  const completed = status === "verified" ? requirements.length : status === "pending" ? 2 : 0;
  const total = requirements.length;
  const pct = Math.round((completed / Math.max(total, 1)) * 100);

  return (
    <section className={`${styles.section}`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M7.938 4.241a6.5 6.5 0 1 1 8.123 10.285L12 21l-4.061-6.474A6.5 6.5 0 0 1 7.939 4.24Z"/></svg>
            </span>
            Companie și Verificare
          </h2>
          <p className="text-gray-400">Legitimitate B2B și încredere</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${pill.className}`}>{pill.label}</span>
      </div>

      <div className="glass-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="text-sm text-gray-300">Coming soon: verificare automată documente și validare companie.</div>
          <a className="text-xs text-gray-300 hover:text-white underline underline-offset-4" href="/faq">Contactează suport pentru early access</a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs text-gray-400 mb-2">Denumire Companie</label>
          <input defaultValue={companyName} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" disabled />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-2">Cod Fiscal (CUI / VAT ID)</label>
          <input defaultValue={vatId} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" disabled />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-400 mb-2">Adresă Sediu Social</label>
          <input defaultValue={address} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" disabled />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Progres verificare</span>
          <span className="text-xs text-gray-400">{completed}/{total} ({pct}%)</span>
        </div>
        <div className="h-2 w-full rounded bg-white/10 overflow-hidden">
          <div className="h-2 bg-white/60" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {requirements.map((req) => (
          <div key={req.id} className="glass-border rounded-lg p-4">
            <div className="text-sm font-medium text-white mb-1">{req.title}</div>
            <div className="text-xs text-gray-400 mb-3">{req.description}</div>
            <button className="text-xs px-3 py-1 rounded-lg glass-border hover:bg-white/5 text-white" disabled>
              În curând
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};


