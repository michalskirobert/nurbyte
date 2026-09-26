# NurByte Arcade Website

Retro-future company site for NurByte Software Lab, inspired by Japanese arcades and Southeast Asian night-city energy.

## Stack

- Next.js 16.3.6 App Router + React 19 + TypeScript
- Framer Motion
- React Hook Form + Zod
- Server-generated encrypted image CAPTCHA
- Nodemailer SMTP contact transport
- Native Next.js Metadata API, dynamic Open Graph image, robots.txt and sitemap.xml

## Run

```bash
yarn install
yarn dev
```

Copy `.env.example` to `.env.local` and configure SMTP + a strong `CAPTCHA_SECRET`.

## Architecture

- `src/app` — routes, metadata endpoints and API route handlers
- `src/components/ui` — reusable primitives (Section, fields, buttons)
- `src/components/*` — feature/presentation components
- `src/config` — site-level configuration
- `src/data` — typed content/data
- `src/lib` — server/domain utilities
- `public/images` — static brand/project assets

The NurByte mark is intentionally implemented as a replaceable UI lockup because no definitive NurByte logo asset was available while assembling this version. Replace the mark in `Header` and `icon.svg` when the final SVG is available.

## Contact CAPTCHA

The challenge is rendered server-side as an image. The expected answer and expiry are encrypted with AES-256-GCM using `CAPTCHA_SECRET`; the browser receives no plaintext answer. Tokens expire after 5 minutes.

## Production notes

- Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin before build.
- Configure SMTP values and `CONTACT_TO`.
- Add application-level rate limiting at your hosting edge or persistent store for `/api/contact` if the site receives public traffic.
- Update the GitHub URL in `src/config/site.ts` once the public Hosts Editor repository URL is final.
