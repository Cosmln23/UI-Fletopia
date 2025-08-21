import React from "react";
import styles from "./CargoCard.module.css";

export type CargoCardProps = {
  id: string | number;
  title: string;
  postedAgo: string;
  from: string;
  to: string;
  details: string;
  price: string;
  company: string;
  urgency: "Low" | "Medium" | "High";
  onClick?: (id: string | number) => void;
};

export const CargoCard: React.FC<CargoCardProps> = ({ id, title, postedAgo, from, to, details, price, company, urgency, onClick }) => {
  const urgencyColor = urgency === "High" ? "bg-red-500 text-white" : urgency === "Medium" ? "bg-yellow-500 text-black" : "bg-green-500 text-white";
  return (
    <div className={`${styles.card} glass-card hover:bg-white/5 transition-all cursor-pointer rounded-xl pt-6 pr-6 pb-6 pl-6 group`} onClick={() => onClick?.(id)}>
      <div className="absolute top-4 right-4">
        <span className={`text-xs bg-white/10 text-white px-2 py-1 rounded-full font-medium transition-all duration-300 group-hover:${urgencyColor}`}>{urgency}</span>
      </div>
      <div className="flex items-start justify-between mb-4 pr-16">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <span className="text-xs text-gray-400">{postedAgo}</span>
      </div>
      <div className="mb-4 space-y-3">
        <div className="space-y-2">
          <div className="flex gap-2 text-sm text-gray-300 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="map-pin" className="w-3 h-3 text-green-400" style={{ strokeWidth: 1.5 }}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>From: {from}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="map-pin" className="w-3 h-3 text-red-400" style={{ strokeWidth: 1.5 }}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>To: {to}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400">{details}</div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-white">{price}</span>
        <span className="text-xs text-gray-400">by {company}</span>
      </div>
    </div>
  );
};


