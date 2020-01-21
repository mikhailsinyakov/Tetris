import EventsHandler from '../events/EventsHandler';
import store from '../store';
import config from '../config';
import {
	startGame,
	finishGame,
  rotateShape,
  moveShape,
  clearLine,
  replaceShape,
  updateShapeShadow
} from '../actions';

class GameProcess {
	constructor() {
		this.eventsHandler = null;
		this.listener = null;
		this.isRunning = false;
		this.animationPlaying = false;
		this.updateTime = {
			standart: 370 - (this.state.info.level - 1) * 25,
			accelerated: (370 - (this.state.info.level - 1) * 25) / 10
		};
		this.updateMode = 'standart';
		this.futureActions = [];
		this.cursor = {x: null, outside: true, distance: 0};
		this.shapesCount = 0;
		this.update = this.update.bind(this);
	}

	get state() {
		return store.getState();
	}

	init() {
		this.eventsHandler = new EventsHandler();
	}
	
	addListener(fn) {
		this.listener = fn;
	}

	reset() {
		this.listener = null;
	}

	start() {
		store.dispatch(startGame());
		this.isRunning = true;
		this.animationPlaying = true;
		this.addAnimation();
		this.eventsHandler.on();
		this.shapesCount = 0;
		this.listener({type: 'start'});
	}

	pause() {
		this.animationPlaying = false;
		this.listener({type: 'pause'});
	}

	resume() {
		this.animationPlaying = true;
		this.listener({type: 'resume'});
	}

	finish() {
		store.dispatch(finishGame(Math.round(this.state.info.score)));
		this.animationPlaying = false;
		this.isRunning = false;
		this.eventsHandler.off();
		this.listener({type: 'finish'});
	}

	addAnimation() {
		requestAnimationFrame(this.update);
	}

	update(time, lastUpdate = 0) {
		if (this.isRunning) {
			this.handleActions();
			if (this.animationPlaying) {
				if (time > lastUpdate + this.updateTime[this.updateMode]) {
					this.move('down');
					lastUpdate = time;
				}
			}
			requestAnimationFrame(time => this.update(time, lastUpdate));
		}
	}

	handleActions() {
		const {activeActions} = this.eventsHandler;

		if (this.animationPlaying) {
			if (this.futureActions.length) {
				const action = this.futureActions.shift();
				action();
			} else this.getCloserToCursor();

			for (const action in activeActions) {
				const value = activeActions[action];
				if (value) {
					this.futureActions.push(() => this.runAction(action, value));
				}
			}
		} else if (activeActions.space) this.space();
		
		this.eventsHandler.reset();
	}


	runAction(action, value) {
		if (action === 'moveLeft') this.move('left');
		if (action === 'moveRight') this.move('right');
		if (action === 'moveTo') this.updateCursor(value.cursor);
		if (action === 'moveDown') this.move('down');
		if (action === 'speedUp') this.speedUp(value);
		if (action === 'rotate') this.rotate(value);
		if (action === 'space') this.space();
		if (action === 'toDown') this.toDown();
	}

	updateShadow() {
		store.dispatch(updateShapeShadow(this.state.activeShape, this.state.filledCells));
	}

	move(direction) {
		const { activeShape } = this.state;
		store.dispatch(moveShape(direction, this.state.filledCells));
		this.updateShadow();

		const moveDidNotHappen = this.state.activeShape === activeShape;
		if (direction === 'down' && moveDidNotHappen) this.handleNotMovingDown();
	}

	handleNotMovingDown() {
		const {activeShape, nextShape} = this.state;
		if (activeShape.isInsideField()) {
			store.dispatch(replaceShape(activeShape, nextShape));
			this.eventsHandler.shapeHasChanged();
			this.futureActions = [];
			this.shapesCount++;
			this.moveToCursor();
			this.clearFullLines();
			this.updateShadow();
			this.updateMode = 'standart';
		} else this.finish();
	}

	updateCursor(cursor) {
		if (cursor.x >= 0 && cursor.x < config.fieldSize.width &&
				cursor.y >= 0 && cursor.y < config.fieldSize.height) {
					this.cursor = {x: cursor.x, outside: false};
				}
		else if (!this.cursor.outside) this.cursor = {x: cursor.x, outside: true};
	}

	moveToCursor() {
		if (this.cursor.x === null) return;

		let deltaX = this.getDeltaXBetweenShapeAndCursor();
		let newDeltaX;
		
		while (deltaX !== 0 && newDeltaX !== 0 && deltaX !== newDeltaX) {
			if (newDeltaX !== undefined) deltaX = newDeltaX;
			const direction = deltaX > 0 ? 'right' : 'left';
			this.move(direction);

			newDeltaX = this.getDeltaXBetweenShapeAndCursor();
		}
	}

	getCloserToCursor() {
		if (this.cursor.x === null) return;
		const deltaX = this.getDeltaXBetweenShapeAndCursor();
		const distance = Math.abs(deltaX);
		if (distance > 0) {
			const direction = deltaX > 0 ? 'right' : 'left';
			this.move(direction);
			if (this.cursor.outside) {
				if (this.cursor.distance === distance) this.cursor.x = null;
				this.cursor.distance = distance;
			}
		} else if (this.cursor.outside) this.cursor.x = null;
	}

	getDeltaXBetweenShapeAndCursor() {
		const { activeShape } = this.state;
		const shapeWidth = activeShape.size.width;
		let x = shapeWidth > 2 ? this.cursor.x - 1 : this.cursor.x;
		x = Math.min(Math.max(0, x), config.fieldSize.width - 1);
		const currX = activeShape.pos.x;
		return x - currX;
	}

	speedUp({toBottom}) {
		this.updateMode = 'accelerated';
		if (!toBottom) this.futureActions.push(() => this.updateMode = 'standart'); 
	}

	rotate({clockwise}) {
		store.dispatch(
			rotateShape(store.getState().filledCells, clockwise)
		);
    this.updateShadow();
	}

	space() {
		if (this.animationPlaying) this.pause();
		else this.resume();
	}

	toDown() {
		const { activeShape } = this.state;
		const shapesCount = this.shapesCount;
		const shapeHeight = activeShape.size.height;
		const currY = activeShape.pos.y + shapeHeight;
		const distance = config.fieldSize.height - currY;
		for (let i = 0; i < distance; i++) {
			this.futureActions.push(() => {
				// Move down only current shape, don't move if shape was replaced
				if (this.shapesCount === shapesCount) this.move('down');
			});
		}
	}

	clearFullLines() {
    const { width, height } = config.fieldSize;
    for (let i = height - 1; i >= 0;) {
      const { filledCells } = this.state;
      const cellsOnLine = filledCells.filter(cell => cell.y === i).length;
      if (cellsOnLine === width) store.dispatch(clearLine(i));
      else if (!cellsOnLine) break;
      else i--;
    }
  }
}

export default GameProcess;