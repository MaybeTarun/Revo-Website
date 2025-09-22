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
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }], 
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], 
  [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }], 
  [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 0 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
];


const FallingShapes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [nextId, setNextId] = useState(0);
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

    for (let r = rows - 10; r < rows; r++) {
      newGrid[r] = Array(cols).fill(1);
    }

    if (rows - 11 >= 0) {
      for (let c = cols - 15; c < cols; c++) {
        newGrid[rows - 11][c] = 1;
      }
    }

    if (rows - 12 >= 0) {
      for (let c = cols - 17; c < cols; c++) {
        newGrid[rows - 12][c] = 1;
      }
    }

    if (rows - 13 >= 0) {
      for (let c = cols - 13; c < cols; c++) {
        newGrid[rows - 13][c] = 1;
      }
      newGrid[rows - 13][cols - 17] = 1;
    }

    if (rows - 14 >= 0) {
      for (let c = cols - 13; c < cols; c++) {
        newGrid[rows - 14][c] = 1;
      }
    }

    if (rows - 15 >= 0) {
      for (let c = cols - 16; c <= cols - 10; c++) {
        newGrid[rows - 15][c] = 1;
      }
    }    

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

      const blocked = blocks.some(
        (b) => grid[b.y] && grid[b.y][startX + b.x] === 1
      );

      if (blocked) {
        setSpawnAllowed(false);
        clearInterval(interval);
        return;
      }

      const newShape: Shape = { id: nextId, blocks, x: startX, y: 0 };
      setNextId((id) => id + 1);
      setShapes((prev) => [...prev, newShape]);
    }, SPAWN_INTERVAL);

    return () => clearInterval(interval);
  }, [nextId, grid, spawnAllowed]);

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
