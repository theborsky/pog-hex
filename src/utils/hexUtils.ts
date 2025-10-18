import { Position, PixelCoord } from "@/types/hex";

// Hex geometry constants
const HEX_SIZE = 30;
const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
const HEX_HEIGHT = 2 * HEX_SIZE;

/**
 * Convert even-q hex coordinates to pixel coordinates
 * Even-q vertical layout: even columns are pushed down by half a hex height
 * Y-axis: positive goes up, negative goes down
 */
export function hexToPixel(pos: Position): PixelCoord {
  const x = pos.x * HEX_WIDTH;
  const y = -pos.y * HEX_HEIGHT * 0.75 - (pos.x % 2 === 0 ? HEX_HEIGHT * 0.5 : 0);
  return { x, y };
}

/**
 * Generate SVG path for a flat-top hexagon centered at origin
 */
export function getHexPath(size: number = HEX_SIZE): string {
  const points: PixelCoord[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i; // Start at 0 for flat-top
    points.push({
      x: size * Math.cos(angle),
      y: size * Math.sin(angle),
    });
  }
  
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';
}

export const hexConstants = {
  HEX_SIZE,
  HEX_WIDTH,
  HEX_HEIGHT,
};
