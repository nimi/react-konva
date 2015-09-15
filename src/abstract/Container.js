import React from 'react/addons';
import Base from './Base';

class Container extends Base {

  constructor() {
    super();
    this.node = new Set();
  }

  getChildContext() {
    return {
      container: this.node
    };
  }

  componentDidMount() {
    const mountedChildNodes = this.node;
    super.componentDidMount();
    mountedChildNodes.forEach(node => this.node.add(node));
  }

  render() {
    return (
      <span>
        {React.Children.map(this.props.children, child => child ? React.addons.cloneWithProps(child) : null)}
      </span>
    );
  }
}

Container.childContextTypes = {
  container: React.PropTypes.object.isRequired
};

Container.propTypes = {
  children: React.PropTypes.any
};

export default Container;
