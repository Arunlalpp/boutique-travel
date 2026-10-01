# Boutique Travel — Website + Sanity CMS

A premium boutique travel company's website, content-managed through [Sanity](https://www.sanity.io). The design, animations and mobile experience are unchanged from the original MVP — itineraries, guest stories, destinations and site-wide settings now live in Sanity instead of hardcoded files.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP (+ ScrollTrigger) · Sanity Studio (embedded at `/studio`) · `next-sanity`

## Setup

```bash
npm install
```

### 1. Use the Sanity project

This repo is already wired to the "Boutique travel" Sanity project (org: Arunlal PP, dataset: `production`). If you're starting from scratch with your own project instead:

```bash
npx sanity login
npx sanity init --env       # creates a project, or links an existing one, and writes .env.local for you
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=   # Project settings → API, in sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01

SANITY_API_WRITE_TOKEN=          # sanity.io/manage → API → Tokens → Add token ("Editor")
```

`SANITY_API_WRITE_TOKEN` is server-only (never prefixed `NEXT_PUBLIC_`) — it's used by the enquiry form's API route and the seed script to **create** documents. The public site only ever **reads** with the project/dataset identifiers, which are safe to expose.

For production (Vercel), add all four as environment variables in the project settings — `SANITY_API_WRITE_TOKEN` as a server-only/secret variable.

### 3. Run it

```bash
npm run dev          # http://localhost:3000
```

### 4. Seed demo content (optional, recommended for a first look)

```bash
npm run seed
```

Pushes 5 itineraries, 5 guest stories, 5 destinations and a Site Settings document into your dataset — the original MVP's placeholder content, now as real Sanity documents (including uploading its Unsplash photos into Sanity's asset store). Safe to re-run.

### 5. Manage content

Open **`/studio`** (e.g. `http://localhost:3000/studio`) and log in with your Sanity account. See **Studio guide** below.

### 6. Deploy

Push to your git remote and deploy on Vercel (or wherever) as usual — `npm run build` statically generates every itinerary/story/destination page at build time via `generateStaticParams`, reading from Sanity. Content edited later in the Studio appears on the live site automatically via Sanity's Live Content API (see **Caching & live updates**) without a rebuild.

---

## Studio guide (content editing)

Open `/studio`. The sidebar has:

- **Itineraries** — title, destination, images, day-by-day plan, highlights, SEO. Grouped into tabs (Basic Information / Hero & Gallery / Overview / Highlights / Day-by-Day Journey / Travel Information / SEO) to keep the form approachable.
- **Guest Stories** — a guest's quote, story and photos, optionally linked to one of the itineraries above.
- **Destinations** — the country-level pages at `/destinations/[slug]`; itineraries reference these rather than repeating country/region info.
- **Site Settings** — one document (not a list) for contact details, social links, and sitewide SEO/footer text.
- **Enquiries** — read-only submissions from the `/enquire` form (see below). Each one's **Status** field (New/Contacted/Qualified/Closed) is the only editable field — use it to track follow-up.

Publishing uses Sanity's normal draft → publish workflow (no separate "status" field to manage). A document only appears on the live site once published.

### Demo walkthrough

1. **Itineraries → Create.** Fill in title, pick (or first create) a Destination, upload a hero image, write the overview, add a day or two, add SEO fields, **Publish**.
2. Open the website — the new itinerary appears on `/itineraries` and at `/itineraries/<its-slug>`.
3. Edit the title, **Publish** again — reload the page, see the update.
4. Repeat for **Guest Stories → Create**, linking it to the itinerary from step 1.

---

## Pages

| Route | Content source |
| --- | --- |
| `/` | Site Settings (hero copy) + featured itineraries/story from Sanity |
| `/about` | Static (not part of the requested content models) |
| `/itineraries`, `/itineraries/[slug]` | Sanity `itinerary` documents |
| `/destinations`, `/destinations/[slug]` | Sanity `destination` documents |
| `/stories`, `/stories/[slug]` | Sanity `guestStory` documents |
| `/enquire` | Sanity `itinerary` titles (for the journey picker) + Site Settings (phone/email) |
| `/enquire/thank-you` | Static confirmation |
| `/studio` | Sanity Studio (no site header/footer — see **Architecture note**) |

## Where things live

```
app/
  (site)/              every public page — grouped so it gets the site's Header/Footer/Preloader
    page.tsx, about/, itineraries/, destinations/, stories/, enquire/
  studio/[[...tool]]/  the embedded Sanity Studio (its own minimal layout — no site chrome)
  api/enquiry/         POST handler that writes an `enquiry` document
  layout.tsx           true root layout: just <html>/<body>, nothing else
  sitemap.ts, robots.ts  read Sanity (allowIndexing, all slugs) to build sitemap/robots
sanity/
  schemaTypes/         itinerary, guestStory, destination, siteSettings, enquiry + shared objects
  structure.ts         Studio sidebar (Site Settings pinned as a singleton)
  lib/
    client.ts          read-only Sanity client
    writeClient.ts      server-only client with write access (server-only guarded)
    live.ts            next-sanity's Live Content API (sanityFetch + <SanityLive/>)
    queries.ts          every GROQ query + typed fetch functions, used by pages
    mappers.ts          raw Sanity results → the site's existing content shapes (lib/types.ts)
    image.ts            Sanity image → the existing `{src, alt, focal}` shape (see below)
    video.ts            parses a pasted YouTube/Vimeo URL into {provider, id}
sanity.config.ts, sanity.cli.ts   Studio + CLI configuration
scripts/seed.ts        demo-data seed (see Setup, step 4)
lib/
  types.ts             content shapes every page/component consumes
  data/site.ts          nav links + "why choose us" / "about" stats — NOT part of the CMS content models, stays in code
  data/itineraries.ts, data/stories.ts   original hardcoded content — now only used as scripts/seed.ts's source data
  image-loader.ts       next/image custom loader — now handles both Unsplash and Sanity's CDN
```

### Architecture note: why `/studio` sits outside `(site)`

The Studio needs to render as its own full-page app, not inside the marketing site's `<Header>`/`<Footer>`/scroll-driven animations. Routes are split into an `(site)` route group (gets the rich layout) and `app/studio/...` (sibling, gets only the bare root layout). This is the standard pattern for embedding Sanity Studio in an existing Next.js App Router site.

### Image pipeline — unchanged components

`sanity/lib/image.ts` converts a Sanity image field into the exact `{src, alt, focal}` shape the site already used for Unsplash placeholders (`focal` is derived from the image's hotspot as a CSS `object-position`). `lib/image-loader.ts` gained one extra branch for `cdn.sanity.io` URLs (alongside the existing Unsplash branch), appending width/quality params the same way. Net effect: `SmartImage`, `ImageHero`, `Parallax`, `Gallery`, `JourneyCard` etc. needed **no changes** — they still just receive an `ImageAsset`.

## Caching & live updates

Pages use `next-sanity`'s Live Content API (`sanity/lib/live.ts`) rather than a webhook + manual revalidation setup: `sanityFetch` fetches without the CDN's caching delay, and `<SanityLive />` (mounted once, in `app/(site)/layout.tsx`) opens a live connection that refreshes the page automatically when content changes — publish an edit in the Studio and the open browser tab updates without a manual reload. This is a Sanity Free-plan feature.

**Not implemented:** the drag-and-drop Presentation Tool (click an element on the page to jump to its field in the Studio). The Live Content API above already covers the main ask — reliable, low-latency updates without a rebuild — and adding full click-to-edit visual editing is a reasonable next increment rather than something this pass needed for a working CMS.

## Content model notes

A few fields exist beyond a literal reading of the original content-model brief, added because the live site actually renders them and removing them would be a visible regression:

- `itinerary.style`, `.pace`, `.groupSize`, `.included[]` — power the filter on `/itineraries` and the "at a glance" / "what's included" sections.
- `itinerary.cardImage` (optional) — falls back to the hero image if left blank.
- `itinerary.route[]` (optional, advanced) — `{name, x, y}` stops on a 0–100 grid, driving the animated route-line diagram. Leave it empty and upload `mapImage` instead for a simple static map — the page uses whichever is present.
- `itinerary`/`destination` don't store their own `country`/`region` — those live once on `destination` and are resolved through the reference, per the brief's own "reference, don't duplicate" principle.

## Sanity Free plan

Everything here runs on the Free plan: one dataset, no custom roles, no scheduled publishing, no SSO. If you later want any of the following, it requires a paid plan — nothing here depends on them:

- **Requires Sanity Growth/Enterprise:** multiple datasets per environment (e.g. separate staging content), more than 2 user roles, private datasets with fine-grained permissions, scheduled publishing, and the full Presentation Tool's visual-editing overlay in some configurations.

## Moving further

1. **Visual Editing:** add the Presentation Tool (`sanity/lib/live.ts` already has the Live Content API it builds on).
2. **Email on enquiry:** `app/api/enquiry/route.ts` currently only writes to Sanity; add a Resend/Postmark call there to also notify the team by email.
3. **Type generation:** `npm run typegen` (wraps `sanity typegen generate`) can generate exact TypeScript types for every GROQ query once you've run the Studio against a live schema at least once — not required for this to work, but removes the manual `Raw*` types in `sanity/lib/mappers.ts`.
4. **Route maps:** optionally replace the stylised `RouteMap`/`route[]` fields with a real map (e.g. Mapbox) fed by the destination's location.

## Motion

- Every animation respects `prefers-reduced-motion`.
- Elements marked `data-reveal` inside a `<Reveal>` fade and rise into place on scroll; `data-reveal="mask"` uncovers images.
