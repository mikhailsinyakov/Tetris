import React from 'react';
import availableShapes from '../availableShapes';

const Shape = ({nextShape}) => {
  if (!nextShape) {
    return (
      <svg width={50} height={50}></svg>
    );
  }

  const { type, rotation } = nextShape
  const shape = availableShapes[type];
  const color = shape.color;
  const coords = shape.rotations[rotation];

  const maxX = coords.reduce((max, val) => val.x > max ? val.x : max, 0);
  const realCoords = coords.map(coord => {
    const addToX = (3 - maxX) / 2;
    return {
      x: (coord.x + addToX) * 12.5,
      y: coord.y * 12.5
    };
  });

  return (
    <svg width={50} height={50}>
      {
        realCoords.map((coord, i) =>
          <rect
            key={i}
            x={coord.x}
            y={coord.y}
            width={12.5}
            height={12.5}
            style={{fill: color, stroke: 'red'}}
          />
        )
      }
    </svg>
  );
};

export default Shape;
