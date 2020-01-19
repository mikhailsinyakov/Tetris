import React from 'react';

const Shape = ({nextShape}) => {
  if (!nextShape) {
    return (
      <svg width={50} height={50}></svg>
    );
  }

  const { color, initCells: coords } = nextShape;
  const maxX = Math.max(...coords.map(c => c.x));
  const minY = Math.min(...coords.map(c => c.y));
  const realCoords = coords.map(coord => {
    const addToX = (3 - maxX) / 2;
    return {
      x: (coord.x + addToX) * 12.5,
      y: (coord.y - minY) * 12.5
    };
  });

  return (
    <svg width={50} height={50} viewBox="0 0 50 50">
      {
        realCoords.map((coord, i) =>
          <rect
            key={i}
            x={coord.x}
            y={coord.y}
            width={12.5}
            height={12.5}
            style={{fill: color, stroke: 'var(--primary-color'}}
          />
        )
      }
    </svg>
  );
};

export default Shape;
