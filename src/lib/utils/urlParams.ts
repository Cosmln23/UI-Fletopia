import { z } from 'zod';

export const MarketplaceParamsSchema = z.object({
  // location + radius for Scout-style search
  location: z.string().trim().optional(),
  radius: z.coerce.number().int().positive().max(1000).optional(),
  // filters
  vehicle_type: z.string().trim().optional(), // legacy single
  vehicle_types: z.string().trim().optional(), // comma-separated list
  price_min: z.coerce.number().nonnegative().optional(),
  price_max: z.coerce.number().nonnegative().optional(),
  date_from: z.string().trim().optional(),
  date_to: z.string().trim().optional(),
  urgency: z.enum(['low', 'medium', 'high']).optional(),
  // pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  // sorting
  sort_by: z.enum(['newest', 'price', 'distance']).default('newest'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
  // query
  q: z.string().trim().optional(),
  // tab
  tab: z.enum(['all-offers', 'my-cargo', 'my-quotes', 'active-deals']).default('all-offers'),
}).strict();

export type MarketplaceParams = z.infer<typeof MarketplaceParamsSchema>;

export function parseParams(input: URLSearchParams | Record<string, string | string[] | undefined> | undefined): MarketplaceParams {
  const record: Record<string, unknown> = {};
  if (input instanceof URLSearchParams) {
    input.forEach((v, k) => { record[k] = v; });
  } else if (input && typeof input === 'object') {
    for (const [k, v] of Object.entries(input)) {
      if (typeof v === 'string') record[k] = v;
      else if (Array.isArray(v)) record[k] = v[0];
    }
  }
  const parsed = MarketplaceParamsSchema.safeParse(record);
  return parsed.success ? parsed.data : MarketplaceParamsSchema.parse({});
}

export function serializeParams(params: Partial<MarketplaceParams>): URLSearchParams {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue;
    sp.set(k, String(v));
  }
  return sp;
}

export function diffParams(current: URLSearchParams, next: Partial<MarketplaceParams>): URLSearchParams | null {
  const sp = new URLSearchParams(current.toString());
  let changed = false;
  for (const [k, v] of Object.entries(next)) {
    const val = v == null ? '' : String(v);
    if (!val) {
      if (sp.has(k)) { sp.delete(k); changed = true; }
      continue;
    }
    if (sp.get(k) !== val) { sp.set(k, val); changed = true; }
  }
  return changed ? sp : null;
}


