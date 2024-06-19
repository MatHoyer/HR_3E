import { useBlueprintStore, useMapStore } from '@/Store';
import { cn } from '@/lib/utils';

export const Management = () => {
  const useBoard = useMapStore();
  const blueprints = useBlueprintStore((state) => state.blueprints);

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
        if (useBoard.board[x][y] !== 0) return;
      }
    }
    for (let x = co.x; x < co.x + Number(widget[0]); x++) {
      for (let y = co.y; y < co.y + Number(widget[1]); y++) {
        newBoard[x][y] = useBoard.nextId;
      }
    }
    useBoard.tables.push({ id: useBoard.nextId, co, size: { x: Number(widget[0]), y: Number(widget[1]) } });
    useBoard.nextId += 1;
    useBoard.setBoard(newBoard);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('drag over');
  };

  return (
    <>
      {useBoard.board.length !== 0 ? (
        <>
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
                      onDrop={(e) => handleOnDrop(e, { x: i, y: j })}
                      onDragOver={handleDragOver}
                    >
                      {c ? c : ''}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
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
          </div>
        </>
      ) : (
        <div className="mt-5 flex justify-center items-center">
          <p>You doesn't set a map yet</p>
        </div>
      )}
    </>
  );
};
