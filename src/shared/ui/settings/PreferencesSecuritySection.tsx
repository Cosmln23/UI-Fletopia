import React from "react";
import styles from "./PreferencesSecuritySection.module.css";

export type PreferencesSecuritySectionProps = {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
};

export const PreferencesSecuritySection: React.FC<PreferencesSecuritySectionProps> = ({
  emailNotifications = true,
  pushNotifications = false,
}) => {
  return (
    <section className={`${styles.section}`}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Preferințe și Securitate</h2>
        <p className="text-gray-400">Control notificări și securitate cont</p>
      </div>
      <div className="space-y-6">
        <div className="glass-border rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">Setări Notificări</h3>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-white">Email</div>
              <div className="text-xs text-gray-400">Mesaje noi, status ofertă</div>
            </div>
            <div className="custom-toggle">
              <input type="checkbox" defaultChecked={emailNotifications} />
              <span className="toggle-bg"><span className="toggle-dot"></span></span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white">Push</div>
              <div className="text-xs text-gray-400">Web/Mobile</div>
            </div>
            <div className="custom-toggle">
              <input type="checkbox" defaultChecked={pushNotifications} />
              <span className="toggle-bg"><span className="toggle-dot"></span></span>
            </div>
          </div>
        </div>
        <div className="glass-border rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-3">Securitate</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <button className="glass-border hover:bg-white/5 transition-all px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg">Schimbă Parola</button>
            <button className="glass-border hover:bg-white/5 transition-all px-4 py-2 text-sm font-medium text-white rounded-lg">Activează 2FA</button>
          </div>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <button className="glass-border hover:bg-white/5 transition-all px-4 py-2 text-sm text-red-400 rounded-lg">Șterge Contul</button>
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-700">
          <button className="bg-gray-800 hover:bg-red-500 transition-colors px-6 py-2 rounded-lg text-white font-medium">Salvează</button>
        </div>
      </div>
    </section>
  );
};


