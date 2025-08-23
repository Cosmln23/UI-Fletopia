import React from "react";

export type ScoutStatusProps = {
  active: boolean;
  radiusKm: number;
  locationLabel: string;
  resultsCount: number;
};

export const ScoutStatus: React.FC<ScoutStatusProps> = ({ active, radiusKm, locationLabel, resultsCount }) => {
  if (!active) return null;
  return (
    <div className="text-xs text-gray-400 mb-3" aria-live="polite">
      Afișând {resultsCount} curse în {radiusKm} km de {locationLabel || "locația selectată"}, sortate inteligent.
    </div>
  );
};



