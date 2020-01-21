class CustomKeyboardEvents {
    constructor() {
				this.keys = {};
				this.listener = this.listener.bind(this);
				this.runEvent = true;
    }

    listen() {
        document.body.addEventListener('keydown', this.listener);
        document.body.addEventListener('keyup', this.listener);
    }

    stop() {
        document.body.removeEventListener('keydown', this.listener);
        document.body.removeEventListener('keyup', this.listener);
		}
		
		stopEvent() {
			this.runEvent = false;
		}

    listener(e) {
			e.preventDefault();
			if (e.type === 'keydown') {
					for (const keyCode in this.keys) {
							if (e.code === keyCode && this.keys[keyCode].pressed === false) {
									const {delay, once} = this.keys[keyCode].options;
									this.keys[keyCode].pressed = true;
									this.keys[keyCode].fn();
									if (!once) {
											const pressedTime = Date.now();
											this.keys[keyCode].timer = setInterval(() => {
												if (this.runEvent && Date.now() - pressedTime > delay) {
													this.keys[keyCode].fn();
												}
											}, 15);
									}
							}
					}
			} else if (e.type === 'keyup') {
					for (const keyCode in this.keys) {
							if (e.code === keyCode) {
									this.keys[keyCode].pressed = false;
									clearInterval(this.keys[keyCode].timer);
									this.keys[keyCode].timer = null;
							}
					}
					if (!this.runEvent) this.runEvent = true;
			}
    }

    addKey(keyCode, {delay = 0, once = false}, fn) {
        this.keys[keyCode] = {
            options: {delay, once},
            pressed: false,
            timer: null,
            fn
        };
    }
}

export default CustomKeyboardEvents;