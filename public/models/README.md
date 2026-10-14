# 3D Models Directory (`public/models/`)

This directory houses the 3D assets loaded by React Three Fiber across the portfolio scenes.

## Expected Files

### 1. `avatar.glb`

- **Location:** `/public/models/avatar.glb`
- **Specification:** Rigged 3D humanoid character in binary glTF format (`.glb`).
- **Required Animation Clips:**
  - `"Idle"`: Subtle breathing / resting animation used in the **About** section (Section 03).
  - `"Typing"`: Seated or standing typing motion used in the **What I Do** workstation section (Section 04).
- **Optimization:** Draco or meshopt compression recommended (file size target < 3MB).

### 2. `desk.glb`

- **Location:** `/public/models/desk.glb`
- **Specification:** Workstation desk model with desk surface, laptop/display, and accessories for Section 04 (**What I Do**).
- **Optimization:** Draco or meshopt compression recommended (file size target < 2MB).

## Placeholder Fallback Guarantee

If either `avatar.glb` or `desk.glb` is not present in this folder:

- The 3D scene engine automatically catches the load exception and renders an aesthetic procedural placeholder geometry (capsule silhouette with `#8B5CF6` purple backlight glow for the avatar, and a minimalist workstation geometry for the desk).
- The portfolio website will compile and run seamlessly without crashes while you prepare your 3D assets.
