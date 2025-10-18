export interface Position {
  x: number;
  y: number;
}

export interface HexTile {
  Pos: Position;
  IsWalkable: boolean;
  IsHole: boolean;
  IsBonus: boolean;
  IsObstacle: boolean;
  IsSpawnP1: boolean;
  IsSpawnP2: boolean;
}

export interface HexGrid {
  Tiles: HexTile[];
}

export interface PixelCoord {
  x: number;
  y: number;
}
