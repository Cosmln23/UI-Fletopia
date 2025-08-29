"use client";
import React from "react";
import styles from "./ProfileGeneralSection.module.css";
import { Input, Button } from "@/components/ui";
import { z } from "zod";
import type { Database } from "@/lib/supabase/types";
import { createBrowserClient } from "@/lib/supabase/client";

type UserRole = Database["public"]["Enums"]["user_role"];

const ProfileUpdateSchema = z.object({
  fullName: z
    .string({ required_error: "Numele este obligatoriu" })
    .min(2, "Numele trebuie să aibă minim 2 caractere")
    .max(80, "Numele poate avea maxim 80 de caractere"),
  email: z.string().email("Email invalid"),
  companyName: z
    .string()
    .max(120, "Compania poate avea maxim 120 de caractere")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  homeBaseAddress: z
    .string()
    .max(160, "Adresa poate avea maxim 160 de caractere")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  phone: z
    .string()
    .regex(/^\+?\d[\d\s-]{7,}$/i, "Telefon invalid. Ex: +40 712 345 678")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  role: z.custom<UserRole>().optional(),
});

type FormState = z.infer<typeof ProfileUpdateSchema>;

function roleToLabel(role?: UserRole | null): string {
  if (role === "carrier") return "Transportator";
  if (role === "shipper") return "Expeditor";
  if (role === "admin") return "Administrator";
  return "Utilizator";
}

export const ProfileGeneralSection: React.FC = () => {
  const supabase = React.useMemo(() => createBrowserClient(), []);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [initial, setInitial] = React.useState<FormState | null>(null);
  const [values, setValues] = React.useState<FormState>({
    fullName: "",
    email: "",
    companyName: undefined,
    homeBaseAddress: undefined,
    phone: undefined,
    role: undefined,
  });

  const isDirty = React.useMemo(() => {
    if (!initial) return false;
    return (
      initial.fullName !== values.fullName ||
      initial.companyName !== values.companyName ||
      initial.homeBaseAddress !== values.homeBaseAddress ||
      initial.phone !== values.phone
    );
  }, [initial, values]);

  // Unsaved changes warning
  React.useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      (e as any).returnValue = '';
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // Load current profile
  React.useEffect(() => {
    void (async () => {
      try {
        setLoading(true);
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userData.user) throw userErr ?? new Error("Nu s-a putut obține utilizatorul");
        const userId = userData.user.id;
        const email = userData.user.email ?? "";
        const { data: profileRow, error: profErr } = await supabase
          .from("profiles")
          .select("full_name, company_name, home_base_geo, role")
          .eq("user_id", userId)
          .maybeSingle<{ full_name: string | null; company_name: string | null; home_base_geo: unknown; role: UserRole }>();
        if (profErr) throw profErr;

        const next: FormState = {
          fullName: profileRow?.full_name ?? "",
          email,
          companyName: profileRow?.company_name ?? undefined,
          homeBaseAddress: undefined, // geo reverse geocoding pending
          phone: undefined,
          role: profileRow?.role,
        };
        setValues(next);
        setInitial(next);
      } catch {
        setFormError("Nu s-au putut încărca datele profilului.");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setField<K extends keyof FormState>(key: K, val: FormState[K]) {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setSuccess(null);
    setFormError(null);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(null);
    setFormError(null);
    setSaving(true);
    try {
      const parsed = ProfileUpdateSchema.safeParse(values);
      if (!parsed.success) {
        const nextErr: Partial<Record<keyof FormState, string>> = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0] as keyof FormState;
          nextErr[key] = issue.message;
        }
        setErrors(nextErr);
        return;
      }
      // Optimistic UX – server action integration va fi adăugată ulterior
      setInitial(parsed.data);
      setSuccess("Salvat cu succes.");
    } catch {
      setFormError("A apărut o eroare la salvare. Încercați din nou.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className={`${styles.section}`}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Profil General</h2>
        <p className="text-gray-400">Identitatea de bază a utilizatorului</p>
      </div>

      {formError ? <div className="text-sm text-red-400 mb-4">{formError}</div> : null}
      {success ? <div className="text-sm text-emerald-400 mb-4">{success}</div> : null}

      <form onSubmit={(e) => { void onSubmit(e); }}>
        <fieldset disabled={loading || saving} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Nume Complet"
              placeholder="Introduceți numele"
              value={values.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              {...(errors.fullName ? { error: errors.fullName } : {})}
              required
            />
            <div>
              <Input
                label="Email"
                placeholder="email@example.com"
                value={values.email}
                disabled
              />
              <div className="text-xs text-gray-500 mt-1">Schimbarea email-ului se face prin flux securizat</div>
            </div>

            <Input
              label="Telefon"
              placeholder="Ex: +40 712 345 678"
              value={values.phone ?? ""}
              onChange={(e) => setField("phone", e.target.value)}
              {...(errors.phone ? { error: errors.phone } : {})}
            />
            <Input
              label="Rol utilizator"
              value={roleToLabel(values.role)}
              disabled
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Companie"
              placeholder="Numele companiei (opțional)"
              value={values.companyName ?? ""}
              onChange={(e) => setField("companyName", e.target.value)}
              {...(errors.companyName ? { error: errors.companyName } : {})}
            />
            <Input
              label="Adresă bază operațiuni"
              placeholder="Str. Exemplu 123, Oraș"
              helperText="Sugestie: începeți să tastați adresa (auto-complete în curând)"
              value={values.homeBaseAddress ?? ""}
              onChange={(e) => setField("homeBaseAddress", e.target.value)}
              {...(errors.homeBaseAddress ? { error: errors.homeBaseAddress } : {})}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-700">
            <Button type="submit" loading={saving} className="min-w-32">Salvează</Button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};


