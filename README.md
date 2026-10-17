# Arpit Meena — Framer Developer Portfolio

Conversion-focused personal site built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Each homepage section maps 1:1 to a Framer section.

## Environment variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production domain for metadata, Open Graph, robots, and sitemap. | `https://portfolio-lac-tau-4yahft4yj2.vercel.app` |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID for the 4-step contact form. If unset, the last step opens a pre-filled mailto. | `xyzabcde` |

## Commands

- `npm run dev` — local server at `http://localhost:3000`
- `npm run build` — production build
- `npx tsc --noEmit` — typecheck
- `npx eslint .` — lint
