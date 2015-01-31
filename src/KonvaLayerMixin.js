"use strict";

var KonvaLayerMixin = {
  componentDidUpdate: function () {
    this.getKonvaNode().draw();
  }
};

module.exports = KonvaLayerMixin;
