import React from "react";
import styles from "./ScoutBar.module.css";

export type ScoutBarProps = {
  locationText: string;
  onLocationTextChange: (text: string) => void;
  onUseCurrentLocation: () => void;
  radiusKm: number;
  onRadiusChange: (value: number) => void;
  active?: boolean;
  onReset?: () => void;
};

export const ScoutBar: React.FC<ScoutBarProps> = ({
  locationText,
  onLocationTextChange,
  onUseCurrentLocation,
  radiusKm,
  onRadiusChange,
  active = false,
  onReset,
}) => {
  return (
    <div className={`glass-card ${styles.container}`}>
      <span className={`${styles.title} text-white flex items-center gap-2`} aria-label="Scout AI">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-300" aria-hidden>
          <path d="M12 2v4"/><path d="M12 18v4"/><path d="M2 12h4"/><path d="M18 12h4"/>
          <circle cx="12" cy="12" r="3"/>
          <circle cx="12" cy="12" r="8"/>
        </svg>
        Scout AI
      </span>

      <div className={styles.locationWrap}>
        <input
          type="text"
          value={locationText}
          onChange={(e) => onLocationTextChange(e.target.value)}
          placeholder="Introduceți locația curentă..."
          className="glass-input w-full pr-10 px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400"
        />
        <button
          type="button"
          title="Folosește locația curentă"
          aria-label="Folosește locația curentă"
          className={`${styles.locationBtn} text-gray-400 hover:text-white`}
          onClick={onUseCurrentLocation}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0-1.414-1.414M7.05 7.05 5.636 5.636"/>
          </svg>
        </button>
      </div>

      <div className={styles.rangeWrap}>
        <label className="text-sm text-gray-300 whitespace-nowrap">Rază: {radiusKm} km</label>
        <input
          type="range"
          min={25}
          max={500}
          step={5}
          value={radiusKm}
          onChange={(e) => onRadiusChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {active && (
        <button type="button" className={`${styles.resetBtn} text-xs text-gray-300 hover:text-white`} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
};


