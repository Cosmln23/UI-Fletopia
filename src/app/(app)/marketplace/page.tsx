import React from 'react';
import MarketplaceClient, { type MarketplaceFiltersState } from './MarketplaceClient';

export const metadata = {
  title: 'Marketplace – Fleetopia',
  description: 'Oferte de marfă și cereri în timp real, cu filtre și Scout AI.',
};

export type MarketplaceSearchParams = Partial<{
  country: string;
  sort: string;
  type: string;
  urgency: string;
  date: string;
  min: string;
  max: string;
  query: string;
}>;

function sanitize(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export default async function MarketplacePage({ searchParams }: { searchParams: Promise<MarketplaceSearchParams> }) {
  const sp = await searchParams;
  const initialFilters: MarketplaceFiltersState = {
    country: sanitize(sp?.country) || '',
    sort: sanitize(sp?.sort) || 'newest',
    type: sanitize(sp?.type) || '',
    urgency: sanitize(sp?.urgency) || '',
    date: sanitize(sp?.date) || '',
    min: sanitize(sp?.min) || '',
    max: sanitize(sp?.max) || '',
    query: sanitize(sp?.query) || '',
  };
  return <MarketplaceClient initialFilters={initialFilters} />;
}


