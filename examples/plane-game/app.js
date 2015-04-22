import React from 'react';
import Game from './Game';
import InputHandler from './InputHandler';
import {Stage} from 'react-konva';

const spriteImage = new Image(240, 2161);
spriteImage.src = './planesprite.png';

const spriteAnimations = {
  base: [0, 1005, 95, 151],
  toLeft: [0, 804, 95, 151, 0, 603, 95, 151, 0, 402, 95, 151, 0, 201, 95, 151, 0, 0, 95, 151],
  toRight: [0, 1206, 95, 151, 0, 1407, 95, 151, 0, 1609, 95, 151, 0, 1809, 95, 151, 145, 0, 95, 151]
};

const inputHandler = new InputHandler();

spriteImage.onload = function onload() {
  React.render(
    <Stage height={700} width={1000}>
      <Game image={spriteImage}
            animations={spriteAnimations}
            height={700}
            width={1000}
            inputHandler={inputHandler}/>
    </Stage>,
    document.getElementById('canvas')
  );
};
