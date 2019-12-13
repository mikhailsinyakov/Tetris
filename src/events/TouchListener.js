import config from '../config';
import store from '../store';

class TouchListener {
    constructor() {
			this.canvas = document.querySelector('canvas');
			this.startCoords = null;
			this.lastCoords = null;
			this.callback = null;
			this.nextShape = null;
			this.listener = this.listener.bind(this);
		}

		getCellWidth() {
			const canvasWidth = this.canvas.getBoundingClientRect().width;
			return canvasWidth / config.fieldSize.width;
		}

		getCanvasBottom() {
			const { height, top } = this.canvas.getBoundingClientRect();
			return top + height;
		}

		getDirection(from , to) {
			const deltaX = to.x - from.x;
			const deltaY = to.y - from.y;
			const cellWidth = this.getCellWidth();
			if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > cellWidth * 0.9) {
				return deltaX > 0 ? 'right' : 'left';
			} else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > cellWidth * 0.9) {
				return deltaY > 0 ? 'down' : 'top';
			}
			return null;
		}

		listener(e) {
			const { clientX: x, clientY: y, target } = e.changedTouches[0];
			const isTogglePlayingButton = target.id === 'toggle-playing';
			if (!isTogglePlayingButton) e.preventDefault();
			if (e.type === 'touchstart') {
				this.nextShape = store.getState().nextShape;
				this.startCoords = this.lastCoords = {x, y};
			} else if (e.type === 'touchmove') {
				const direction = this.getDirection(this.lastCoords, {x, y});
				if (direction) {
					this.callback({direction});
					this.lastCoords = {x, y};
				}
			} else if (e.type === 'touchend') {
				const { nextShape } = store.getState();
				if (this.startCoords.x === x && this.startCoords.y === y && !isTogglePlayingButton) {
					this.callback({direction: null});
				} else {
					const direction = this.getDirection(this.startCoords, {x, y});
					if (direction === 'down' && y > this.getCanvasBottom() && 
							this.nextShape === nextShape) { // Do not run, if shape was shanged
						this.callback({direction, touchBottom: true});
					}
				}
				this.nextShape = null;
			}

		}
		
		listen(fn) {
			document.body.addEventListener('touchstart', this.listener, {passive: false});
			document.body.addEventListener('touchmove', this.listener, {passive: false});
			document.body.addEventListener('touchend', this.listener, {passive: false});
			this.callback = fn;
		}

		stop() {
			document.body.removeEventListener('touchstart', this.listener);
			document.body.removeEventListener('touchmove', this.listener);
			document.body.removeEventListener('touchend', this.listener);
			this.callback = null;
		}
}

export default TouchListener;