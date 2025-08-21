import React from "react";
import styles from "./CargoDetailModal.module.css";

export type CargoDetailData = {
  id: string;
  status: "PROGRAMAT" | "PRELUAT" | "IN_TRANZIT" | "LIVRAT" | "ANULAT";
  title: string;
  route: {
    from: { address: string; contactName?: string; contactPhone?: string; notes?: string };
    to: { address: string; contactName?: string; contactPhone?: string; notes?: string };
    stops?: { address: string }[];
  };
  metrics?: { distanceKm?: number; durationText?: string; mapsUrl?: string };
  schedule?: { loadWindow?: string; eta?: string; deadline?: string };
  cargo?: { description?: string; weightKg?: number; volumeM3?: number; special?: string[] };
  resources?: { vehicleType?: string; priceText?: string };
};

export type CargoDetailModalProps = {
  open: boolean;
  onClose: () => void;
  contentHtml?: string;
  data?: CargoDetailData;
  onSendQuote?: (data?: CargoDetailData) => void;
  onChat?: (data?: CargoDetailData) => void;
};

const StatusChip: React.FC<{ status: CargoDetailData["status"] }> = ({ status }) => {
  const map: Record<CargoDetailData["status"], string> = {
    PROGRAMAT: "bg-gray-500",
    PRELUAT: "bg-blue-500",
    IN_TRANZIT: "bg-orange-500",
    LIVRAT: "bg-green-500",
    ANULAT: "bg-red-500",
  };
  return <span className={`text-xs px-2 py-1 rounded-full font-medium text-black ${map[status]}`}>{status.replace("_", " ")}</span>;
};

export const CargoDetailModal: React.FC<CargoDetailModalProps> = ({ open, onClose, contentHtml, data, onSendQuote, onChat }) => {
  return (
    <div className={`modal ${open ? "active" : ""}`}>
      <div className={`glass-card rounded-xl mr-4 ml-4 pt-6 pr-6 pb-6 pl-6 ${styles.content}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-xl font-medium text-white">{data ? data.title : "Cargo Detail"}</h2>
              <p className="text-sm text-white/80">{data ? `Cursa #${data.id}` : ""}</p>
            </div>
            {data && <StatusChip status={data.status} />}
          </div>
          <button onClick={onClose} className="text-white hover:text-white transition-colors" aria-label="Închide">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[24px]"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>

        {data ? (
          <div className="space-y-6">
            {/* Rută */}
            <div className="glass-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Rută</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Încărcare (FROM)</div>
                  <div className="text-sm text-white mb-2">{data.route.from.address}</div>
                  {(data.route.from.contactName || data.route.from.contactPhone) && (
                    <div className="text-xs text-gray-300">{data.route.from.contactName} {data.route.from.contactPhone ? `• ${data.route.from.contactPhone}` : ""}</div>
                  )}
                  {data.route.from.notes && <div className="text-xs text-gray-400 mt-1">{data.route.from.notes}</div>}
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Descărcare (TO)</div>
                  <div className="text-sm text-white mb-2">{data.route.to.address}</div>
                  {(data.route.to.contactName || data.route.to.contactPhone) && (
                    <div className="text-xs text-gray-300">{data.route.to.contactName} {data.route.to.contactPhone ? `• ${data.route.to.contactPhone}` : ""}</div>
                  )}
                  {data.route.to.notes && <div className="text-xs text-gray-400 mt-1">{data.route.to.notes}</div>}
                </div>
              </div>
              {!!data.route.stops?.length && (
                <div className="mt-4">
                  <div className="text-xs text-gray-400 mb-1">Opriri intermediare</div>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                    {data.route.stops.map((s, i) => (
                      <li key={i}>{s.address}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Metrici & Navigație */}
            <div className="glass-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300">
                  <span className="mr-4">Distanță: {data.metrics?.distanceKm != null ? `${data.metrics.distanceKm} km` : "-"}</span>
                  <span>Durată: {data.metrics?.durationText ?? "-"}</span>
                </div>
                {data.metrics?.mapsUrl && (
                  <a href={data.metrics.mapsUrl} target="_blank" rel="noreferrer" className="glass-border hover:bg-white/5 transition-all px-3 py-2 text-xs text-white rounded-lg flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M3 6l3-3 3 3"></path><path d="M6 3v18"></path><path d="M9 21l-3 3-3-3"></path><path d="M21 6l-3 3-3-3"></path><path d="M18 3v18"></path></svg>
                    Deschide Ruta în Google Maps
                  </a>
                )}
              </div>
            </div>

            {/* Programare */}
            <div className="glass-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Programare</h3>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs text-gray-400">Încărcare (ETD)</div>
                  <div className="text-white">{data.schedule?.loadWindow ?? "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Sosire Estimată (ETA)</div>
                  <div className="text-white">{data.schedule?.eta ?? "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Deadline</div>
                  <div className="text-white">{data.schedule?.deadline ?? "-"}</div>
                </div>
              </div>
            </div>

            {/* Marfă */}
            <div className="glass-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Detalii Marfă</h3>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs text-gray-400">Descriere</div>
                  <div className="text-white">{data.cargo?.description ?? "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Greutate</div>
                  <div className="text-white">{data.cargo?.weightKg != null ? `${data.cargo.weightKg} kg` : "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Volum</div>
                  <div className="text-white">{data.cargo?.volumeM3 != null ? `${data.cargo.volumeM3} m³` : "-"}</div>
                </div>
              </div>
              {!!data.cargo?.special?.length && (
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {data.cargo.special.map((s, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-white/10 text-gray-200 border border-white/10">{s}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Resurse & Finanțe */}
            <div className="glass-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Resurse & Finanțe</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-gray-400">Vehicul alocat</div>
                  <div className="text-white">{data.resources?.vehicleType ?? "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Preț cursă</div>
                  <div className="text-white">{data.resources?.priceText ?? "-"}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-700">
              <button
                type="button"
                className="glass-border hover:bg-white/5 transition-all px-4 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg"
                onClick={() => onSendQuote?.(data)}
              >
                Send Quote
              </button>
              <button
                type="button"
                className="glass-border hover:bg-white/5 transition-all px-4 py-3 text-sm font-medium text-white rounded-lg"
                onClick={() => onChat?.(data)}
              >
                Chat with Shipper
              </button>
              <button
                type="button"
                className="glass-border hover:bg-white/5 transition-all px-4 py-3 text-sm text-gray-300 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6" dangerouslySetInnerHTML={{ __html: contentHtml ?? "" }} />
        )}
      </div>
    </div>
  );
};


