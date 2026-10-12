# Karim Sherif — Signature Hero

A fullscreen WebGL hero built around a custom, slow aurora shader. The live page is served from this `docs/` folder by GitHub Pages.

## Shader walkthrough

- `gl_FragCoord.xy / u_resolution` turns each fragment's pixel into normalized screen coordinates. The following aspect correction keeps the field's proportions stable on wide screens.
- The `a` and `b` sine expressions make two slow, crossing waves. Their distance from two moving center lines becomes soft teal and violet ribbons through `smoothstep`.
- `u_mouse` is converted to the same centered, aspect-correct coordinate space. Exponential falloff adds a gentle cursor glow; it does not bend the wave field.
- A broad halo adds depth, while a dark veil on the left protects the headline contrast.
- `hash` makes fine pixel grain. Its time bucket changes slowly, avoiding rapid flicker.
- `u_time` moves the ribbons, `u_resolution` keeps them proportional after resize, and `u_mouse` positions the glow.

The vertex shader covers the screen with two triangles. The fragment shader computes a color independently for each pixel.

## Performance and reduced motion

Device pixel ratio is capped at 1.5. Rendering pauses while the tab is hidden. With `prefers-reduced-motion: reduce`, the page draws one frame at `u_time = 0`; when WebGL is unavailable, CSS provides a static gradient.

## Run locally

Open `index.html` in a modern browser. No build step or package installation is required. Google Fonts are optional; system sans-serif fonts remain available as a fallback.
