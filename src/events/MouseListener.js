import config from '../config';

class MouseListener {
	constructor() {
		this.canvas = document.querySelector('canvas');
		this.callback = null;
		this.moveTimer = null;
		this.handleMousemove = null;
		this.rightButtonDown = false;
		this.listener = this.listener.bind(this);
		this.sendRightClickEvent = this.sendRightClickEvent.bind(this);
	}

	listener(e) {
		if (e.type === 'wheel') {
			const reverse = e.deltaY < 0;
			this.callback({type: 'wheel', reverse});
		} else if (e.type === 'mousemove') {
			this.handleMousemove = () => {
				const canvasRect = this.canvas.getBoundingClientRect();
				const relativeToCanvas = {
					x: e.clientX - canvasRect.left,
					y: e.clientY - canvasRect.top
				};
				const cells = {
					width: config.fieldSize.width,
					height: config.fieldSize.height
				};
				const x = Math.floor(relativeToCanvas.x / canvasRect.width * cells.width);
				const y = Math.floor(relativeToCanvas.y / canvasRect.height * cells.height);
				this.callback({type: 'mousemove', coords: {x, y}});
			};
			if (!this.moveTimer) {
				this.moveTimer = setTimeout(() => {
					this.handleMousemove();
					this.moveTimer = null;
				}, 50);
			}
			
		} else if (e.type === 'click' && e.target.id !== 'toggle-playing') {
			this.callback({type: 'click'});
		} else if (e.type === 'mousedown') {
			// If it is right button
			if (e.button === 2) {
				this.rightButtonDown = true;
				this.sendRightClickEvent();
				this.callback({type: 'right-click'});
			}
		} else if (e.type === 'mouseup') {
			if (e.button === 2) this.rightButtonDown = false;
		} else if (e.type === 'contextmenu') e.preventDefault();
	}

	sendRightClickEvent() {
		if (this.rightButtonDown) {
			this.callback({type: 'right-click'});
			setTimeout(this.sendRightClickEvent, 50);
		}
	}

	listen(fn) {
		document.body.addEventListener('wheel', this.listener);
		document.body.addEventListener('mousemove', this.listener);
		document.body.addEventListener('click', this.listener);
		document.body.addEventListener('contextmenu', this.listener);
		document.body.addEventListener('mousedown', this.listener);
		document.body.addEventListener('mouseup', this.listener);
		this.callback = fn;
	}

	stop() {
		document.body.removeEventListener('wheel', this.listener);
		document.body.removeEventListener('mousemove', this.listener);
		document.body.removeEventListener('click', this.listener);
		document.body.removeEventListener('mousedown', this.listener);
		document.body.removeEventListener('mouseup', this.listener);
		this.callback = null;
	}
}

export default MouseListener;