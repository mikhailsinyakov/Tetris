import config from './config';

const availableShapes = [
  {
    color: '#00f0f0',
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
    color: '#f0f000',
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
    color: '#a000f0',
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
    color: '#0000f0',
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
    color: '#00f000',
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
    color: '#f0a000',
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
    color: '#f00000',
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

const rotateShape = shape => {
  const { type, rotation } = shape;
  const shapeObj = availableShapes[type];
  const rotationCount = shapeObj.rotations.length;
  let newRotation = rotation + 1;
  if (newRotation === rotationCount) newRotation = 0;
  const { cells } = getShape(type, newRotation);
  return {
    rotation: newRotation,
    cells
  };
};

const calcCellsDiff = (cells, changedCells) => {
  return cells.map((cell, i) => ({
    x: changedCells[i].x - cell.x,
    y: changedCells[i].y - cell.y
  }));
};

export const getShapeAfterRotating = shape => {
  const { type, rotation, cells } = shape;
  const { cells: initCells } = getShape(type, rotation);
  const {
    cells: changedCells,
    rotation: newRotation
  } = rotateShape(shape);
  const diffs = calcCellsDiff(initCells, changedCells);
  const newCells = cells.map((cell, i) => ({
    x: cell.x + diffs[i].x,
    y: cell.y + diffs[i].y
  }));

  return {
    ...shape,
    rotation: newRotation,
    cells: newCells
  };
};

export const getShapeShadow = (shape, filledCells) => {
  const { fieldSize: { height: fieldHeight } } = config;
  let { cells } = shape;
  let moveIsAllowed = true;

  while (moveIsAllowed) {
    const newCells = cells.map(({x, y}) => ({x, y: y + 1}));
    for (const cell of newCells) {
      if (filledCells.some(({x, y}) => x === cell.x && y === cell.y)) {
        moveIsAllowed = false;
        break;
      }
    }
    if (newCells.some(({x, y}) => y === fieldHeight)) moveIsAllowed = false;
    if (moveIsAllowed) cells = newCells;
  }
  return cells;
};