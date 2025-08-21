import React from "react";
import styles from "./SubscriptionBillingSection.module.css";

export type SubscriptionBillingSectionProps = {
  plan?: "Trial" | "Basic" | "Agent";
  status?: "Activ" | "Expirat" | "Plată Eșuată";
  renewDate?: string;
};

export const SubscriptionBillingSection: React.FC<SubscriptionBillingSectionProps> = ({
  plan = "Trial",
  status = "Activ",
  renewDate = "-",
}) => {
  return (
    <section className={`${styles.section}`}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Abonament și Facturare</h2>
        <p className="text-gray-400">Gestionarea transparentă a abonamentului</p>
      </div>
      <div className="glass-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">Plan curent</div>
            <div className="text-white font-medium">{plan} • {status}</div>
          </div>
          <div className="text-sm text-gray-400">Reînnoire/Expirare: <span className="text-white">{renewDate}</span></div>
        </div>
        <button className="glass-border hover:bg-white/5 transition-all w-full text-sm text-white rounded-lg mt-2 pt-2 pr-4 pb-2 pl-4">Gestionează Abonamentul și Facturarea</button>
        <p className="text-xs text-gray-500">Recomandat: Stripe Customer Portal pentru administrare completă.</p>
      </div>
    </section>
  );
};


