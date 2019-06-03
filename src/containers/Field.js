import React, {Component} from 'react';
import '../stylesheets/Field.css';
import store from '../store';

class Field extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.ctx = null;
    this.cellsNumber = [30, 50];
  }

  setCanvasSize() {
    const element = this.canvas.current;
    const width = element.clientWidth;
    const height = element.clientHeight;
    element.width = width;
    element.height = height;
  }

  getCanvasContext() {
    this.ctx = this.canvas.current.getContext('2d');
  }

  clearCanvas() {
    const { width, height } = this.canvas.current;
    this.ctx.clearRect(0, 0, width, height);
  }

  drawFilledCells(filledCells, cellSide) {
    filledCells.forEach(cell => {
      const x = cell.x * cellSide;
      const y = cell.y * cellSide;
      this.ctx.fillStyle = cell.color;
      this.ctx.fillRect(x, y, cellSide, cellSide);
    });
  }

  drawActiveShape(activeShape, cellSide) {
    this.ctx.fillStyle = activeShape.color;
    activeShape.cells.forEach(cell => {
      const x = cell.x * cellSide;
      const y = cell.y * cellSide;
      this.ctx.fillRect(x, y, cellSide, cellSide);
    });
  }

  drawCellBorders(cellSide) {
    const { width, height } = this.canvas.current;
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 0.5;

    const drawLine = (from, to) => {
      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.stroke();
    };

    for (let i = 1; i < this.cellsNumber[0]; i++) {
      const x = i * cellSide;
      drawLine({x, y: 0}, {x, y: height});
    }

    for (let i = 1; i < this.cellsNumber[1]; i++) {
      const y = i * cellSide;
      drawLine({x: 0, y}, {x: width, y});
    }
  }

  redrawCanvas() {
    const { filledCells, cellSide, activeShape } = store.getState();
    this.clearCanvas();
    this.drawFilledCells(filledCells, cellSide);
    this.drawActiveShape(activeShape, cellSide);
    this.drawCellBorders(cellSide);
  }

  componentDidMount() {
    this.setCanvasSize();
    this.getCanvasContext();
  }

  componentDidUpdate() {
    this.redrawCanvas();
  }

  render() {
    return (
      <canvas ref={this.canvas} className="field"></canvas>
    );
  }
}

export default Field;
