import CustomKeyboardEvents from "./CustomKeyboardEvents";
import TouchListener from "./TouchListener";
import MouseListener from "./MouseListener";

class EventsHandler {
  constructor() {
    this.keyboardListener = new CustomKeyboardEvents();
    this.touchListener = new TouchListener();
    this.mouseListener = new MouseListener();
    this.isRunning = false;
    this.actions = {
      moveLeft: false,
      moveRight: false,
      moveTo: null,
      moveDown: false,
      speedUp: null,
      rotate: false,
      space: false,
      toDown: false
    };
  }

  get activeActions() {
    return this.actions;
  }

  addKeyListeners() {
    this.keyboardListener.listen();
    this.keyboardListener.addKey(
      "ArrowUp",
      { once: true },
      () => (this.actions.rotate = "clockwise")
    );
    this.keyboardListener.addKey(
      "ArrowLeft",
      { delay: 200 },
      () => (this.actions.moveLeft = true)
    );
    this.keyboardListener.addKey(
      "ArrowRight",
      { delay: 200 },
      () => (this.actions.moveRight = true)
    );
    this.keyboardListener.addKey(
      "ArrowDown",
      { delay: 0 },
      () => (this.actions.speedUp = { toBottom: false })
    );
    this.keyboardListener.addKey(
      "Space",
      { once: true },
      () => (this.actions.space = true)
    );
  }

  addTouchListener() {
    this.touchListener.listen(({ direction, touchBottom = false }) => {
      if (!direction) this.actions.rotate = "clockwise";
      else if (direction === "left") this.actions.moveLeft = true;
      else if (direction === "right") this.actions.moveRight = true;
      else if (direction === "down") {
        if (touchBottom) this.actions.speedUp = { toBottom: true };
        else this.actions.moveDown = true;
      }
    });
  }

  addMouseListener() {
    this.mouseListener.listen(action => {
      if (action.type === "wheel") {
        this.actions.rotate = { clockwise: !action.reverse };
      } else if (action.type === "mousemove")
        this.actions.moveTo = { cursor: action.coords };
      else if (action.type === "click") this.actions.toDown = true;
      else if (action.type === "right-click") {
        this.actions.speedUp = { toBottom: false };
      }
    });
  }

  on() {
    this.addKeyListeners();
    this.addTouchListener();
    this.addMouseListener();
    this.isRunning = true;
  }

  off() {
    this.keyboardListener.stop();
    this.touchListener.stop();
    this.mouseListener.stop();
    this.isRunning = false;
  }

  reset() {
    this.actions = {
      moveLeft: false,
      moveRight: false,
      speedUp: false,
      rotate: false,
      rotateReverse: false,
      space: false,
      moveDown: false,
      move: null,
      toDown: false
    };
  }

  shapeHasChanged() {
    this.keyboardListener.stopEvent();
  }
}

export default EventsHandler;
