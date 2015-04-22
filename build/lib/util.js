"use strict";

module.exports = {
  nodeRenderer: function nodeRenderer() {
    if (this.nodeRender) {
      return this.nodeRender();
    } else {
      return null;
    }
  }
};