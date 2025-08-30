import React from "react";
import styles from "./CargoCard.module.css";

export type LoadCardData = {
  id: string | number;
  title: string;
  postedAgo?: string;
  from: string;
  to: string;
  weightKg?: number;
  volumeM3?: number;
  vehicleType?: string;
  urgency?: "Low" | "Medium" | "High";
  distanceKm?: number;
  pickupAt?: string; // ISO or formatted
  deliveryAt?: string; // ISO or formatted
  priceText?: string; // e.g., €1,250
  paymentTerms?: string; // e.g., 30 zile
  company?: string;
  companyRating?: number; // 0..5
};

export type CargoCardProps = LoadCardData & {
  role?: "carrier" | "shipper" | "admin";
  onClick?: (id: string | number) => void;
  onBid?: (id: string | number) => void;
  onView?: (id: string | number) => void;
};

export const CargoCard: React.FC<CargoCardProps> = ({
  id,
  title,
  postedAgo,
  from,
  to,
  weightKg,
  volumeM3,
  vehicleType,
  urgency = "Low",
  distanceKm,
  pickupAt,
  deliveryAt,
  priceText,
  paymentTerms,
  company,
  companyRating,
  role = "carrier",
  onClick,
  onBid,
  onView,
}) => {
  const urgencyColor = urgency === "High" ? "bg-red-500 text-white" : urgency === "Medium" ? "bg-yellow-500 text-black" : "bg-green-500 text-white";

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(id);
    }
  }

  return (
    <div
      className={`${styles.card} glass-card hover:bg-white/5 transition-all rounded-xl pt-6 pr-6 pb-6 pl-6 group focus:outline-none focus:ring-2 focus:ring-white/30`}
      role="button"
      tabIndex={0}
      aria-label={`Cargo ${title} from ${from} to ${to}`}
      onKeyDown={handleKeyDown}
      onClick={() => onClick?.(id)}
    >
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {postedAgo ? <span className="text-xs text-gray-400" aria-label={`postat acum ${postedAgo}`}>{postedAgo}</span> : null}
        <span className={`text-xs bg-white/10 text-white px-2 py-1 rounded-full font-medium transition-all duration-300 group-hover:${urgencyColor}`}>{urgency}</span>
      </div>

      <div className="mb-4 pr-16">
        <h3 className="text-sm font-medium text-white mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span className="inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{from}</span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          <span className="inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{to}</span>
          </span>
          {typeof distanceKm === 'number' ? (
            <span className="ml-auto text-xs text-gray-400" aria-label={`distanță ${distanceKm} km`}>{distanceKm.toFixed(0)} km</span>
          ) : null}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 text-xs text-gray-300">
        <div>
          <div className="text-gray-400">Greutate</div>
          <div className="text-white">{typeof weightKg === 'number' ? `${weightKg.toLocaleString()} kg` : '—'}</div>
        </div>
        <div>
          <div className="text-gray-400">Volum</div>
          <div className="text-white">{typeof volumeM3 === 'number' ? `${volumeM3.toFixed(1)} m³` : '—'}</div>
        </div>
        <div>
          <div className="text-gray-400">Vehicul</div>
          <div className="text-white">{vehicleType || '—'}</div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <div className="text-gray-400">Pickup</div>
            <div className="text-white">{pickupAt || '—'}</div>
          </div>
          <div className="ml-4">
            <div className="text-gray-400">Delivery</div>
            <div className="text-white">{deliveryAt || '—'}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-lg font-medium text-white">{priceText || '—'}</span>
          {paymentTerms ? <span className="ml-2 text-xs text-gray-400">{paymentTerms}</span> : null}
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">by {company || '—'}</div>
          <div className="text-xs text-gray-400" aria-label={`rating ${companyRating ?? 0} din 5`}>
            {typeof companyRating === 'number' ? `${'★'.repeat(Math.round(companyRating))}${'☆'.repeat(5 - Math.round(companyRating))}` : '☆☆☆☆☆'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="glass-border hover:bg-white/5 transition-all text-xs text-white px-3 py-2 rounded-lg"
          onClick={(e) => { e.stopPropagation(); onView?.(id) ?? onClick?.(id); }}
          aria-label="View details"
        >
          View Details
        </button>
        {role === 'carrier' ? (
          <button
            type="button"
            className="glass-border hover:bg-white/5 transition-all text-xs text-white px-3 py-2 rounded-lg"
            onClick={(e) => { e.stopPropagation(); onBid?.(id); }}
            aria-label="Bid on cargo"
          >
            Bid
          </button>
        ) : null}
      </div>
    </div>
  );
};


