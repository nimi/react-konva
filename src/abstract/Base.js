import React, {Component} from 'react';
import Konva from 'konva';
import {diff} from '../util';
import events from '../events.js';

class Base extends Component {

  createKonvaNode() {
    return new Konva[this.displayName](this.getValidProps());
  }

  componentDidMount() {
    this.node = this.createKonvaNode();
    this.updateNodeProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateNodeProps(newProps, this.props);
  }

  componentWillUnmount() {
    this.node.destroy();
  }

  isValidProp(prop) {
    return prop !== 'children';
  }

  getValidProps() {
    const props = {};

    Object.keys(this.props)
      .filter(prop => !events[prop] && this.isValidProp(prop))
      .forEach(prop => props[prop] = this.props[prop]);

    return props;
  }

  updateNodeProps(newProps, oldProps = {}) {
    const differences = diff(oldProps, newProps);

    for (let [prop, type] of differences.entries()) {
      const event = events[prop];
      const value = newProps[prop];

      if (event) {  // if an event handler prop
        if (type === 'delete') {
          this.node.off(event, value);
        } else if (type === 'create') {
          this.node.on(event, value);
        } else {
          this.node.off(event);
          this.node.on(event, value);
        }
      } else if (this.isValidProp(prop)) { // if an attribute
        if (type === 'delete') {
          this.node.setAttr(prop, null);
          delete this.node.attrs[prop];
        } else {
          this.node.setAttr(prop, value);
        }
      }
    }
  }

  render() {
    return <span/>;
  }
}

export default Base;
