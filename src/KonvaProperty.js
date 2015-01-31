"use strict";

/**
 * Inject Konva property infos to KonvaProperty.
 *
 * @param {object} konvaConfig should be an object with keys as property names
 * and values as  objects of 'type', 'defaultValue', 'nodeType'.
 *
 * @param {object} konvaHierarchy should be a object with nodeType as key and
 * list of nodeType parents as values.
 *
 * @param {object} konvaEvents should be a object with React (onFoo) event
 * props and konva (foo) events.
 */
function injectKonvaProperties (konvaConfig,
                                  konvaHierarchy,
                                  konvaEvents) {
  for (var type in konvaHierarchy) {
    var parents = konvaHierarchy[type];
    KonvaProperty.getParents[type] = [type].concat(parents);
    for (var pi in parents) {
      var parent = parents[pi];
      var existingChildren = KonvaProperty.getChildren[parent] || [];
      existingChildren.push(type);
      KonvaProperty.getChildren[parent] = existingChildren;
    }
  }

  for (var propI in konvaConfig) {
    var data = konvaConfig[propI];
    var propName = data.propName;
    var propType = data.type;
    var defaultValue = data.defaultValue;
    var nodeType = data.nodeType;

    var children = [nodeType].concat(
      KonvaProperty.getChildren[nodeType] || []
    );
    for (var ci in children) {
      var child = children[ci];
      var existingProps = KonvaProperty.getValidProps[child] || {};
      existingProps[propName] = {
        type: propType,
        defaultValue: defaultValue
      };
      KonvaProperty.getValidProps[child] = existingProps;
    }
  }

  for (var eventName in konvaEvents) {
    KonvaProperty.getEventName[eventName] = konvaEvents[eventName] +
      "." + "react";
  }
}

/**
 * Similar to React those are objects that can be used as functions.
 *
 * KonvaProperty.getParents['Rect']
 * > ['Shape', 'Node']
 */
var KonvaProperty = {
  /**
   * Returns all parents for given Konva type.
   * @type {Object}
   */
  getParents: {},

  /**
   * Returns all parents for given Konva type.
   * @type {Object}
   */
  getChildren: {},

  /**
   * Returns a map of valid prop type for node type to [type, defaultValue]
   * @type {Object}
   */
  getValidProps: {},

  /**
   * Returns Konva event name for event property
   *
   */
  getEventName: {}
};

module.exports = {
  injectKonvaProperties: injectKonvaProperties,
  KonvaProperty: KonvaProperty
};
