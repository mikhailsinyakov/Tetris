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
  clearLine,
  replaceShape,
  finishGame,
  updateShapeShadow
} from '../actions';
import config from '../config';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateSchedule = { speed: null, timer: null };
    this.updateShadow = this.updateShadow.bind(this);
    this.update = this.update.bind(this);
  }

  updateShadow() {
    const { activeShape, filledCells } = store.getState();
    store.dispatch(updateShapeShadow(activeShape, filledCells));
  }

  move(direction) {
    store.dispatch(moveShape(direction, store.getState().filledCells));
    this.updateShadow();
  }

  rotate() {
    store.dispatch(rotateShape(store.getState().filledCells));
    this.updateShadow();
  }

  addKeyListeners() {
    document.body.addEventListener('keydown', e => {
      e.preventDefault();
      const { isPlaying, isOver, speedUp } = store.getState();
      if (!isPlaying) {
        if (e.code === 'Space') {
          if (isOver) {
            store.dispatch(startGame());
            this.updateShadow();
          }
          else store.dispatch(resumeGame());
        }
      } else {
        switch (e.code) {
          case 'ArrowUp':
            this.rotate();
            break;
          case 'ArrowLeft':
            this.move('left');
            break;
          case 'ArrowRight':
            this.move('right');
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
          this.move('left');
        } else if (direction === 'right' && Math.abs(shiftX) > 15) {
          this.move('right');
        } else if (direction === 'bottom' && Math.abs(shiftY) > 15) {
          if (!speedUp) store.dispatch(increaseSpeed());
        }
      } else if (e.type === 'touchend') {
        if (!moving) this.rotate();
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

  update() {
    const { activeShape, nextShape, filledCells } = store.getState();
    this.move('down');

    const moveDone = activeShape !== store.getState().activeShape;
    if (!moveDone) {
      if (!activeShape.isInLegalPlace(filledCells)) {
        store.dispatch(finishGame());
      } else {
        store.dispatch(replaceShape(activeShape, nextShape));
        this.clearFullLines();
        this.move('down');
      }
    }
  }

  updateTimer() {
    const { isPlaying, speedUp, info: { level } } = store.getState();
    const fps = {
      normal: 2 + level,
      speedUp: 20
    };

    if (!isPlaying) {
      if (this.updateSchedule.timer) {
        clearInterval(this.updateSchedule.timer);
        this.updateSchedule.timer = null;
      }
    } else if (speedUp && this.updateSchedule.speed !== 'speedUp') {
      clearInterval(this.updateSchedule.timer);
      this.updateSchedule = {
        speed: 'speedUp',
        timer: setInterval(this.update, 1000 / fps.speedUp)
      };
    } else if (!speedUp && this.updateSchedule.speed !== 'normal') {
      clearInterval(this.updateSchedule.timer);
      this.updateSchedule = {
        speed: 'normal',
        timer: setInterval(this.update, 1000 / fps.normal)
      };
    }
  }

  componentDidMount() {
    this.addListeners();
  }

  componentDidUpdate() {
    this.updateTimer();
  }

  render() {
    return (
      <div className="app">
        <Field state={store.getState()} />
        <Info updateShadow={this.updateShadow} />
      </div>
    );
  }
}

export default App;
