import React, { Component } from 'react';
import Field from '../components/Field';
import Info from './Info';
import '../stylesheets/App.css';
import store from '../store';
import {
  startGame,
  resumeGame,
  pauseGame,
  rotateShape,
  moveShape,
  increaseSpeed,
  decreaseSpeed,
  makeMove,
  clearLine,
  replaceShape,
  finishGame,
  updateShapeShadow
} from '../actions';
import * as availableShapes from '../availableShapes';
import config from '../config';

class App extends Component {

  constructor(props) {
    super(props);
    this.timer = null;
    this.speedTimer = null;
  }

  canShapeRotate() {
    const { getShapeAfterRotating } = availableShapes;
    const { activeShape } = store.getState();
    const { cells } = getShapeAfterRotating(activeShape);

    return this.isLegalShapePosition(cells);
  }

  canShapeMoveTo(direction) {
    const { activeShape } = store.getState();
    const shift = direction === 'left' ? -1 : 1;
    const newCells = activeShape.cells.map(cell => ({
      x: cell.x + shift,
      y: cell.y
    }));

    return this.isLegalShapePosition(newCells);
  }

  updateShadow() {
    const { activeShape, filledCells } = store.getState();
    store.dispatch(updateShapeShadow(activeShape, filledCells));
  }

  attemptMove(direction) {
    if (this.canShapeMoveTo(direction)) {
      store.dispatch(moveShape(direction));
      this.updateShadow();
    }
  }

  attemptRotate() {
    if (this.canShapeRotate()) {
      store.dispatch(rotateShape());
      this.updateShadow();
    }
  }

  addKeyListeners() {
    document.body.addEventListener('keydown', e => {
      e.preventDefault();
      const { isPlaying, isOver, speedUp } = store.getState();
      if (!isPlaying) {
        if (e.code === 'Space') {
          if (isOver) {
            store.dispatch(startGame());
            const { activeShape, filledCells } = store.getState();
            store.dispatch(updateShapeShadow(activeShape, filledCells));
          }
          else store.dispatch(resumeGame());
        }
      } else {
        switch (e.code) {
          case 'ArrowUp':
            this.attemptRotate();
            break;
          case 'ArrowLeft':
            this.attemptMove('left');
            break;
          case 'ArrowRight':
            this.attemptMove('right');
            break;
          case 'ArrowDown':
            if (!speedUp) store.dispatch(increaseSpeed());
            break;
          case 'Space':
            store.dispatch(pauseGame());
            break;
          default:
            break;
        }
      }
    });

    document.body.addEventListener('keyup', e => {
      const { isPlaying } = store.getState();
      if (isPlaying && e.code === 'ArrowDown') store.dispatch(decreaseSpeed());
    });
  }

  addTouchListeners() {
    let lastCoords = null, startCoords = null, moving = false, nextShape = null;

    const handleTouchEvent = e => {
      const { isPlaying, speedUp } = store.getState();
      if (!isPlaying || e.changedTouches[0].target.id === 'toggle-playing') return;
      e.preventDefault();

      const { clientX, clientY } = e.changedTouches[0];
      if (e.type === 'touchstart') {
        lastCoords = startCoords = { clientX, clientY };
        nextShape = store.getState().nextShape;
      } else if (e.type === 'touchmove') {
        const wasShapeChanged = nextShape !== store.getState().nextShape;
        if (wasShapeChanged) return;
        if (!moving) moving = true;
        const shiftX = lastCoords.clientX - clientX;
        const shiftY = lastCoords.clientY - clientY;
        const direction = (() => {
          if (Math.abs(shiftX) > Math.abs(shiftY) * 3) {
            return shiftX > 0 ? 'left' : 'right';
          } 
          if (Math.abs(shiftY) > Math.abs(shiftX) * 3) {
            return shiftY > 0 ? 'top' : 'bottom';
          }
          return null;
        })();

        if (direction && (Math.abs(shiftX) > 15 || Math.abs(shiftY) > 15)) {
          lastCoords = { clientX, clientY };
        }
        if (direction === 'left' && Math.abs(shiftX) > 15) {
          this.attemptMove('left');
        } else if (direction === 'right' && Math.abs(shiftX) > 15) {
          this.attemptMove('right');
        } else if (direction === 'bottom' && Math.abs(shiftY) > 15) {
          if (!speedUp) store.dispatch(increaseSpeed());
        }
      } else if (e.type === 'touchend') {
        if (!moving) this.attemptRotate();
        else if (speedUp) {
          const shiftY = startCoords.clientY - clientY;
          if (Math.abs(shiftY) < 150) store.dispatch(decreaseSpeed());
        }
        lastCoords = startCoords = null;
        moving = false;
        nextShape = null;
      }
    };

    document.body.addEventListener('touchstart', handleTouchEvent, {passive: false});
    document.body.addEventListener('touchmove', handleTouchEvent, {passive: false});
    document.body.addEventListener('touchend', handleTouchEvent, {passive: false});
  }

  addListeners() {
    this.addKeyListeners();
    this.addTouchListeners();
  }

  isLegalShapePosition(cells) {
    const { filledCells } = store.getState();
    const { width, height } = config.fieldSize;

    for (const filledCell of filledCells) {
      for (const cell of cells) {
        if (filledCell.x === cell.x && filledCell.y === cell.y) {
          return false;
        }
      }
    }

    for (const cell of cells) {
      if (cell.y >= height) return false;
      if (cell.x < 0 || cell.x >= width) return false;
    }

    return true;
  }

  clearFullLines() {
    const { width, height } = config.fieldSize;
    for (let i = height - 1; i >= 0;) {
      const { filledCells } = store.getState();
      const cellsOnLine = filledCells.filter(cell => cell.y === i).length;
      if (cellsOnLine === width) store.dispatch(clearLine(i));
      else if (!cellsOnLine) break;
      else i--;
    }
  }

  isShapeOutsideField() {
    const { cells } = store.getState().activeShape;
    for (const cell of cells) {
      if (cell.y < 0) return true;
    }
    return false;
  }

  handleMove() {
    const { activeShape, nextShape } = store.getState();
    const newCells = activeShape.cells.map(cell => ({
      x: cell.x,
      y: cell.y + 1
    }));

    if (this.isLegalShapePosition(newCells)) {
      return store.dispatch(makeMove());
    }
    if (this.isShapeOutsideField()) {
      return store.dispatch(finishGame());
    }

    store.dispatch(replaceShape(activeShape, nextShape));
    this.clearFullLines();
    store.dispatch(makeMove());
    store.dispatch(updateShapeShadow(store.getState().activeShape, store.getState().filledCells));
  }

  updateTimers() {
    const { isPlaying, speedUp, info: { level } } = store.getState();
    const fps = {
      normal: 2 + level,
      speedUp: 20
    };

    const clearTimer = timer => {
      clearInterval(timer);
      return null;
    };

    const addTimer = fps =>
      setInterval(() =>
        this.handleMove(), 1000 / fps);

    if (!isPlaying) {
      if (this.timer) this.timer = clearTimer(this.timer);
      if (this.speedTimer) this.speedTimer = clearTimer(this.speedTimer);
    } else if (speedUp) {
      if (this.timer) this.timer = clearTimer(this.timer);
      if (!this.speedTimer) this.speedTimer = addTimer(fps.speedUp);
    } else {
      if (!this.timer) this.timer = addTimer(fps.normal);
      if (this.speedTimer) this.speedTimer = clearTimer(this.speedTimer);
    }
  }

  componentDidMount() {
    this.addListeners();
  }

  componentDidUpdate() {
    this.updateTimers();
  }


  render() {
    return (
      <div className="app">
        <Field state={store.getState()} />
        <Info />
      </div>
    );
  }
}

export default App;
