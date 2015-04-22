'use strict';

var React = require('react');
var Konva = require('konva');
var KonvaBaseMixin = require('./KonvaBaseMixin');
var KonvaComponentMixin = require('./KonvaComponentMixin');
var KonvaContainerMixin = require('./KonvaContainerMixin');
var KonvaLayerMixin = require('./KonvaLayerMixin');
var util = require('./util');

var KonvaFactory = {
  createSimpleClass: function createSimpleClass(konvaClass, container, layer) {
    var mixins = [KonvaBaseMixin, KonvaComponentMixin];

    if (container) {
      mixins.push(KonvaContainerMixin);
    }

    if (layer) {
      mixins.push(KonvaLayerMixin);
    }

    return React.createClass({
      displayName: konvaClass,

      mixins: mixins,

      createKonvaNode: function createKonvaNode(properties) {
        return new Konva[konvaClass](properties);
      },

      render: util.nodeRenderer
    });
  }
};

module.exports = KonvaFactory;