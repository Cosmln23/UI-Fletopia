"use client";
import React, { useEffect, useMemo, useState } from "react";
import { MarketplaceHero, MarketplaceTabs, MarketplaceFilters, CargoCard, AddCargoModal, CargoDetailModal, FooterSection } from "@/shared/ui";
import type { CargoDetailData } from "@/shared/ui/marketplace/CargoDetailModal";
import { useMarketplaceParams } from "@/lib/utils/useMarketplaceParams";

export type MarketplaceFiltersState = {
  country: string;
  sort: string;
  type: string;
  urgency: string;
  date: string;
  min: string;
  max: string;
  query: string;
  location?: string;
  radiusKm?: number;
  vehicleTypes?: string[];
  dateFrom?: string;
  dateTo?: string;
};

export type MarketplaceClientProps = {
  initialFilters: MarketplaceFiltersState;
};

type TabKey = Parameters<typeof MarketplaceTabs>[0]["active"];

type Cargo = {
  id: number;
  title: string;
  company: string;
  price: string;
  time: string;
  from: string;
  to: string;
  type: string;
  details: string;
  urgency: "Low" | "Medium" | "High";
};

const initialCargo: Cargo[] = [
  { id: 1, title: "Electronics Shipment", company: "TransCorp", price: "€1,850", time: "2 hours ago", from: "NL Amsterdam 1012", to: "DE Berlin 10115", type: "Pallets", details: "Pallets • 2,500 kg • 12.5 m³", urgency: "Medium" },
  { id: 2, title: "Food & Beverages", company: "FoodLogistics", price: "€3,200", time: "5 hours ago", from: "DE Berlin 10115", to: "FR Paris 75001", type: "Container", details: "Container • 15,000 kg • 68.0 m³", urgency: "High" },
  { id: 3, title: "Construction Materials", company: "BuildCorp", price: "€2,750", time: "1 day ago", from: "FR Paris 75001", to: "IT Rome 00118", type: "Bulk", details: "Bulk • 8,000 kg", urgency: "Low" },
  { id: 4, title: "Medical Supplies", company: "MedTrans", price: "€950", time: "3 hours ago", from: "BE Brussels 1000", to: "NL Utrecht 3511", type: "Refrigerated", details: "Refrigerated • 1,200 kg • 5.2 m³", urgency: "High" },
  { id: 5, title: "Automotive Parts", company: "AutoLogistics", price: "€2,150", time: "6 hours ago", from: "DE Munich 80331", to: "FR Lyon 69001", type: "Pallets", details: "Pallets • 3,800 kg • 18.3 m³", urgency: "Low" },
  { id: 6, title: "Textile Products", company: "FashionFreight", price: "€1,980", time: "8 hours ago", from: "IT Milan 20121", to: "DE Hamburg 20095", type: "Container", details: "Container • 6,500 kg • 42.8 m³", urgency: "Medium" },
];

export default function MarketplaceClient({ initialFilters }: MarketplaceClientProps) {
  const { params, update } = useMarketplaceParams();
  const [activeTab, setActiveTab] = useState<TabKey>("all-offers");
  const [filters, setFilters] = useState<MarketplaceFiltersState>(initialFilters);
  const [addOpen, setAddOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailHtml, setDetailHtml] = useState<string>("");
  const [detailData, setDetailData] = useState<CargoDetailData | undefined>(undefined);
  // Location/Radius managed via filters (URL)

  // Sync from URL params to local state
  useEffect(() => {
    const nextFilters: MarketplaceFiltersState = {
      country: initialFilters.country,
      sort: params.sort_by === 'price' ? (params.sort_order === 'asc' ? 'price-low' : 'price-high') : params.sort_by === 'distance' ? 'scout' : 'newest',
      type: params.vehicle_type ?? '',
      urgency: initialFilters.urgency, // not modeled in URL yet
      date: initialFilters.date, // not modeled in URL yet
      min: params.price_min != null ? String(params.price_min) : '',
      max: params.price_max != null ? String(params.price_max) : '',
      query: params.q ?? '',
      ...(params.location && { location: params.location }),
      ...(params.radius !== undefined && { radiusKm: params.radius }),
    };
    setFilters((prev) => ({ ...prev, ...nextFilters }));
    setActiveTab((params.tab as TabKey) ?? 'all-offers');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.location, params.sort_by, params.sort_order, params.vehicle_type, params.price_min, params.price_max, params.q, params.tab]);

  // When local filters change via UI, reflect them in URL
  useEffect(() => {
    // Map local filters to URL params
    const next: Record<string, unknown> = {};
    if (filters.location) next.location = filters.location;
    if (typeof filters.radiusKm === 'number' && filters.radiusKm > 0) next.radius = Math.round(filters.radiusKm);
    if (filters.type) next.vehicle_type = filters.type;
    if (filters.min) next.price_min = Number(filters.min);
    if (filters.max) next.price_max = Number(filters.max);
    if (filters.query) next.q = filters.query;
    if (filters.sort === 'price-low') { next.sort_by = 'price'; next.sort_order = 'asc'; }
    else if (filters.sort === 'price-high') { next.sort_by = 'price'; next.sort_order = 'desc'; }
    else if (filters.sort === 'scout') { next.sort_by = 'distance'; next.sort_order = 'asc'; }
    else { next.sort_by = 'newest'; next.sort_order = 'desc'; }
    update(next, { debounceMs: 250 });
  }, [filters, update]);

  // Sync tab to URL
  useEffect(() => {
    update({ tab: activeTab }, { debounceMs: 0 });
  }, [activeTab, update]);

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" } as IntersectionObserverInit;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    }, observerOptions);
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filters]);

  const filteredCargo = useMemo(() => {
    let list = [...initialCargo];
    if (filters.query) list = list.filter((c) => c.title.toLowerCase().includes(filters.query.toLowerCase()) || c.company.toLowerCase().includes(filters.query.toLowerCase()));
    if (filters.type) list = list.filter((c) => c.type.toLowerCase() === filters.type);
    if (filters.urgency) list = list.filter((c) => c.urgency.toLowerCase() === filters.urgency);
    if (filters.sort === "price-high") list.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, "")) - parseFloat(a.price.replace(/[^0-9.]/g, "")));
    if (filters.sort === "price-low") list.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, "")));
    // sort "scout" left as-is (UI-only placeholder)
    return list;
  }, [filters]);

  const isRadiusActive = typeof filters.radiusKm === 'number' && filters.radiusKm > 0 && !!filters.location;
  // Ensure sort switches to scout when active, and revert on reset
  useEffect(() => {
    if (isRadiusActive) {
      setFilters((prev) => (prev.sort === "scout" ? prev : { ...prev, sort: "scout" }));
    } else if (filters.sort === 'scout') {
      setFilters((prev) => ({ ...prev, sort: 'newest' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRadiusActive]);

  // Removed useCurrentLocation/resetScout (Scout UI deprecated)

  const openDetail = (id: number) => {
    const c = initialCargo.find((x) => x.id === id);
    if (!c) return;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(c.from)}&destination=${encodeURIComponent(c.to)}`;
    const data: CargoDetailData = {
      id: String(c.id),
      status: "PROGRAMAT",
      title: c.title,
      route: {
        from: { address: c.from, contactName: "Contact Pickup", contactPhone: "+40 712 345 678", notes: "Rampa 5" },
        to: { address: c.to, contactName: "Contact Delivery", contactPhone: "+40 745 111 222", notes: "Anunțați cu 15 min înainte" },
      },
      metrics: { mapsUrl },
      schedule: { loadWindow: "azi 08:00 - 09:00", eta: "azi 15:30", deadline: "azi 18:00" },
      cargo: { description: c.type, special: [] },
      resources: { vehicleType: "Van 3.5t", priceText: c.price },
    };
    setDetailData(data);
    setDetailHtml("");
    setDetailOpen(true);
  };

  return (
    <div className="antialiased text-gray-100 bg-black pb-20">
      <MarketplaceHero>
        <MarketplaceTabs active={activeTab} onChange={(t) => setActiveTab(t)} onAddCargo={() => setAddOpen(true)} />
        <MarketplaceFilters values={filters} onChange={setFilters} onClear={() => setFilters({ country: "", sort: "newest", type: "", urgency: "", date: "", min: "", max: "", query: "", location: '' })} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll in-view">
          {filteredCargo.map((c) => (
            <CargoCard
              key={c.id}
              id={c.id}
              title={c.title}
              postedAgo={c.time}
              from={c.from}
              to={c.to}
              weightKg={c.type === 'Pallets' ? 2500 : c.type === 'Container' ? 6500 : 8000}
              volumeM3={c.type === 'Pallets' ? 12.5 : c.type === 'Container' ? 42.8 : 18.0}
              vehicleType={c.type}
              urgency={c.urgency}
              distanceKm={Math.random() * 1200 + 100}
              pickupAt={"azi 08:00"}
              deliveryAt={"azi 18:00"}
              priceText={c.price}
              paymentTerms={"30 zile"}
              company={c.company}
              companyRating={4.3}
              role="carrier"
              onClick={() => openDetail(c.id)}
            />
          ))}
        </div>
      </MarketplaceHero>
      <FooterSection />
      <AddCargoModal open={addOpen} onClose={() => setAddOpen(false)} />
      <CargoDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        contentHtml={detailHtml}
        data={detailData}
        onSendQuote={() => { /* UI-only */ setDetailOpen(false); }}
        onChat={() => { /* UI-only */ setDetailOpen(false); }}
      />
    </div>
  );
}


