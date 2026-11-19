# Backroad Ledger

Website for Backroad Ledger, a travel ledger of India: journeys personally walked first, then designed for one guest at a time.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4. Every page is statically generated. There is no CMS or database. Enquiries are emailed through [Resend](https://resend.com).

## Run it

```bash
npm install
cp .env.example .env.local   # fill in the Resend keys to test the enquiry form
npm run dev                  # http://localhost:3000
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero reel, story, ledger index, guest ledger, hosts, enquiry |
| `/entries`, `/entries/[slug]` | The ten Entries, and one page per Entry |
| `/story` | The elephant story, partners, how routes are scouted, promise, hosts |
| `/guest-ledger`, `/guest-ledger/[slug]` | Guest films and written pages |
| `/enquire` | Begin Your Entry form. `/enquire?entry=05` pre-selects an Entry |

Old URLs from the first version of the site (`/itineraries`, `/stories`, `/about`, …) 301-redirect to these pages (see `next.config.ts`).

## Editing content

| What | Where |
| --- | --- |
| Name, contact details, socials, SEO defaults | `lib/site.ts` |
| Home page copy, Entries, guest films, hosts | `lib/data/ledger.ts` |
| Entry routes, story page, FAQ, guest stories | `lib/data/ledger-pages.ts` |

Copy in `[square brackets]` is a placeholder for the client's own text. Photos are Unsplash placeholders.

## SEO

- Canonical URLs, Open Graph and X cards on every page, plus a generated share image per page (`opengraph-image.tsx`).
- `/sitemap.xml` lists every page with its images. `/robots.txt` allows everything except `/api/`.
- JSON-LD: TravelAgency + WebSite site-wide, BreadcrumbList on inner pages, TouristTrip per Entry, FAQPage on `/enquire`.
- Vercel **preview** deployments are always `noindex`; production is indexable.

### Google Search Console

1. In Search Console, add a **URL-prefix** property for the production URL (e.g. `https://boutique-travel.vercel.app/`).
2. Choose **HTML tag** verification and copy the `content` value.
3. Set it as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel and redeploy, then click **Verify**.
4. Under **Sitemaps**, submit `sitemap.xml`.
5. Use **URL inspection → Request indexing** for `/` and `/entries` to speed up the first crawl.

## Deploy

Push to the Vercel project. In **Settings → Environment Variables** (Production) set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, and when ready `RESEND_FROM_EMAIL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_GA_ID`. Without the Resend variables the enquiry form shows its error message and points guests to WhatsApp.
