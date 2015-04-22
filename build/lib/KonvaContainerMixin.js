'use strict';

var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');

var KonvaContainerMixin = {
  nodeRender: function nodeRender() {
    return React.withContext({
      konvaContainer: this.getKonvaNode()
    }, (function () {
      var children = React.Children.map(this.props.children, (function (child) {
        return cloneWithProps(child, {});
      }).bind(this));
      return React.DOM.span({}, children);
    }).bind(this));
  }
};

module.exports = KonvaContainerMixin;