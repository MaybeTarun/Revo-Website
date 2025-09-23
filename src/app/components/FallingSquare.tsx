"use client";

import React, { useEffect, useState, useRef } from "react";

interface Block {
  x: number;
  y: number;
}

interface Shape {
  id: number;
  blocks: Block[];
  x: number;
  y: number;
  landed?: boolean;
}

const SHAPES: Block[][] = [
  // I
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],

  // O
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],

  // Z
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],

  // S
  [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],

  // L
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }],
];



function fillRowCells(
  newGrid: number[][],
  rows: number,
  cols: number,
  rowFromBottom: number,
  startFromRight: number,
  endFromRight: number
) {
  const row = rows - rowFromBottom;
  const startCol = cols - startFromRight;
  const endCol = cols - endFromRight;

  if (row >= 0 && startCol >= 0 && endCol >= 0) {
    for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
      newGrid[row][c] = 1;
    }
  }
}

const FallingShapes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [grid, setGrid] = useState<number[][]>([]);
  const [spawnAllowed, setSpawnAllowed] = useState(true);

  const GRID_SIZE = 20;
  const DROP_INTERVAL = 300;
  const SPAWN_INTERVAL = 3000;

  useEffect(() => {
    if (!containerRef.current) return;

    const cols = 20;
    const rows = Math.floor(containerRef.current.clientHeight / GRID_SIZE);

    const newGrid: number[][] = Array.from({ length: rows }, () =>
      Array(cols).fill(0)
    );
    
    fillRowCells(newGrid, rows, cols, 1, 20, 2);
    fillRowCells(newGrid, rows, cols, 2, 20, 2);
    fillRowCells(newGrid, rows, cols, 3, 20, 2);
    fillRowCells(newGrid, rows, cols, 4, 20, 2);
    fillRowCells(newGrid, rows, cols, 5, 20, 2);
    fillRowCells(newGrid, rows, cols, 6, 20, 2);
    fillRowCells(newGrid, rows, cols, 7, 20, 2);
    fillRowCells(newGrid, rows, cols, 8, 20, 2);
    fillRowCells(newGrid, rows, cols, 9, 20, 2);
    fillRowCells(newGrid, rows, cols, 10, 20, 2);
    fillRowCells(newGrid, rows, cols, 11, 15, 2);
    fillRowCells(newGrid, rows, cols, 11, 20, 19);
    fillRowCells(newGrid, rows, cols, 12, 17, 2);
    fillRowCells(newGrid, rows, cols, 12, 20, 20);
    fillRowCells(newGrid, rows, cols, 13, 13, 2);
    fillRowCells(newGrid, rows, cols, 13, 17, 17);
    fillRowCells(newGrid, rows, cols, 14, 14, 2);
    fillRowCells(newGrid, rows, cols, 14, 18, 18);
    fillRowCells(newGrid, rows, cols, 15, 2, 2);
    fillRowCells(newGrid, rows, cols, 15, 16, 6);
    fillRowCells(newGrid, rows, cols, 16, 4, 2);
    fillRowCells(newGrid, rows, cols, 16, 6, 6);
    fillRowCells(newGrid, rows, cols, 16, 14, 10);
    fillRowCells(newGrid, rows, cols, 17, 5, 4);
    fillRowCells(newGrid, rows, cols, 17, 9, 8);
    fillRowCells(newGrid, rows, cols, 17, 13, 13);
    fillRowCells(newGrid, rows, cols, 18, 8, 8);
    fillRowCells(newGrid, rows, cols, 18, 2, 2);
    fillRowCells(newGrid, rows, cols, 18, 5, 5);
    fillRowCells(newGrid, rows, cols, 19, 2, 2);
    fillRowCells(newGrid, rows, cols, 19, 4, 4);
    fillRowCells(newGrid, rows, cols, 19, 7, 7);
    fillRowCells(newGrid, rows, cols, 20, 3, 3);
    fillRowCells(newGrid, rows, cols, 21, 3, 3);

    setGrid(newGrid);
  }, []);

  useEffect(() => {
    if (!spawnAllowed) return;
  
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const cols = 20;
  
      const blocks = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const shapeWidth = Math.max(...blocks.map((b) => b.x)) + 1;
      const startX = Math.floor(Math.random() * (cols - shapeWidth));
  
      let blocked = false;
  
      setGrid((prevGrid) => {
        blocked = blocks.some(
          (b) => prevGrid[b.y] && prevGrid[b.y][startX + b.x] === 1
        );
  
        return prevGrid;
      });
  
      if (blocked) {
        setSpawnAllowed(false);
        clearInterval(interval);
        return;
      }
  
      setShapes((prev) => [
        ...prev,
        { id: Date.now(), blocks, x: startX, y: 0 },
      ]);
    }, SPAWN_INTERVAL);
  
    return () => clearInterval(interval);
  }, [spawnAllowed]);   

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) => {
        const newShapes = prevShapes.map((shape) => {
          if (shape.landed) return shape;

          let canMoveDown = true;
          for (const block of shape.blocks) {
            const nextY = shape.y + 1 + block.y;
            const nextX = shape.x + block.x;
            if (!grid[nextY] || grid[nextY][nextX] === 1) {
              canMoveDown = false;
              break;
            }
          }

          if (canMoveDown) return { ...shape, y: shape.y + 1 };

          const newGrid = grid.map((row) => [...row]);
          for (const block of shape.blocks) {
            const gx = shape.x + block.x;
            const gy = shape.y + block.y;
            if (newGrid[gy]) newGrid[gy][gx] = 1;
          }
          setGrid(newGrid);
          return { ...shape, landed: true };
        });
        return newShapes;
      });
    }, DROP_INTERVAL);

    return () => clearInterval(interval);
  }, [grid]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      {grid.map((row, rIdx) =>
        row.map(
          (cell, cIdx) =>
            cell === 1 && (
              <div
                key={`grid-${rIdx}-${cIdx}`}
                className="absolute bg-black"
                style={{
                  width: GRID_SIZE,
                  height: GRID_SIZE,
                  left: cIdx * GRID_SIZE,
                  top: rIdx * GRID_SIZE,
                }}
              />
            )
        )
      )}
      {shapes.map((shape) =>
        shape.blocks.map((b, idx) => (
          <div
            key={`${shape.id}-${idx}`}
            className="absolute bg-black"
            style={{
              width: GRID_SIZE,
              height: GRID_SIZE,
              left: (shape.x + b.x) * GRID_SIZE,
              top: (shape.y + b.y) * GRID_SIZE,
            }}
          />
        ))
      )}
    </div>
  );
};

export default FallingShapes;
