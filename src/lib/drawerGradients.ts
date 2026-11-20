/**
 * Drawer background gradients, generated as layered CSS radial gradients rather
 * than raster images so they stay crisp at any viewport size and cost no
 * network request.
 *
 * Each mesh is a 4x4 grid of soft colour blobs anchored to the edges, over a
 * base colour. The blob colours are not sampled from the source artwork
 * directly — overlapping translucent layers average toward the mean, which
 * washes the result out. They were solved for instead, so that compositing all
 * sixteen layers reproduces the original's colour placement and saturation.
 *
 * Stops fade to the same colour at zero alpha rather than to `transparent`,
 * which some engines interpolate through black.
 */

/**
 * Film grain. Rendered by the browser at device resolution, so unlike an
 * upscaled bitmap it never softens. Sits above the tint so it stays crisp;
 * raise the rect's opacity for a coarser grain.
 */
export const GRAIN_LAYER =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.08'/%3E%3C/svg%3E\") 0 0 / 180px 180px repeat";

const PEACH_TEAL_MESH = `
  radial-gradient(ellipse 92% 92% at 0% 0%, rgba(244,175,131,1) 0%, rgba(244,175,131,0) 50%),
  radial-gradient(ellipse 92% 92% at 33.33% 0%, rgba(162,92,63,1) 0%, rgba(162,92,63,0) 50%),
  radial-gradient(ellipse 92% 92% at 66.67% 0%, rgba(15,17,42,1) 0%, rgba(15,17,42,0) 50%),
  radial-gradient(ellipse 92% 92% at 100% 0%, rgba(0,54,56,1) 0%, rgba(0,54,56,0) 50%),
  radial-gradient(ellipse 92% 92% at 0% 33.33%, rgba(178,152,122,1) 0%, rgba(178,152,122,0) 50%),
  radial-gradient(ellipse 92% 92% at 33.33% 33.33%, rgba(209,120,92,1) 0%, rgba(209,120,92,0) 50%),
  radial-gradient(ellipse 92% 92% at 66.67% 33.33%, rgba(21,36,51,1) 0%, rgba(21,36,51,0) 50%),
  radial-gradient(ellipse 92% 92% at 100% 33.33%, rgba(0,50,57,1) 0%, rgba(0,50,57,0) 50%),
  radial-gradient(ellipse 92% 92% at 0% 66.67%, rgba(65,73,65,1) 0%, rgba(65,73,65,0) 50%),
  radial-gradient(ellipse 92% 92% at 33.33% 66.67%, rgba(238,200,167,1) 0%, rgba(238,200,167,0) 50%),
  radial-gradient(ellipse 92% 92% at 66.67% 66.67%, rgba(62,96,109,1) 0%, rgba(62,96,109,0) 50%),
  radial-gradient(ellipse 92% 92% at 100% 66.67%, rgba(0,29,34,1) 0%, rgba(0,29,34,0) 50%),
  radial-gradient(ellipse 92% 92% at 0% 100%, rgba(0,20,14,1) 0%, rgba(0,20,14,0) 50%),
  radial-gradient(ellipse 92% 92% at 33.33% 100%, rgba(231,255,251,1) 0%, rgba(231,255,251,0) 50%),
  radial-gradient(ellipse 92% 92% at 66.67% 100%, rgba(104,161,161,1) 0%, rgba(104,161,161,0) 50%),
  radial-gradient(ellipse 92% 92% at 100% 100%, rgba(0,74,77,1) 0%, rgba(0,74,77,0) 50%),
  rgb(117,103,94)
`;

const AMBER_OLIVE_MESH = `
  radial-gradient(ellipse 92% 92% at 0% 0%, rgba(95,74,60,1) 0%, rgba(95,74,60,0) 50%),
  radial-gradient(ellipse 92% 92% at 33.33% 0%, rgba(253,160,87,1) 0%, rgba(253,160,87,0) 50%),
  radial-gradient(ellipse 92% 92% at 66.67% 0%, rgba(59,58,16,1) 0%, rgba(59,58,16,0) 50%),
  radial-gradient(ellipse 92% 92% at 100% 0%, rgba(0,44,20,1) 0%, rgba(0,44,20,0) 50%),
  radial-gradient(ellipse 92% 92% at 0% 33.33%, rgba(26,51,72,1) 0%, rgba(26,51,72,0) 50%),
  radial-gradient(ellipse 92% 92% at 33.33% 33.33%, rgba(252,161,112,1) 0%, rgba(252,161,112,0) 50%),
  radial-gradient(ellipse 92% 92% at 66.67% 33.33%, rgba(132,108,59,1) 0%, rgba(132,108,59,0) 50%),
  radial-gradient(ellipse 92% 92% at 100% 33.33%, rgba(29,68,91,1) 0%, rgba(29,68,91,0) 50%),
  radial-gradient(ellipse 92% 92% at 0% 66.67%, rgba(44,67,120,1) 0%, rgba(44,67,120,0) 50%),
  radial-gradient(ellipse 92% 92% at 33.33% 66.67%, rgba(231,179,177,1) 0%, rgba(231,179,177,0) 50%),
  radial-gradient(ellipse 92% 92% at 66.67% 66.67%, rgba(193,182,134,1) 0%, rgba(193,182,134,0) 50%),
  radial-gradient(ellipse 92% 92% at 100% 66.67%, rgba(87,108,162,1) 0%, rgba(87,108,162,0) 50%),
  radial-gradient(ellipse 92% 92% at 0% 100%, rgba(75,93,175,1) 0%, rgba(75,93,175,0) 50%),
  radial-gradient(ellipse 92% 92% at 33.33% 100%, rgba(254,225,228,1) 0%, rgba(254,225,228,0) 50%),
  radial-gradient(ellipse 92% 92% at 66.67% 100%, rgba(231,237,213,1) 0%, rgba(231,237,213,0) 50%),
  radial-gradient(ellipse 92% 92% at 100% 100%, rgba(137,179,221,1) 0%, rgba(137,179,221,0) 50%),
  rgb(151,126,106)
`;

interface DrawerGradient {
  mesh: string;
  /**
   * How heavily to tint the mesh. This accounts for how much of the drawer is
   * covered by veiled surfaces: the dashboard's cards leave gaps where the
   * drawer shows at full strength, so it can be tinted heavily, but the chat
   * panel veils the entire drawer and two tint layers leave little visible.
   */
  tintAlpha: number;
}

const DRAWER_GRADIENTS: Record<string, DrawerGradient> = {
  '/dashboard': { mesh: AMBER_OLIVE_MESH, tintAlpha: 0.7 },
  '/chat': { mesh: PEACH_TEAL_MESH, tintAlpha: 0.42 },
};

/** Finds the gradient for a route, matching subroutes too. */
export function getDrawerGradient(pathname: string): DrawerGradient | undefined {
  return Object.entries(DRAWER_GRADIENTS).find(
    ([path]) => pathname === path || pathname.startsWith(path + '/'),
  )?.[1];
}

/** Composes the drawer background: grain over tint over the colour mesh. */
export function drawerBackground(gradient: DrawerGradient, tintRgb: string) {
  const tint = `rgba(${tintRgb}, ${gradient.tintAlpha})`;
  return `${GRAIN_LAYER}, linear-gradient(${tint}, ${tint}), ${gradient.mesh.trim()}`;
}
