# Deployment & Custom Domain Guide (Vercel)

This guide documents the exact steps to deploy the portfolio to **Vercel** with a custom apex domain (e.g., `arpitmeena.dev`), configure DNS records, automated SSL certificates, domain redirects, and production environment variables.

---

## 1. Prerequisites & Git Setup

1. Ensure all changes are committed and pushed to your GitHub/GitLab repository:

   ```bash
   git add .
   git commit -m "feat: portfolio upgrade with design tokens, responsive layouts, and framer components"
   git push origin main
   ```

2. Create an account or log in to [Vercel](https://vercel.com).

---

## 2. Import Project into Vercel

1. In the Vercel Dashboard, click **"Add New..."** -> **"Project"**.
2. Select your repository (`Framer-protfolio`).
3. Configure project build settings:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `next build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)
4. **Environment Variables:**
   Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: Your final live domain (e.g., `https://portfolio-lac-tau-4yahft4yj2.vercel.app`).
   - `NEXT_PUBLIC_FORMSPREE_ID`: Formspree form ID (the `xyzabcde` in `https://formspree.io/f/xyzabcde`). If unset, the last form step opens a pre-filled mailto.
5. Click **"Deploy"**. Vercel will build and provide an initial `*.vercel.app` preview URL.

---

## 3. Custom Domain Configuration (e.g. `arpitmeena.dev`)

1. In your Vercel Project Dashboard, navigate to **Settings** -> **Domains**.
2. In the input field, enter your root apex domain:

   ```text
   arpitmeena.dev
   ```

3. Click **"Add"**.
4. Vercel will prompt you to automatically add `www.arpitmeena.dev` as well. Select:
   - **"Redirect `www.arpitmeena.dev` to `arpitmeena.dev`"** (Recommended for SEO canonical consistency).

---

## 4. DNS Records Configuration (at your Domain Registrar)

Log into your domain registrar DNS management console (e.g., Cloudflare, Namecheap, GoDaddy, Google Domains / Squarespace) and add the following two DNS records:

### Record 1: Apex Domain (Root `@`)

| Type | Name / Host | Target / Value | TTL | Proxy Status |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (or leave blank) | `76.76.21.21` | Automatic / 300s | DNS Only (Disabled) |

### Record 2: `www` Subdomain (Redirect Target)

| Type | Name / Host | Target / Value | TTL | Proxy Status |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Automatic / 300s | DNS Only (Disabled) |

> **Note on Cloudflare:** If using Cloudflare DNS, set the Proxy Status toggle to **"DNS Only" (Grey Cloud)** during initial SSL provisioning so Vercel can verify the Let's Encrypt certificate challenge.

---

## 5. SSL / TLS Certificate & HTTPS Enforcement

- Once DNS records are saved, Vercel automatically issues an SSL certificate through **Let's Encrypt**.
- DNS propagation typically completes in **5–30 minutes** (maximum 24–48 hours depending on TTL).
- Vercel enforces HTTPS by default; all insecure HTTP requests will automatically receive a `301/308 Permanent Redirect` to `https://`.

---

## 6. Aligning Metadata & Site URL in Content

Once your domain is live, update the canonical site URL to match your final domain:

1. Open `src/data/site.ts`:

   ```ts
   export const site = {
     siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-lac-tau-4yahft4yj2.vercel.app",
     // ...
   };
   ```

2. This ensures:
   - `metadataBase` in `src/app/layout.tsx` resolves Open Graph and Twitter Card images correctly (`/og/og-image.png`).
   - `src/app/sitemap.ts` generates canonical XML sitemap URLs for all pages and case studies.
   - `src/app/robots.ts` points web crawlers to `https://portfolio-lac-tau-4yahft4yj2.vercel.app/sitemap.xml`.

---

## 7. Post-Deployment Verification Checklist

- [ ] **DNS & SSL:** Visit `https://portfolio-lac-tau-4yahft4yj2.vercel.app` and check for the secure lock icon in browser.
- [ ] **Redirect:** Visit `http://www.arpitmeena.dev` and confirm it redirects to `https://portfolio-lac-tau-4yahft4yj2.vercel.app`.
- [ ] **Theme Toggle:** Click the Sun/Moon toggle in the header; verify smooth 300ms transition and persistent theme selection on page refresh.
- [ ] **Contact Form:** Submit a test message on `/` and confirm receipt in Formspree (`NEXT_PUBLIC_FORMSPREE_ID`).
- [ ] **Mobile & Tablet:** Verify layout across mobile, tablet, and desktop with zero horizontal scrolling.
- [ ] **Email me:** Confirm the email CTA opens from the navbar and contact section.
