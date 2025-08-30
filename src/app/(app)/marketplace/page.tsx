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

export default async function MarketplacePage({ searchParams }: { searchParams?: MarketplaceSearchParams }) {
  const initialFilters: MarketplaceFiltersState = {
    country: sanitize(searchParams?.country) || '',
    sort: sanitize(searchParams?.sort) || 'newest',
    type: sanitize(searchParams?.type) || '',
    urgency: sanitize(searchParams?.urgency) || '',
    date: sanitize(searchParams?.date) || '',
    min: sanitize(searchParams?.min) || '',
    max: sanitize(searchParams?.max) || '',
    query: sanitize(searchParams?.query) || '',
  };
  return <MarketplaceClient initialFilters={initialFilters} />;
}


