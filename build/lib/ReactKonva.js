'use strict';

var KonvaProperty = require('./KonvaProperty');
var KonvaPropertyConfig = require('./KonvaPropertyConfig');

var KonvaHierarchy = KonvaPropertyConfig.KonvaHierarchy;

KonvaProperty.injectKonvaProperties(KonvaPropertyConfig.KonvaPropertyConfig, KonvaHierarchy, KonvaPropertyConfig.KonvaEvents);

var KonvaStage = require('./KonvaStage');
var KonvaFactory = require('./KonvaFactory');

module.exports = {
  Stage: KonvaStage
};

var excludeClasses = {
  Stage: true,
  Node: true,
  BaseLayer: true,
  Container: true
};

var containerClasses = {
  Layer: true,
  FastLayer: true,
  Group: true,
  Label: true
};

var layerClasses = {
  Layer: true,
  FastLayer: true
};

for (var konvaClass in KonvaHierarchy) {
  if (!excludeClasses[konvaClass]) {
    module.exports[konvaClass] = KonvaFactory.createSimpleClass(konvaClass, containerClasses[konvaClass], layerClasses[konvaClass]);
  }
}