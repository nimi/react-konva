"use strict";

var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');
var Konva = require('konva');
var KonvaBaseMixin = require('./KonvaBaseMixin');
var KonvaContainerMixin = require('./KonvaContainerMixin');

/**
 * Core Konva stage.
 */
var Stage = React.createClass({
  displayName: 'Stage',

  mixins: [KonvaBaseMixin, KonvaContainerMixin],

  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  componentDidMount: function () {
    // So konva requires container to be available on creation time, but
    // as we need to add nodes before the DOM is available, we use 'fake' node
    // and then copy children to real one.
    var oldNode = this.getKonvaNode();
    // Konva modifies children array in place
    var children = oldNode.getChildren().slice();

    this._node = this.createKonvaNode({}, this.refs.canvas.getDOMNode());
    this.updateNodeProperties({});

    children.forEach(function (child) {
      child.moveTo(this.getKonvaNode());
    }.bind(this));

    oldNode.destroy();
  },

  createKonvaNode: function (props, container) {
    if (!container) {
      container = document.createElement("div");
    }
    return new Konva.Stage({
      container: container
    });
  },

  render: function () {
    return React.withContext({
      konvaContainer: this.getKonvaNode()
    }, function () {
      var children = React.Children.map(
        this.props.children,
        function (child) {
          return cloneWithProps(child, {});
        }.bind(this)
      );
      return React.DOM.div({},
        React.DOM.div({ref: 'canvas'}),
        children
      );
    }.bind(this));
  }
});

module.exports = Stage;
