import React from 'react';
import Base from './Base';

class Component extends Base {

  componentDidMount() {
    super.componentDidMount();
    this.context.container.add(this.node);
  }

}

Component.contextTypes = {
  container: React.PropTypes.object.isRequired
};

export default Component;
