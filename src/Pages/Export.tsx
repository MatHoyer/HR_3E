import { useMapStore } from '@/Store';
import { Button } from '@/components/ui/button';

export const Export = () => {
  const tables = useMapStore((state) => state.tables);
  const board = useMapStore((state) => state.board);

  let url = '';
  if (board.length !== 0) {
    const data = {
      boardSize: { x: board[0].length, y: board.length },
      tables: tables,
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    url = URL.createObjectURL(blob);
  }
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {url === '' ? <p>Create a map before export</p> : <p>Export the map</p>}
      {url !== '' && (
        <Button asChild>
          <a href={url} download={'data.json'}>
            Export
          </a>
        </Button>
      )}
    </div>
  );
};
