import { create } from 'zustand';

type mapStore = {
  nextId: number;
  board: TBoard;
  tables: TTable[];
  setBoard: (newBoard: TBoard) => void;
  setTables: (newTables: TTable[]) => void;
};

export const useMapStore = create<mapStore>((set) => ({
  nextId: 1,
  board: [],
  tables: [],
  setBoard: (newBoard) => {
    set({ board: newBoard });
  },
  setTables: (newTables) => {
    set({ tables: newTables });
  },
}));

type blueprintStore = {
  blueprints: TBlueprint[];
  setBlueprints: (newBlueprints: TBlueprint[]) => void;
};

export const useBlueprintStore = create<blueprintStore>((set) => ({
  blueprints: [{ size: { x: 1, y: 1 } }, { size: { x: 2, y: 2 } }, { size: { x: 2, y: 4 } }, { size: { x: 4, y: 2 } }],
  setBlueprints: (newBlueprints) => {
    set({ blueprints: newBlueprints });
  },
}));
