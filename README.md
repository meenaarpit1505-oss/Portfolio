# Arpit Meena — Framer Developer Portfolio

Conversion-focused personal site built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Each homepage section maps 1:1 to a Framer section.

## Environment variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `CONTACT_WEBHOOK_URL` | Webhook for contact form submissions (Formspark, Zapier, Make, Slack). If unset, the form returns HTTP 503 and asks visitors to email directly. | `https://submit-form.com/your-form-id` |
| `NEXT_PUBLIC_SITE_URL` | Canonical production domain for metadata, Open Graph, robots, and sitemap. | `https://portfolio-lac-tau-4yahft4yj2.vercel.app` |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional booking URL. Primary CTA is “Email me”. | `https://calendly.com/meenaarpit1505/intro` |

## Commands

- `npm run dev` — local server at `http://localhost:3000`
- `npm run build` — production build
- `npx tsc --noEmit` — typecheck
- `npx eslint .` — lint
