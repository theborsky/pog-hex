import { HexGrid } from "@/types/hex";
import zarzaraDesertData from "./zarzara-desert.json";
import wildSteppesData from "./wild-steppes.json";
import saltLagoonData from "./salt-lagoon.json";
import mtBoskData from "./mt-bosk.json";
import sandboxTutorialData from "./sandbox-tutorial.json";

export interface PredefinedMap {
  name: string;
  data: HexGrid;
}

export const PREDEFINED_MAPS: PredefinedMap[] = [
  {
    name: "Sandbox Tutorial",
    data: sandboxTutorialData as HexGrid
  },
  {
    name: "Mt.Bosk",
    data: mtBoskData as HexGrid
  },
  {
    name: "Salt Lagoon",
    data: saltLagoonData as HexGrid
  },
  {
    name: "Wild Steppes",
    data: wildSteppesData as HexGrid
  },
  {
    name: "Zarzara Desert",
    data: zarzaraDesertData as HexGrid
  },
  {
    name: "Desolation Pass",
    data: {
      "Tiles": [
        {
          "Pos": { "x": -6, "y": -1 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -6, "y": 0 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -6, "y": 1 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -6, "y": 2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -6, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": true,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -5, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -5, "y": -1 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -5, "y": 0 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -5, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -5, "y": 2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -5, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -4, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": true,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -4, "y": -1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -4, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -4, "y": 2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -4, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -4, "y": 4 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -3, "y": -3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -3, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -3, "y": 0 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -3, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -3, "y": 2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -3, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -2, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": true,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -2, "y": -1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -2, "y": 0 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": true,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -2, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -2, "y": 2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -2, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -1, "y": -3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -1, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -1, "y": -1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -1, "y": 0 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -1, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -1, "y": 2 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -1, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 0, "y": -3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 0, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 0, "y": 0 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 0, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 0, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 0, "y": 4 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 1, "y": -3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 1, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 1, "y": -1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 1, "y": 0 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 1, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 1, "y": 2 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 1, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 2, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": true,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 2, "y": -1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 2, "y": 0 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": true,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 2, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 2, "y": 2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 2, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 3, "y": -3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 3, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 3, "y": 0 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 3, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 3, "y": 2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 3, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 4, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": true
        },
        {
          "Pos": { "x": 4, "y": -1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 4, "y": 0 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 4, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 4, "y": 2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 4, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 4, "y": 4 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 5, "y": -2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 5, "y": -1 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 5, "y": 0 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 5, "y": 1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 5, "y": 2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 5, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 6, "y": -1 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 6, "y": 0 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 6, "y": 1 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 6, "y": 2 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 6, "y": 3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": true
        },
        {
          "Pos": { "x": -4, "y": 0 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -3, "y": -1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 3, "y": -1 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -2, "y": 4 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 2, "y": 4 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": -2, "y": -3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 2, "y": -3 },
          "IsWalkable": true,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 0, "y": 2 },
          "IsWalkable": false,
          "IsHole": true,
          "IsBonus": false,
          "IsObstacle": false,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        },
        {
          "Pos": { "x": 0, "y": -1 },
          "IsWalkable": false,
          "IsHole": false,
          "IsBonus": false,
          "IsObstacle": true,
          "IsSpawnP1": false,
          "IsSpawnP2": false
        }
      ],
      "Troops": [
        {
          "EntityId": 1,
          "Pos": { "x": -3, "y": 0 },
          "Type": 4,
          "Owner": 1
        },
        {
          "EntityId": 2,
          "Pos": { "x": -3, "y": -1 },
          "Type": 5,
          "Owner": 1
        },
        {
          "EntityId": 3,
          "Pos": { "x": -5, "y": 2 },
          "Type": 2,
          "Owner": 1
        },
        {
          "EntityId": 4,
          "Pos": { "x": 3, "y": 0 },
          "Type": 4,
          "Owner": 2
        },
        {
          "EntityId": 5,
          "Pos": { "x": 3, "y": -1 },
          "Type": 5,
          "Owner": 2
        },
        {
          "EntityId": 8,
          "Pos": { "x": 5, "y": 2 },
          "Type": 2,
          "Owner": 2
        },
        {
          "EntityId": 9,
          "Pos": { "x": -4, "y": 4 },
          "Type": 10,
          "Owner": 1
        },
        {
          "EntityId": 10,
          "Pos": { "x": 4, "y": 4 },
          "Type": 10,
          "Owner": 2
        }
      ]
    }
  }
];
