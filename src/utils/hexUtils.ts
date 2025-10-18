import { Position, PixelCoord } from "@/types/hex";

// Hex geometry constants for flat-top hexagons
const HEX_SIZE = 30; // distance from center to vertex
const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE; // horizontal spacing between columns
const VERTICAL_SPACING = 1.5 * HEX_SIZE; // vertical distance between rows

/**
 * Convert even-q hex coordinates to pixel coordinates
 * Even-q vertical layout: even columns are pushed down by half a hex height
 * Y-axis: positive goes up, negative goes down
 */
export function hexToPixel(pos: Position): PixelCoord {
  const x = pos.x * HEX_WIDTH;
  // Even columns offset by 0.75 * HEX_SIZE, with 45px bottom margin
  const y = -pos.y * VERTICAL_SPACING - (pos.x % 2 === 0 ? 0.75 * HEX_SIZE : 0) + 45;
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
  VERTICAL_SPACING,
};
