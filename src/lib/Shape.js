import config from '../config';
const { fieldSize } = config;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(cell) {
    return new Cell(this.x + cell.x, this.y + cell.y);
  }

  rotate(center, clockwise) {
    const dx1 = this.x + 0.5 - center.x, dy1 = this.y + 0.5 - center.y;
    const distance = Math.sqrt(dx1 ** 2 + dy1 ** 2);
		const angle = Math.atan2(dy1, dx1);
		const newAngle = clockwise ? angle + Math.PI / 2 : angle - Math.PI / 2;
    const dx2 = Math.round(Math.cos(newAngle) * distance * 10) / 10;
    const dy2 = Math.round(Math.sin(newAngle) * distance * 10) / 10;
    return new Cell(center.x + dx2 - 0.5, center.y + dy2 - 0.5);
  }

  isInLegalPlace(filledCells) {
    const { width, height } = fieldSize;

    return this.y < height && this.x >= 0 && this.x < width && 
            !filledCells.some(({x, y}) => x === this.x && y === this.y);
	}
	
	isInsideField() {
		const { width, height } = fieldSize;
		return this.y >= 0 && this.y < height && this.x >= 0 && this.x < width;
	}
}

const shapes = [
  {
    color: '#00f0f0',
    cells: [
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(2, 0),
      new Cell(3, 0)
    ]
  },
  {
    color: '#f0f000',
    cells: [
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(0, 1),
      new Cell(1, 1)
    ]
  },
  {
    color: '#a000f0',
    cells: [
      new Cell(1, 0),
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(2, 1)
    ]
  },
  {
    color: '#0000f0',
    cells: [
      new Cell(0, 0),
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(2, 1)
    ]
  },
  {
    color: '#00f000',
    cells: [
      new Cell(1, 0),
      new Cell(2, 0),
      new Cell(0, 1),
      new Cell(1, 1)
    ]
  },
  {
    color: '#f0a000',
    cells: [
      new Cell(2, 0),
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(2, 1)
    ]
  },
  {
    color: '#f00000',
    cells: [
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(1, 1),
      new Cell(2, 1)
    ]
  }
];


class Shape {
  constructor(...props) {
    if (!props.length) this.createRandomShape();
    else {
      const [initCells, pos, color] = props;
      this.initCells = initCells;
      this.pos = pos;
      this.color = color;
    }
    
  }

  createRandomShape() {
    const index = Math.floor(Math.random() * shapes.length);
    const shape = shapes[index];
    this.initCells = shape.cells;
    const { width, height } = this.size;
    this.pos = new Cell(
      Math.floor(fieldSize.width / 2 - width / 2),
      -height
    );
    this.color = shape.color;
    this.initRotate();
  }

  initRotate() {
    let shape = this;
    const num = Math.floor(Math.random() * 4);
    for (let i = 0; i < num; i++) shape = shape.tryToRotate([]);
    this.initCells = shape.initCells;
  }

  get size() {
		const cells = this.initCells;
    return {
      width: Math.max(...cells.map(c => c.x)) + 1,
      height: Math.max(...cells.map(c => c.y)) + 1
    };
  }

  get cells() {
    return this.initCells.map(cell => cell.plus(this.pos));
  }

  getShadow(filledCells) {
    const { height: fieldHeight } = fieldSize;
    let cells = this.cells;
    let moveIsAllowed = true;
  
    while (moveIsAllowed) {
      const newCells = cells.map(cell => new Cell(cell.x, cell.y + 1));
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
  }

  tryToMove(direction, filledCells) {
    const shiftX = direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
    const shiftY = direction === 'down' ? 1 : 0;
    const pos = this.pos.plus(new Cell(shiftX, shiftY));
    const cells = this.initCells.map(cell => cell.plus(pos));
    if (this.isInLegalPlace(filledCells, cells)) {
      return new Shape(this.initCells, pos, this.color);
    }
    return this;
  }

  tryToRotate(filledCells, clockwise) {
    const { width, height } = this.size;
		const center = new Cell(Math.floor(width / 2), Math.floor(height / 2));
		let initCells = this.initCells.map(cell => cell.rotate(center, clockwise));
		const minX = Math.min(...initCells.map(c => c.x));
		const minY = Math.min(...initCells.map(c => c.y));
		initCells = initCells.map(c => new Cell(c.x - minX, c.y - minY));

    const cells = initCells.map(cell => cell.plus(this.pos));
    if (this.isInLegalPlace(filledCells, cells)) {
      return new Shape(initCells, this.pos, this.color);
    }
    return this;
  }

  isInLegalPlace(filledCells, cells) {
    cells = cells || this.cells;
    return cells.every(cell => cell.isInLegalPlace(filledCells));
	}
	
	isInsideField() {
		return this.cells.every(cell => cell.isInsideField());
	}
}

export default Shape;