import React from 'react';
import Konva from 'konva';
import Container from './abstract/Container';

class Stage extends Container {

  displayName = 'Stage';

  createKonvaNode() {
    return new Konva.Stage({
      container: React.findDOMNode(this.refs.canvas)
    });
  }

  render() {
    return (
        <div>
          <div ref="canvas"></div>
          {React.Children.map(this.props.children, child => React.addons.cloneWithProps(child))}
        </div>
    );
  }

}

Stage.propTypes = {
  children: React.PropTypes.any
};

export default Stage;
