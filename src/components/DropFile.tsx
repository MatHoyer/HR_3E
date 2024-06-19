import { useMapStore } from '@/Store';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';

export const DropFile = () => {
  const [file, setFile] = useState<{ boardSize: { x: number; y: number }; tables: TTable[] } | null>(null);
  const setTables = useMapStore((state) => state.setTables);
  const setBoard = useMapStore((state) => state.setBoard);
  const useMap = useMapStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      if (file.tables.length === 0) useMap.nextId = 1;
      else useMap.nextId = Math.max(...file.tables.map((table) => table.id));
      setTables(file.tables);
      const newBoard = Array(file.boardSize.y)
        .fill(0)
        .map(() => Array(file.boardSize.x).fill(0));
      file.tables.map((table) => {
        for (let x = table.co.x; x < table.co.x + table.size.x; x++) {
          for (let y = table.co.y; y < table.co.y + table.size.y; y++) {
            newBoard[x][y] = table.id;
          }
        }
      });
      console.log(newBoard);
      setBoard(newBoard);
      navigate('/');
    }
  }, [file]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
          setFile(JSON.parse(content));
        }
      };
      reader.readAsText(file);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const content = e.target?.result;
              if (typeof content === 'string') {
                setFile(JSON.parse(content));
              }
            };
            reader.readAsText(file);
          }
        }
      }
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Input type="file" name="file" onChange={onFileChange} />
      <div
        className="flex justify-center items-center border border-black h-64 w-64"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        Drop file here
      </div>
    </div>
  );
};
