# Tech Stack Logos Directory (`public/logos/`)

This directory houses SVG or PNG logos mapped to the Rapier physics playground spheres (Section 07: Tech Stack).

## Expected Logo Filenames

Place your brand logos (`.svg` or `.png`, square aspect ratio, minimum 128x128px with transparent background) using the exact filenames below matching `src/data/content.ts`:

| Technology | Expected Filename |
|---|---|
| TypeScript | `typescript.svg` |
| Three.js | `threejs.svg` |
| React Three Fiber | `react-three-fiber.svg` |
| GLSL / Shaders | `glsl.svg` |
| Next.js 15 | `nextjs.svg` |
| React 19 | `react.svg` |
| Tailwind CSS | `tailwind.svg` |
| GSAP / ScrollTrigger | `gsap.svg` |
| Rapier Physics | `rapier.svg` |
| Lenis Scroll | `lenis.svg` |
| Zustand | `zustand.svg` |
| Blender 3D | `blender.svg` |
| Node.js | `nodejs.svg` |
| PostgreSQL | `postgresql.svg` |
| WebGPU | `webgpu.svg` |
| Postprocessing | `postprocessing.svg` |
| Docker | `docker.svg` |
| Git / GitHub | `git.svg` |
| Figma | `figma.svg` |
| Vercel | `vercel.svg` |
| GraphQL | `graphql.svg` |
| WebGL 2.0 | `webgl.svg` |
| Turbopack / Vite | `turbopack.svg` |
| Prisma ORM | `prisma.svg` |
| CSS Shaders / Houdini | `css.svg` |
| Web Audio API | `webaudio.svg` |
| glTF / Draco / KTX2 | `gltf.svg` |
| Framer Motion | `framermotion.svg` |
| REST APIs | `rest.svg` |
| Jest / Vitest | `jest.svg` |

## Fallback Behavior

If any texture file is missing:

- The 3D Rapier sphere material automatically falls back to an instanced emissive sphere with its assigned brand color and dynamic canvas text badge.
- No network 404 or missing asset errors will interrupt the physics simulation or page rendering.
