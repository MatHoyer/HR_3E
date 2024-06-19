import { useBlueprintStore, useMapStore } from '@/Store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import { useState } from 'react';

const Manager = () => {
  const useBoard = useMapStore();
  const blueprints = useBlueprintStore((state) => state.blueprints);
  const [selectedId, setSelectedId] = useState(0);

  const handleOnDrag = (e: React.DragEvent, widgetType: string) => {
    e.dataTransfer.setData('widgetType', widgetType);
  };

  const handleOnDrop = (e: React.DragEvent, co: TCoordinate) => {
    const widgetType = e.dataTransfer.getData('widgetType') as string;
    console.log('widgetType', widgetType);
    const widget = widgetType.split(' ');
    const newBoard = useBoard.board;
    for (let x = co.x; x < co.x + Number(widget[0]); x++) {
      for (let y = co.y; y < co.y + Number(widget[1]); y++) {
        if (y >= useBoard.board.length || x >= useBoard.board[0].length) return;
        if (useBoard.board[y][x] !== 0) return;
      }
    }
    for (let x = co.x; x < co.x + Number(widget[0]); x++) {
      for (let y = co.y; y < co.y + Number(widget[1]); y++) {
        newBoard[y][x] = useBoard.nextId;
      }
    }
    useBoard.tables.push({ id: useBoard.nextId, co, size: { x: Number(widget[0]), y: Number(widget[1]) } });
    useBoard.nextId += 1;
    useBoard.setBoard(newBoard);
    setSelectedId(0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('drag over');
  };

  const handleDelete = () => {
    const newTables = useBoard.tables.filter((table) => table.id !== selectedId);
    const newBoard = useBoard.board;
    for (let i = 0; i < newBoard.length; i++) {
      for (let j = 0; j < newBoard[i].length; j++) {
        if (newBoard[i][j] === selectedId) {
          newBoard[i][j] = 0;
        }
      }
    }
    useBoard.setBoard(newBoard);
    useBoard.setTables(newTables);
    setSelectedId(0);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col border border-black">
        {useBoard.board.map((line, i) => (
          <div key={i} className="flex">
            {line.map((c, j) => (
              <div
                key={i + j}
                className={cn(
                  c === 0 ? 'bg-transparent' : 'bg-orange-950',
                  'flex size-10 text-white justify-center items-center border border-black'
                )}
                onDrop={(e) => handleOnDrop(e, { x: j, y: i })}
                onDragOver={handleDragOver}
                onClick={() => {
                  setSelectedId(useBoard.board[i][j]);
                }}
              >
                {c ? c : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-5">
        {blueprints.map((blueprint) => {
          const index = '' + blueprint.size.x + ' ' + blueprint.size.y;
          return (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleOnDrag(e, index)}
              className="flex justify-center items-center size-10 text-white bg-orange-950"
            >
              {index}
            </div>
          );
        })}
        <Button disabled={selectedId === 0} onClick={handleDelete}>
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export const Management = () => {
  const useBoard = useMapStore();

  return (
    <>
      {useBoard.board.length !== 0 ? (
        <Manager />
      ) : (
        <div className="flex justify-center items-center">
          <p>Create a map before manage it</p>
        </div>
      )}
    </>
  );
};
