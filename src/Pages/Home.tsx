import { useMapStore } from '@/Store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const EmptyBoard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <p>You doesn't upload any file yet</p>
      <Button onClick={() => navigate('/new-map')}>Create a new map</Button>
      <Button onClick={() => navigate('/upload')}>Upload map file</Button>
    </div>
  );
};

const Board = () => {
  const useBoard = useMapStore();
  const navigate = useNavigate();

  return (
    <>
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
              >
                {c ? c : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 mt-5">
        <Button onClick={() => navigate('/new-map')}>Create a new map</Button>
        <Button onClick={() => navigate('/upload')}>Upload map file</Button>
      </div>
    </>
  );
};

export const Home = () => {
  const useBoard = useMapStore();

  return (
    <div className="flex flex-col justify-center items-center">
      {useBoard.board.length === 0 ? <EmptyBoard /> : <Board />}
    </div>
  );
};
