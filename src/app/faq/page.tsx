import React from "react";

export default function FAQPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-gray-100">
      <h1 className="text-3xl font-semibold mb-6">FAQ</h1>
      <div className="space-y-6 text-sm text-gray-300">
        <div>
          <h2 className="text-white font-medium mb-2">Cum gestionez abonamentul?</h2>
          <p>Din pagina Abonament și Facturare, folosiți butonul către Stripe Customer Portal.</p>
        </div>
        <div>
          <h2 className="text-white font-medium mb-2">Cum se face verificarea companiei?</h2>
          <p>Încărcați documentele necesare în secțiunea Companie și Verificare. Verificarea poate fi manuală în MVP.</p>
        </div>
        <div>
          <h2 className="text-white font-medium mb-2">Cum activez notificările?</h2>
          <p>În Preferințe și Securitate, activați toggle-urile pentru Email și Push.</p>
        </div>
      </div>
    </section>
  );
}


