"use strict";

var KonvaLayerMixin = {
  componentDidUpdate: function componentDidUpdate() {
    this.getKonvaNode().draw();
  }
};

module.exports = KonvaLayerMixin;