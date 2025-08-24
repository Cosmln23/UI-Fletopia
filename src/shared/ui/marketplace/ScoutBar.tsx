"use client";
import React from "react";
import styles from "./ScoutBar.module.css";

export interface ScoutBarProps {
  locationText: string;
  onLocationTextChange: (value: string) => void;
  onUseCurrentLocation: () => void;
  radiusKm: number;
  onRadiusChange: (value: number) => void;
  active: boolean;
  onReset: () => void;
}

export const ScoutBar: React.FC<ScoutBarProps> = ({
  locationText,
  onLocationTextChange,
  onUseCurrentLocation,
  radiusKm,
  onRadiusChange,
  active,
  onReset,
}) => {
  return (
    <div className={`${styles.container} glass-card bg-white/5 border border-white/10`}
         role="region" aria-label="Scout search controls">
      <div className={styles.title}>Scout</div>

      <div className={styles.locationWrap}>
        <label htmlFor="scout-location" className="sr-only">Locație</label>
        <input
          id="scout-location"
          type="text"
          value={locationText}
          onChange={(e) => onLocationTextChange(e.target.value)}
          placeholder="Introdu locația sau adresa"
          className="w-full glass-input px-3 py-2 text-sm text-gray-100 placeholder-gray-400 bg-white/5 border border-white/10 rounded-md outline-none"
        />
        <button
          type="button"
          onClick={onUseCurrentLocation}
          className={`${styles.locationBtn} glass-button px-2 py-1 text-xs rounded-md`}
          aria-label="Folosește locația curentă"
        >
          Locația mea
        </button>
      </div>

      <div className={styles.rangeWrap}>
        <label htmlFor="scout-radius" className="text-xs text-gray-300">Rază</label>
        <input
          id="scout-radius"
          type="range"
          min={10}
          max={300}
          step={10}
          value={radiusKm}
          onChange={(e) => onRadiusChange(Number(e.target.value))}
          aria-valuemin={10}
          aria-valuemax={300}
          aria-valuenow={radiusKm}
        />
        <div className="w-12 text-right text-xs text-gray-300">{radiusKm} km</div>
      </div>

      {active && (
        <button
          type="button"
          onClick={onReset}
          className={`${styles.resetBtn} text-xs text-gray-200 hover:bg-white/10`}
        >
          Reset
        </button>
      )}
    </div>
  );
};



