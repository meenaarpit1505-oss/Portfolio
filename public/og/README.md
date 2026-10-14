# Open Graph Social Share Image (`public/og/`)

This directory houses the Open Graph / Twitter social preview card image for link previews across LinkedIn, X (Twitter), Discord, Slack, and messaging apps.

## Expected File

### `og-image.png`

- **Location:** `/public/og/og-image.png`
- **Dimensions:** Exactly `1200 x 630` pixels (standard 1.91:1 aspect ratio).
- **Format:** Optimized 24-bit PNG or WebP.
- **Recommended Content:**
  - Dark background (`#050505`) with subtle `#8B5CF6` to `#EC4899` gradient glow.
  - Large serif typography featuring your name and title (e.g. *"ALEXANDER VEX — Senior Creative Developer & 3D Web Architect"*).
  - Snapshot or silhouette of the liquid-chrome 3D hero blob.

## Fallback Behavior

If `og-image.png` is not provided:

- Search engines and social crawlers will display the standard textual metadata (title, description, URL) configured in `src/data/content.ts`.
