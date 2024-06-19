import { create } from 'zustand';

type boardStore = {
  board: TBoard;
  setBoard: (newBoard: TBoard) => void;
};

export const useBoardStore = create<boardStore>((set) => ({
  board: [],
  setBoard: (newBoard) => {
    set({ board: newBoard });
  },
}));

type tablesStore = {
  tables: TTable[];
  setTables: (layout: TTable[]) => void;
};

export const useTablesStore = create<tablesStore>((set) => ({
  tables: [],
  setTables: (layout) => {
    set({ tables: layout });
  },
}));
