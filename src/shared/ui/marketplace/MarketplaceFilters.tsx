import React from "react";
import styles from "./MarketplaceFilters.module.css";

export type Filters = {
  country: string;
  sort: string;
  type: string;
  urgency: string;
  date: string;
  min: string;
  max: string;
  query: string;
};

export type MarketplaceFiltersProps = {
  values: Filters;
  onChange: (next: Filters) => void;
  onClear: () => void;
};

export const MarketplaceFilters: React.FC<MarketplaceFiltersProps> = ({ values, onChange, onClear }) => {
  return (
    <div className="mb-6 animate-on-scroll in-view">
      <div className="relative">
        <input
          type="text"
          placeholder="Search cargo..."
          className="glass-input w-full focus:outline-none focus:ring-0 placeholder-gray-400 text-white rounded-lg pt-3 pr-12 pb-3 pl-12"
          value={values.query}
          onChange={(e) => onChange({ ...values, query: e.target.value })}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="search" className="lucide lucide-search absolute left-4 top-3.5 w-4 h-4 text-gray-400" style={{ strokeWidth: 1.5 }}><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
        {!!values.query && (
          <button className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors" onClick={() => onChange({ ...values, query: "" })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        )}
      </div>
      <div className={`${styles.filters} animate-on-scroll in-view mb-8`}>
        <select
          className="glass-input focus:outline-none text-sm text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3"
          value={values.country}
          onChange={(e) => onChange({ ...values, country: e.target.value })}
        >
          <option value="">All Countries</option>
          <option value="nl">Netherlands</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="be">Belgium</option>
          <option value="it">Italy</option>
        </select>
        <select className="glass-input focus:outline-none text-sm text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3" value={values.sort} onChange={(e) => onChange({ ...values, sort: e.target.value })}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-high">Price High to Low</option>
          <option value="price-low">Price Low to High</option>
          <option value="scout">Relevanță AI (Scout)</option>
        </select>
        <select className="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none" value={values.type} onChange={(e) => onChange({ ...values, type: e.target.value })}>
          <option value="">All Types</option>
          <option value="pallets">Pallets</option>
          <option value="container">Container</option>
          <option value="bulk">Bulk</option>
        </select>
        <select className="glass-input focus:outline-none text-sm text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3" value={values.urgency} onChange={(e) => onChange({ ...values, urgency: e.target.value })}>
          <option value="">All Urgency</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <select className="glass-input focus:outline-none text-sm text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3" value={values.date} onChange={(e) => onChange({ ...values, date: e.target.value })}>
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
        </select>
        <input type="number" placeholder="Min" className="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none w-20" value={values.min} onChange={(e) => onChange({ ...values, min: e.target.value })} />
        <input type="number" placeholder="Max" className="glass-input px-3 py-2 rounded-lg text-sm text-white bg-transparent focus:outline-none w-20" value={values.max} onChange={(e) => onChange({ ...values, max: e.target.value })} />
        <button className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2" onClick={onClear}>Clear</button>
      </div>
    </div>
  );
};


