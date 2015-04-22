"use strict";

var React = require("react");

/**
 * A base mixin for Konva nodes.
 */
var KonvaComponentMixin = {
  contextTypes: {
    konvaContainer: React.PropTypes.any.isRequired
  },

  componentDidMount: function componentDidMount() {
    this.context.konvaContainer.add(this._node);
  }
};

module.exports = KonvaComponentMixin;