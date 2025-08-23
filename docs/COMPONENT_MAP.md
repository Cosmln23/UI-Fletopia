## Documentație UI – Harta Componentelor

Acest fișier listează toate componentele UI folosite pe fiecare pagină și inventarul componentelor UI disponibile. Scop: suport pentru planificarea back-end. Nu conține detalii tehnice.

### Pagini

- Home (`/`)
  - TopNavbar
  - BottomNav
  - HeroSection
  - QuickActionsSection
  - HowItWorksSection
  - TestimonialsSection
  - FooterSection

- Marketplace (`/marketplace`)
  - TopNavbar
  - BottomNav
  - MarketplaceHero
  - MarketplaceTabs
  - ScoutBar (locație, buton locație curentă, slider rază, reset, ScoutIcon SVG)
  - ScoutStatus (rezumat activ, aria-live)
  - MarketplaceFilters
  - CargoCard (listă de carduri)
  - AddCargoModal
    - MagicPosterSection (textarea + buton „✨ Completează Magic”)
    - MagicWarningBanner (atenționare după completarea Magic)
    - Attachments (se deschide la click pe „Completează Magic”; listă fișiere selectate cu nume/dimensiune/ștergere)
    - StructuredForm (Origine, Destinație, Data încărcării, Greutate, Paleți, Tip marfă, Tip vehicul)
    - Submit („Postează Marfa”) / Cancel
  - CargoDetailModal
    - Header: Titlu, ID cursă, Status color (Programat/Preluat/În Tranzit/Livrat/Anulat)
    - Route: FROM/TO (adresă, contact, instrucțiuni) + Opriri intermediare (opțional)
    - Metrics & Maps: Distanță, Durată, buton „Deschide Ruta în Google Maps”
    - Schedule: ETD (interval), ETA, Deadline
    - Cargo: descriere, greutate, volum, tag-uri speciale
    - Resources & Finance: vehicul alocat, preț cursă
    - Actions: „Send Quote”, „Chat with Shipper”, „Cancel” (UI-only)
  - FooterSection

- Settings (`/settings`)
  - TopNavbar
  - BottomNav
  - SettingsSidebar
  - ProfileGeneralSection
  - CompanyVerificationSection
  - OperationalAISection
  - SubscriptionBillingSection
  - PreferencesSecuritySection
  - FooterSection

### Global

- ChatWidget (sticky, dreapta-jos, peste BottomNav)
  - FAB negru opac (56px), icon mesaj alb
  - Panou chat P2P (800px lățime, max 85vh), fundal negru, glass-border
  - Animație „rolă” mai lentă (deschidere ~520ms, închidere ~400ms)
  - Mesaje mock între doi utilizatori (me/peer), bule stânga/dreapta, avatar

### Biblioteca UI (shared)

- TopNavbar
- BottomNav
- HeroSection
- QuickActionsSection
- HowItWorksSection
- TestimonialsSection
- FooterSection
- MarketplaceHero
- MarketplaceTabs
- MarketplaceFilters
- CargoCard
- AddCargoModal
- CargoDetailModal
  
  Add Cargo (sub-elemente UI)
  - MagicPosterSection
  - MagicWarningBanner
  - Attachments (preview list)
  - StructuredForm
  
  Bottom Navigation highlights
  - Home icon → activ pe ruta `/`
  - Marketplace icon → activ pe ruta `/marketplace`
  - Settings icon → activ pe ruta `/settings`
  
  Settings
  - SettingsSidebar
  - ProfileGeneralSection
  - CompanyVerificationSection
  - OperationalAISection
  - SubscriptionBillingSection
  - PreferencesSecuritySection


