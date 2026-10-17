# Framer migration map

Rebuild this Next.js site in Framer by matching each `/src/components/sections` file to a Framer section. Keep the same 1200px max width, 8px spacing, 12–20px radii, Inter (or Geist) + Syne, and a single accent color.

## Global

- **Design tokens:** copy CSS variables from `src/app/globals.css` into Framer styles (colors, radii, type sizes).
- **Navbar / Footer:** site-wide overlays, not page sections.
- **CMS collections:** Projects, Testimonials, FAQ.

## Sections

| Next.js component | Framer layout | Components to make | CMS |
| :--- | :--- | :--- | :--- |
| `Navbar` | Horizontal stack, sticky, 72px | Logo, Nav links, Theme toggle, Email me button, Mobile menu | — |
| `HeroSection` | Vertical stack, centered | Availability badge, H1, subtext, Button group, Trust row | — |
| `WorkSection` | 2-column grid | Project card (cover, category, title, result, tags) | **Projects** |
| `ServicesSection` | 3-column grid / wrap | Service card (icon, title, description, price) | Optional |
| `ProcessSection` | 4-column grid | Step card (number, title, timeline, body) | — |
| `WhySection` | 2-column grid | Reason card (icon, title, body) | — |
| `ToolsSection` | 5-column logo grid | Logo cell | — |
| `TestimonialsSection` | 3-column grid | Quote card (photo, name, role, quote, placeholder badge) | **Testimonials** |
| `AboutSection` | 2-column (copy + image) | Bio stack, fact chips, portrait | — |
| `FaqSection` | Vertical stack / accordion | FAQ item | **FAQ** |
| `ContactSection` | 2-column | Heading stack, email, Email me, Form | — |
| `Footer` | Horizontal stack | Social icons, copyright, Back to top | — |
| `/work/[slug]` | Article stack | Hero image, meta grid, Challenge, Built, Results, Gallery, pagination | **Projects** |

## CMS field map

**Projects:** slug, title, category, result, tags, cover, client, role, timeline, tools, challenge, built.cms, built.interactions, built.components, results, gallery, live URL.

**Testimonials:** name, role, company, photo, quote.

**FAQ:** question, answer.
