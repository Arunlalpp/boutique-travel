# Meridian — Boutique Travel Website (MVP / Design Preview)

A front-end MVP for a premium boutique travel company, built for client design and UX approval before production development.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP (+ ScrollTrigger) · Lucide icons
**Deliberately excluded:** CMS, database, auth, admin, payments, booking engine, CRM, backend.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: cinematic hero, approach, featured journeys, pull-quote, guest-story teaser, "why travel with us", closing CTA |
| `/about` | Our story: single content page (text and images) |
| `/itineraries` | Journey listing with region/style filters |
| `/itineraries/[slug]` | **Shared journey template:** key facts, narrative, highlights, animated route graphic, day-by-day, gallery with lightbox, inclusions, linked guest story, enquiry CTA, next journey |
| `/stories` | Guest stories: featured film and listing |
| `/stories/[slug]` | Guest story template: film, quote, words, linked journey |
| `/enquire` | Enquiry form with in-browser validation; `?journey=<slug>` pre-selects a journey |
| `/enquire/thank-you` | Post-submit confirmation; not indexed, only reached after a successful enquiry |
| 404 | Custom not-found page |

## Where things live

```
app/                   routes (Server Components by default)
components/
  layout/              Header (client), Footer, Wordmark
  home/                Home page sections
  itinerary/           JourneyCard, JourneyIndex (filters), RouteMap, DayByDay, Gallery
  stories/             VideoPlayer (click-to-load YouTube/Vimeo), StoryEntry
  enquire/             EnquiryForm (client)
  motion/              Reveal, Parallax (GSAP)
  ui/                  ButtonLink, SmartImage, ImageHero, PageHeader, SectionIntro
lib/
  types.ts             Content model (mirrors future CMS document types)
  data/site.ts         Brand name, contact details, nav, "why us"  ← placeholder brand
  data/media.ts        ALL image references in one place          ← placeholder photography
  data/itineraries.ts  5 sample journeys
  data/stories.ts      5 guest stories (placeholder names/quotes)
  gsap.ts              GSAP setup and shared motion settings
  image-loader.ts      next/image loader (Unsplash CDN now; add the client CDN later)
app/globals.css        Design tokens: colours, fonts, spacing helpers
```

## Swapping in the client's brand

- **Name, contact, socials:** `lib/data/site.ts`
- **Logo:** `components/layout/Wordmark.tsx` (use an inline SVG with `currentColor`), and `app/icon.svg`
- **Colours and typography:** the `@theme` block in `app/globals.css`
- **Photography:** replace `src` values in `lib/data/media.ts`, e.g. `/images/kyoto.jpg` in `/public`
- **Hero film:** pass `videoSrc` to `<Hero>` in `app/page.tsx`; the image becomes the poster
- **Guest films:** add `video: { provider: "vimeo", id: "…" }` to a story in `lib/data/stories.ts`
- **Copy:** the data files, plus the About page (`app/about/page.tsx`)

> ⚠️ Guest names and quotes are illustrative placeholders. Replace them with real, consented testimonials before launch.
> The placeholder photos are Unsplash stock and are not final imagery.

## Motion

- Every animation respects `prefers-reduced-motion`.
- Elements marked `data-reveal` inside a `<Reveal>` fade and rise into place on scroll; `data-reveal="mask"` uncovers images.
- Also included: hero line reveal with a slow image settle, gentle parallax, and a route line that draws itself on journey pages.

## Moving to production (next phase)

1. **CMS:** map `lib/types.ts` to CMS schemas and replace the functions in `lib/data/*` with queries. Page components don't change.
2. **Enquiry form:** replace `submit()` in `EnquiryForm.tsx` with a server action (email via Resend/Postmark, or a CRM webhook). The form already has a honeypot field (`companyWebsite` in `EnquiryForm.tsx`) with a `TODO` marking where to add server-side reCAPTCHA/Turnstile verification.
3. **Images:** add the client's image CDN to `lib/image-loader.ts`.
4. **SEO:** set `siteUrl` to the real domain and flip `ALLOW_INDEXING` to `true` in `lib/data/site.ts` — this single flag drives both `app/robots.ts` and the page-level `robots` meta in `app/layout.tsx`. `app/sitemap.ts`, OG/Twitter metadata and canonical URLs are already wired up from `lib/data/*`.
5. **Analytics:** set `NEXT_PUBLIC_GA_ID` in the environment to switch on GA4 (`components/analytics/Analytics.tsx`); it stays off while unset.
6. **Route maps:** optionally replace the stylised `RouteMap` with a custom-styled Mapbox map.
