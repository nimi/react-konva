import React from 'react';
import Container from './Container';

class ContainerComponent extends Container {

  componentDidMount() {
    super.componentDidMount(...arguments);
    this.context.container.add(this.node);
  }

}

ContainerComponent.contextTypes = {
  container: React.PropTypes.object.isRequired
};

export default ContainerComponent;
