"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { diffParams, parseParams, type MarketplaceParams } from './urlParams';

export function useMarketplaceParams() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const params = useMemo<MarketplaceParams>(() => parseParams(sp), [sp]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pending, setPending] = useState(false);

  const update = useCallback((next: Partial<MarketplaceParams>, opts?: { debounceMs?: number }) => {
    const debounceMs = opts?.debounceMs ?? 250;
    const current = new URLSearchParams(sp.toString());
    const updated = diffParams(current, next);
    if (!updated) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPending(true);
    timeoutRef.current = setTimeout(() => {
      router.replace(`${pathname}?${updated.toString()}`, { scroll: false });
      setPending(false);
    }, debounceMs);
  }, [pathname, router, sp]);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return { params, update, pending } as const;
}


