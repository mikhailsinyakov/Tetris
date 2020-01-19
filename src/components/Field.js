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

  drawCell({type, x, y, color, cssVar}) {
    const { scale: cellSide } = config;
    const borderSide = cellSide / 8;
    const innerCellSide = cellSide - 2 * borderSide;
    x = x * cellSide;
    y = y * cellSide;

		if (!color && cssVar) {
			color = getComputedStyle(document.documentElement).getPropertyValue(cssVar);
		}
		
    // Draw main part of the cell
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x + borderSide,
      y + borderSide,
      innerCellSide,
      innerCellSide
    );

    const cellBorderColors = {
      top: '#b3b3fb',
      left: '#0000d8',
      right: '#0000d8',
      bottom: '#000078'
    };

    const shadowBorderColors = {
      top: '#7B794A',
      left: '#76732B',
      right: '#76732B',
      bottom: '#5F5C07'
    };

    const borderColors = type === 'shapeShadow' ? shadowBorderColors : cellBorderColors;

    const borderCoords = {
      top: [
        { x, y },
        { x: x + borderSide, y: y + borderSide },
        { x: x + cellSide - borderSide, y: y + borderSide },
        { x: x + cellSide, y }
      ],
      left: [
        { x, y },
        { x: x + borderSide, y: y + borderSide},
        { x: x + borderSide, y: y + cellSide - borderSide },
        { x, y: y + cellSide }
      ],
      right: [
        { x: x + cellSide - borderSide, y: y + borderSide },
        { x: x + cellSide, y },
        { x: x + cellSide, y: y + cellSide },
        { x: x + cellSide - borderSide, y: y + cellSide - borderSide }
      ],
      bottom: [
        { x: x + borderSide, y: y + cellSide - borderSide },
        { x, y: y + cellSide },
        { x: x + cellSide, y: y + cellSide },
        { x: x + cellSide - borderSide, y: y + cellSide - borderSide }
      ]
    };

    const drawBorder = (coords, color) => {
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      for (const [i, { x, y }] of coords.entries()) {
        if (i === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.fill();
    };

    for (const border in borderCoords) {
      drawBorder(borderCoords[border], borderColors[border]);
    }

  }

  drawCells({type, cells, color, cssVar}) {
    cells.forEach(cell => this.drawCell({
			type, 
			x: cell.x, 
			y: cell.y, 
			color: cssVar ? color : color ? color : cell.color,
			cssVar
		}));
  }

  redrawCanvas() {
    const { filledCells, activeShape, shapeShadow } = this.props.state;
    this.clearCanvas();
    this.drawCells({type: 'filledCells', cells: filledCells});
    if (shapeShadow) {
      this.drawCells({type: 'shapeShadow', cells: shapeShadow, cssVar: '--primary-color'});
    }
    this.drawCells({type: 'activeShape', cells: activeShape.cells, color: activeShape.color});
  }

  componentDidMount() {
    this.getCanvasContext();
  }

  componentDidUpdate() {
    if (this.props.isPlaying) this.redrawCanvas();
  }

  render() {
    const { fieldSize: { width, height }, scale } = config;
    return (
      <canvas
        ref={this.canvas}
        className="field"
        width={width * scale}
        height={height * scale}
      >
      </canvas>
    );
  }
}

export default Field;
