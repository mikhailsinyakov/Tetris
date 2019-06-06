import React, {Component} from 'react';
import config from '../config';
import '../stylesheets/Field.css';
import store from '../store';

class Field extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.ctx = null;
    this.timeout = null;
  }

  getCanvasContext() {
    this.ctx = this.canvas.current.getContext('2d');
  }

  clearCanvas() {
    const { width, height } = this.canvas.current;
    this.ctx.clearRect(0, 0, width, height);
  }

  drawFilledCells(filledCells) {
    const { cellSide } = config;
    filledCells.forEach(cell => {
      const x = cell.x * cellSide;
      const y = cell.y * cellSide;
      this.ctx.fillStyle = cell.color;
      this.ctx.fillRect(x, y, cellSide, cellSide);
    });
  }

  drawActiveShape(activeShape) {
    const { cellSide } = config;
    this.ctx.fillStyle = activeShape.color;
    activeShape.cells.forEach(cell => {
      const x = cell.x * cellSide;
      const y = cell.y * cellSide;
      this.ctx.fillRect(x, y, cellSide, cellSide);
    });
  }

  drawCellBorders() {
    const { cellSide, fieldSize } = config;
    const { width, height } = this.canvas.current;
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 0.5;

    const drawLine = (from, to) => {
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.stroke();
    };

    for (let i = 1; i < fieldSize.width; i++) {
      const x = i * cellSide;
      drawLine({x, y: 0}, {x, y: height});
    }

    for (let i = 1; i < fieldSize.height; i++) {
      const y = i * cellSide;
      drawLine({x: 0, y}, {x: width, y});
    }
  }

  redrawCanvas() {
    const { filledCells, activeShape } = store.getState();
    this.clearCanvas();
    this.drawFilledCells(filledCells);
    this.drawActiveShape(activeShape);
    this.drawCellBorders();
  }

  componentDidMount() {
    this.getCanvasContext();
  }

  componentDidUpdate() {
    this.redrawCanvas();
  }

  render() {
    const { width, height } = config.fieldSizePx;
    return (
      <canvas
        ref={this.canvas}
        className="field"
        width={width}
        height={height}
      >
      </canvas>
    );
  }
}

export default Field;
