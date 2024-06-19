type TBoard = number[][];

type TShape = 'round' | 'square';

type TTable = { id: number; co: { x: number; y: number }; size: { x: number; y: number }; shape: TShape };
