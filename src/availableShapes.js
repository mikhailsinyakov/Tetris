const availableShapes = [
  {
    color: 'blue',
    rotations: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 }
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 }
      ]
    ]
  },
  {
    color: 'pink',
    rotations: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ]
    ]
  },
  {
    color: 'yellow',
    rotations: [
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 2 }
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 }
      ],
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 }
      ]
    ]
  },
  {
    color: 'red',
    rotations: [
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 }
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 }
      ],
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 }
      ]
    ]
  },
  {
    color: 'silver',
    rotations: [
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 }
      ]
    ]
  },
  {
    color: 'gray',
    rotations: [
      [
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 }
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 }
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 }
      ]
    ]
  },
  {
    color: 'green',
    rotations: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ],
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 2 }
      ]
    ]
  }
];

export const getShape = (type, rotation) => {
  if (type !== undefined && rotation !== undefined) {
    const shape = availableShapes[type];
    const color = shape.color;
    const cells = shape.rotations[rotation];
    return { type, rotation, color, cells };
  } else {
    const shapesCount = availableShapes.length;
    const type = Math.floor(Math.random() * shapesCount);
    const shape = availableShapes[type];
    const color = shape.color;
    const rotationsCount = shape.rotations.length;
    const rotation = Math.floor(Math.random() * rotationsCount);
    const cells = shape.rotations[rotation];
    return { type, rotation, color, cells };
  }

};

export const rotateShape = (type, rotation) => {
  const shape = availableShapes[type];
  const rotationCount = shape.rotations.length;
  let newRotation = rotation + 1;
  if (newRotation === rotationCount) newRotation = 0;
  const { cells } = getShape(type, newRotation);
  return {
    rotation: newRotation,
    cells
  };
};

export const calcCellsDiff = (cells, changedCells) => {
  return cells.map((cell, i) => ({
    x: changedCells[i].x - cell.x,
    y: changedCells[i].y - cell.y
  }));
};
