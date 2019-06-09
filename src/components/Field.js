import React, {Component} from 'react';
import config from '../config';
import '../stylesheets/Field.css';

class Field extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.ctx = null;
  }

  getCanvasContext() {
    this.ctx = this.canvas.current.getContext('2d');
  }

  clearCanvas() {
    const { width, height } = this.canvas.current;
    this.ctx.clearRect(0, 0, width, height);
  }

  drawCell(cell, color) {
    const { cellSide } = config;
    const borderSide = cellSide / 8;
    const innerCellSide = cellSide - 2 * borderSide;
    const x = cell.x * cellSide;
    const y = cell.y * cellSide;

    // Draw main part of the cell
    this.ctx.fillStyle = color ? color : cell.color;
    this.ctx.fillRect(
      x + borderSide,
      y + borderSide,
      innerCellSide,
      innerCellSide
    );

    const drawBorder = ({coords, color}) => {
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(coords[0].x, coords[0].y);
      this.ctx.lineTo(coords[1].x, coords[1].y);
      this.ctx.lineTo(coords[2].x, coords[2].y);
      this.ctx.lineTo(coords[3].x, coords[3].y);
      this.ctx.lineTo(coords[0].x, coords[0].y);
      this.ctx.fill();
    };

    const topBorder = {
      color: '#b3b3fb',
      coords: [
        { x, y },
        { x: x + borderSide, y: y + borderSide },
        { x: x + cellSide - borderSide, y: y + borderSide },
        { x: x + cellSide, y }
      ]
    };
    const leftBorder = {
      color: '#0000d8',
      coords: [
        { x, y },
        { x: x + borderSide, y: y + borderSide},
        { x: x + borderSide, y: y + cellSide - borderSide },
        { x, y: y + cellSide }
      ]
    };
    const rightBorder = {
      color: '#0000d8',
      coords: [
        { x: x + cellSide - borderSide, y: y + borderSide },
        { x: x + cellSide, y },
        { x: x + cellSide, y: y + cellSide },
        { x: x + cellSide - borderSide, y: y + cellSide - borderSide }
      ]
    };
    const bottomBorder = {
      color: '#000078',
      coords: [
        { x: x + borderSide, y: y + cellSide - borderSide },
        { x, y: y + cellSide },
        { x: x + cellSide, y: y + cellSide },
        { x: x + cellSide - borderSide, y: y + cellSide - borderSide }
      ]
    };

    // Draw borders
    drawBorder(topBorder);
    drawBorder(leftBorder);
    drawBorder(rightBorder);
    drawBorder(bottomBorder);

  }

  drawCells(cells, color) {
    cells.forEach(cell => this.drawCell(cell, color));
  }

  redrawCanvas() {
    const { filledCells, activeShape } = this.props.state;
    this.clearCanvas();
    this.drawCells(filledCells);
    this.drawCells(activeShape.cells, activeShape.color);
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
