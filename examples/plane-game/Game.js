import React, {Component} from 'react';
import {Layer} from 'react-konva';
import Ship from './Ship';
import {requestAnimationFrame, limit} from './util.js';

class Game extends Component {

  displayName = 'Game';

  constructor(props) {
    super(props);

    this.state = {
      playerY: this.props.height - 200,
      playerX: (this.props.width / 2) - 47,
      playerVelX: 0,
      playerVelY: 0,
      playerAccX: 0,
      playerAccY: 0,
      currentTick: 0
    };
  }

  tick = (timestampMs) => {
    const timestamp = timestampMs / 1000.0;

    if (this.state.currentTick === 0) {
      this.setState({currentTick: timestamp});
    } else {
      const maxSpeed = this.props.shipMaxSpeed;
      const x = this.state.playerX;
      const y = this.state.playerY;
      const velX = this.state.playerVelX;
      const velY = this.state.playerVelY;
      const diff = timestamp - this.state.currentTick;
      const inputHandler = this.props.inputHandler;

      const xMin = 0;
      const xMax = this.props.width - this.props.shipWidth;
      const yMin = 0;
      const yMax = this.props.height - this.props.shipHeight;

      let newX;
      let newY;
      let newVelX;
      let newVelY;
      let newAccX;
      let newAccY;

      if (inputHandler.leftOn) {
        newAccX = -this.props.shipAcceleration;
      } else if (inputHandler.rightOn) {
        newAccX = this.props.shipAcceleration;
      } else if (velX <= -1) {
        newAccX = this.props.shipAcceleration;
      } else if (velX >= 1) {
        newAccX = -this.props.shipAcceleration;
      } else {
        newAccX = 0;
      }

      if (inputHandler.upOn) {
        newAccY = -this.props.shipAcceleration;
      } else if (inputHandler.downOn) {
        newAccY = this.props.shipAcceleration;
      } else if (velY <= -1) {
        newAccY = this.props.shipAcceleration;
      } else if (velY >= 1) {
        newAccY = -this.props.shipAcceleration;
      } else {
        newAccY = 0;
      }

      newVelX = velX + newAccX * diff;
      newX = x + velX * diff + newAccX * Math.pow(diff, 2);
      newVelY = velY + newAccY * diff;
      newY = y + velY * diff + newAccY * Math.pow(diff, 2);

      newVelX = limit(newVelX, -maxSpeed, maxSpeed);
      newX = limit(newX, xMin, xMax);
      newVelY = limit(newVelY, -maxSpeed, maxSpeed);
      newY = limit(newY, yMin, yMax);

      if (newAccX === 0 && Math.abs(newVelX) < 1) {
        newVelX = 0;
      }
      if (newAccY === 0 && Math.abs(newVelY) < 1) {
        newVelY = 0;
      }

      this.setState({
        currentTick: timestamp,
        playerX: newX,
        playerY: newY,
        playerVelX: newVelX,
        playerVelY: newVelY,
        playerAccX: newAccX,
        playerAccY: 0
      });
    }

    window.requestAnimationFrame(this.tick);
  };

  componentDidMount() {
    window.requestAnimationFrame(this.tick);
  }

  render() {
    return (
      <Layer>
        <Ship image={this.props.image}
              animations={this.props.animations}
              x={this.state.playerX}
              y={this.state.playerY}
              velX={this.state.playerVelX}
              maxSpeed={this.props.shipMaxSpeed}/>
      </Layer>
    );
  }
}

Game.propTypes = {
  image: React.PropTypes.objectOf(Image).isRequired,
  animations: React.PropTypes.object.isRequired,
  shipMaxSpeed: React.PropTypes.number,
  shipAcceleration: React.PropTypes.number,
  shipHeight: React.PropTypes.number,
  shipWidth: React.PropTypes.number,
  height: React.PropTypes.number,
  width: React.PropTypes.number
};

Game.defaultProps = {
  shipMaxSpeed: 300,
  shipAcceleration: 300,
  shipHeight: 191,
  shipWidth: 95
};

export default Game;
