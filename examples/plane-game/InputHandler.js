const keyCodeMapping = {
  37: 'leftOn',
  38: 'upOn',
  39: 'rightOn',
  40: 'downOn'
};

class InputHandler {

  handleKeyDown = (event) => {
    const key = event.keyCode;
    const direction = keyCodeMapping[key];

    if (direction) {
      this[direction] = true;
    }
  };

  handleKeyUp = (event) => {
    const key = event.keyCode;
    const direction = keyCodeMapping[key];

    if (direction) {
      this[direction] = false;
    }
  };

  constructor() {
    this.leftOn = false;
    this.rigttOn = false;
    this.downOn = false;
    this.upOn = false;

    document.body.addEventListener('keydown', this.handleKeyDown, false);
    document.body.addEventListener('keyup', this.handleKeyUp, false);
  }
}

export default InputHandler;