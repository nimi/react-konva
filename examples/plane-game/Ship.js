import React, {Component} from 'react';
import {Sprite} from 'react-konva';

class Ship extends Component {

  displayName = 'Ship';

  render() {
    const frameStep = this.props.maxSpeed / 5;

    let turningFrame;

    turningFrame = Math.floor(Math.abs(this.props.velX) / frameStep);
    if (turningFrame > 4) {
      turningFrame = 4;
    }

    let animationDirection;

    if (this.props.velX < 0) {
      animationDirection = 'toLeft';
    } else if (this.props.velX > 0) {
      animationDirection = 'toRight';
    } else {
      animationDirection = 'base';
      turningFrame = 0;
    }

    return (
      <Sprite x={this.props.x}
              y={this.props.y}
              image={this.props.image}
              animation={animationDirection}
              animations={this.props.animations}
              frameIndex={turningFrame} />
    );
  }
}

Ship.propTypes = {
  image: React.PropTypes.objectOf(Image).isRequired,
  animations: React.PropTypes.object.isRequired,
  maxSpeed: React.PropTypes.number.isRequired,
  velX: React.PropTypes.number.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired
};

export default Ship;
