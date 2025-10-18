export const TROOP_TYPES = {
  None: 0,
  Scout: 1,
  Soldier: 2,
  Archer: 3,
  Knight: 4,
  Healer: 5,
  Wizard: 6,
  Thrall: 7,
  Octo: 8,
  OctoTentacle: 9,
  Base: 10,
  Worp: 11,
  TrainingKnight: 12,
  Any: 13,
} as const;

export const TROOP_TYPE_OPTIONS = [
  { label: "None", value: 0 },
  { label: "Scout", value: 1 },
  { label: "Soldier", value: 2 },
  { label: "Archer", value: 3 },
  { label: "Knight", value: 4 },
  { label: "Healer", value: 5 },
  { label: "Wizard", value: 6 },
  { label: "Thrall", value: 7 },
  { label: "Octo", value: 8 },
  { label: "Octo Tentacle", value: 9 },
  { label: "Base", value: 10 },
  { label: "Worp", value: 11 },
  { label: "Training Knight", value: 12 },
  { label: "Any", value: 13 },
] as const;

export function getTroopTypeName(type: number): string {
  const option = TROOP_TYPE_OPTIONS.find(opt => opt.value === type);
  return option ? option.label : "Unknown";
}
