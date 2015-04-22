(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("konva"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "konva"], factory);
	else if(typeof exports === 'object')
		exports["ReactKonva"] = factory(require("react"), require("konva"));
	else
		root["ReactKonva"] = factory(root["React"], root["Konva"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var ReactKonva = __webpack_require__(1);

	module.exports = ReactKonva;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var KonvaProperty = __webpack_require__(2);
	var KonvaPropertyConfig = __webpack_require__(3);

	var KonvaHierarchy = KonvaPropertyConfig.KonvaHierarchy;

	KonvaProperty.injectKonvaProperties(KonvaPropertyConfig.KonvaPropertyConfig, KonvaHierarchy, KonvaPropertyConfig.KonvaEvents);

	var KonvaStage = __webpack_require__(4);
	var KonvaFactory = __webpack_require__(5);

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	function injectKonvaProperties(konvaConfig, konvaHierarchy, konvaEvents) {
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

	    var children = [nodeType].concat(KonvaProperty.getChildren[nodeType] || []);
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
	    KonvaProperty.getEventName[eventName] = konvaEvents[eventName] + "." + "react";
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var KonvaPropertyConfig = [];

	var KonvaHierarchy = {
	  Node: [],
	  Stage: ['Node'],
	  Container: ['Node'],
	  BaseLayer: ['Container', 'Node'],
	  Layer: ['Container', 'Node'],
	  FastLayer: ['Container', 'Node'],
	  Group: ['Container', 'Node'],
	  Label: ['Group', 'Container', 'Node'],
	  Shape: ['Node'],
	  Rect: ['Shape', 'Node'],
	  Circle: ['Shape', 'Node'],
	  Ellipse: ['Shape', 'Node'],
	  Ring: ['Shape', 'Node'],
	  Wedge: ['Shape', 'Node'],
	  Arc: ['Shape', 'Node'],
	  Image: ['Shape', 'Node'],
	  Text: ['Shape', 'Node'],
	  Line: ['Shape', 'Node'],
	  Sprite: ['Shape', 'Node'],
	  Path: ['Shape', 'Node'],
	  TextPath: ['Shape', 'Node', 'Path', 'Text'],
	  RegularPolygon: ['Shape', 'Node'],
	  Star: ['Shape', 'Node'],
	  Tag: ['Shape', 'Node']
	};

	var KonvaEvents = {
	  onMouseOver: 'mouseover',
	  onMouseOut: 'mouseout',
	  onMouseEnter: 'mouseenter',
	  onMouseLeave: 'mouseleave',
	  onMouseMove: 'mousemove',
	  onMouseDown: 'mousedown',
	  onMouseUp: 'mouseup',
	  onMouseWheel: 'mousewheel',
	  onClick: 'click',
	  onDblClick: 'dblclick',
	  onDragStar: 'dragstart',
	  onDragEnd: 'dragend',
	  onTouchStart: 'touchstart',
	  onTouchMove: 'touchmove',
	  onTouchEnd: 'touchend',
	  onTap: 'tap',
	  onDblTap: 'dbltap',
	  onDragMove: 'dragmove'
	};

	function addToPropertyConfig(nodeType, propName, defaultValue) {
	  KonvaPropertyConfig.push({
	    propName: propName,
	    type: undefined,
	    nodeType: nodeType,
	    defaultValue: defaultValue
	  });
	}

	// This is done in this way so that it's easier to import from grep over Konva
	// code.
	addToPropertyConfig('Node', 'x', 0);
	addToPropertyConfig('Node', 'y', 0);
	addToPropertyConfig('Node', 'position');
	addToPropertyConfig('Node', 'name');
	addToPropertyConfig('Node', 'id');
	addToPropertyConfig('Node', 'dragDistance');
	addToPropertyConfig('Node', 'width');
	addToPropertyConfig('Node', 'height');
	addToPropertyConfig('Node', 'size');
	addToPropertyConfig('Node', 'draggable');
	addToPropertyConfig('Node', 'opacity', 1);
	addToPropertyConfig('Node', 'rotation', 0);
	addToPropertyConfig('Node', 'scale');
	addToPropertyConfig('Node', 'scaleX', 1);
	addToPropertyConfig('Node', 'scaleY', 1);
	addToPropertyConfig('Node', 'skew');
	addToPropertyConfig('Node', 'skewX', 0);
	addToPropertyConfig('Node', 'skewY', 0);
	addToPropertyConfig('Node', 'offset');
	addToPropertyConfig('Node', 'offsetX', 0);
	addToPropertyConfig('Node', 'offsetY', 0);
	addToPropertyConfig('Node', 'listening', 'inherit');
	addToPropertyConfig('Node', 'filters', undefined);
	addToPropertyConfig('Node', 'visible', 'inherit');
	addToPropertyConfig('Node', 'transformsEnabled', 'all');
	addToPropertyConfig('Node', 'brightness', 0, null);
	addToPropertyConfig('Node', 'blurRadius', 0, null);
	addToPropertyConfig('Node', 'threshold', 0, null);
	addToPropertyConfig('Node', 'red', 0);
	addToPropertyConfig('Node', 'green', 0);
	addToPropertyConfig('Node', 'blue', 0);
	addToPropertyConfig('Node', 'hue', 0, null);
	addToPropertyConfig('Node', 'saturation', 0, null);
	addToPropertyConfig('Node', 'value', 0, null);
	addToPropertyConfig('Node', 'hue', 0, null);
	addToPropertyConfig('Node', 'saturation', 0, null);
	addToPropertyConfig('Node', 'luminance', 0, null);
	addToPropertyConfig('Node', 'embossStrength', 0.5, null);
	addToPropertyConfig('Node', 'embossWhiteLevel', 0.5, null);
	addToPropertyConfig('Node', 'embossDirection', 'top-left', null);
	addToPropertyConfig('Node', 'embossBlend', false, null);
	addToPropertyConfig('Node', 'enhance', 0, null);
	addToPropertyConfig('Node', 'levels', 0.5, null);
	addToPropertyConfig('Node', 'noise', 0.2, null);
	addToPropertyConfig('Node', 'pixelSize', 8, null);
	addToPropertyConfig('Node', 'threshold', 0.5, null);
	addToPropertyConfig('Node', 'kaleidoscopePower', 2, null);
	addToPropertyConfig('Node', 'kaleidoscopeAngle', 0, null);
	addToPropertyConfig('Node', 'dragBoundFunc');
	addToPropertyConfig('Container', 'clip');
	addToPropertyConfig('Container', 'clipX');
	addToPropertyConfig('Container', 'clipY');
	addToPropertyConfig('Container', 'clipWidth');
	addToPropertyConfig('Container', 'clipHeight');
	addToPropertyConfig('Container', 'mask');
	addToPropertyConfig('Container', 'maskImage');
	addToPropertyConfig('Container', 'maskComposition');
	addToPropertyConfig('Container', 'maskX');
	addToPropertyConfig('Container', 'maskY');
	addToPropertyConfig('Container', 'maskWidth');
	addToPropertyConfig('Container', 'maskHeight');
	addToPropertyConfig('Shape', 'stroke');
	addToPropertyConfig('Shape', 'strokeRed', 0);
	addToPropertyConfig('Shape', 'strokeGreen', 0);
	addToPropertyConfig('Shape', 'strokeBlue', 0);
	addToPropertyConfig('Shape', 'strokeAlpha', 1);
	addToPropertyConfig('Shape', 'strokeWidth', 2);
	addToPropertyConfig('Shape', 'lineJoin');
	addToPropertyConfig('Shape', 'lineCap');
	addToPropertyConfig('Shape', 'sceneFunc');
	addToPropertyConfig('Shape', 'hitFunc');
	addToPropertyConfig('Shape', 'dash');
	addToPropertyConfig('Shape', 'shadowColor');
	addToPropertyConfig('Shape', 'shadowRed', 0);
	addToPropertyConfig('Shape', 'shadowGreen', 0);
	addToPropertyConfig('Shape', 'shadowBlue', 0);
	addToPropertyConfig('Shape', 'shadowAlpha', 1);
	addToPropertyConfig('Shape', 'shadowBlur');
	addToPropertyConfig('Shape', 'shadowOpacity');
	addToPropertyConfig('Shape', 'shadowOffset');
	addToPropertyConfig('Shape', 'shadowOffsetX', 0);
	addToPropertyConfig('Shape', 'shadowOffsetY', 0);
	addToPropertyConfig('Shape', 'fillPatternImage');
	addToPropertyConfig('Shape', 'fill');
	addToPropertyConfig('Shape', 'fillRed', 0);
	addToPropertyConfig('Shape', 'fillGreen', 0);
	addToPropertyConfig('Shape', 'fillBlue', 0);
	addToPropertyConfig('Shape', 'fillAlpha', 1);
	addToPropertyConfig('Shape', 'fillPatternX', 0);
	addToPropertyConfig('Shape', 'fillPatternY', 0);
	addToPropertyConfig('Shape', 'fillLinearGradientColorStops');
	addToPropertyConfig('Shape', 'fillRadialGradientStartRadius', 0);
	addToPropertyConfig('Shape', 'fillRadialGradientEndRadius', 0);
	addToPropertyConfig('Shape', 'fillRadialGradientColorStops');
	addToPropertyConfig('Shape', 'fillPatternRepeat', 'repeat');
	addToPropertyConfig('Shape', 'fillEnabled', true);
	addToPropertyConfig('Shape', 'strokeEnabled', true);
	addToPropertyConfig('Shape', 'shadowEnabled', true);
	addToPropertyConfig('Shape', 'dashEnabled', true);
	addToPropertyConfig('Shape', 'strokeScaleEnabled', true);
	addToPropertyConfig('Shape', 'fillPriority', 'color');
	addToPropertyConfig('Shape', 'fillPatternOffset');
	addToPropertyConfig('Shape', 'fillPatternOffsetX', 0);
	addToPropertyConfig('Shape', 'fillPatternOffsetY', 0);
	addToPropertyConfig('Shape', 'fillPatternScale');
	addToPropertyConfig('Shape', 'fillPatternScaleX', 1);
	addToPropertyConfig('Shape', 'fillPatternScaleY', 1);
	addToPropertyConfig('Shape', 'fillLinearGradientStartPoint');
	addToPropertyConfig('Shape', 'fillLinearGradientStartPointX', 0);
	addToPropertyConfig('Shape', 'fillLinearGradientStartPointY', 0);
	addToPropertyConfig('Shape', 'fillLinearGradientEndPoint');
	addToPropertyConfig('Shape', 'fillLinearGradientEndPointX', 0);
	addToPropertyConfig('Shape', 'fillLinearGradientEndPointY', 0);
	addToPropertyConfig('Shape', 'fillRadialGradientStartPoint');
	addToPropertyConfig('Shape', 'fillRadialGradientStartPointX', 0);
	addToPropertyConfig('Shape', 'fillRadialGradientStartPointY', 0);
	addToPropertyConfig('Shape', 'fillRadialGradientEndPoint');
	addToPropertyConfig('Shape', 'fillRadialGradientEndPointX', 0);
	addToPropertyConfig('Shape', 'fillRadialGradientEndPointY', 0);
	addToPropertyConfig('Shape', 'fillPatternRotation', 0);
	addToPropertyConfig('BaseLayer', 'clearBeforeDraw', true);
	addToPropertyConfig('Layer', 'hitGraphEnabled', true);
	addToPropertyConfig('Rect', 'cornerRadius', 0);
	addToPropertyConfig('Circle', 'radius', 0);
	addToPropertyConfig('Ellipse', 'radius');
	addToPropertyConfig('Ellipse', 'radiusX', 0);
	addToPropertyConfig('Ellipse', 'radiusY', 0);
	addToPropertyConfig('Ring', 'innerRadius', 0);
	addToPropertyConfig('Ring', 'outerRadius', 0);
	addToPropertyConfig('Wedge', 'radius', 0);
	addToPropertyConfig('Wedge', 'angle', 0);
	addToPropertyConfig('Wedge', 'clockwise', false);
	addToPropertyConfig('Arc', 'innerRadius', 0);
	addToPropertyConfig('Arc', 'outerRadius', 0);
	addToPropertyConfig('Arc', 'angle', 0);
	addToPropertyConfig('Arc', 'clockwise', false);
	addToPropertyConfig('Image', 'image');
	addToPropertyConfig('Image', 'crop');
	addToPropertyConfig('Image', 'cropX', 0);
	addToPropertyConfig('Image', 'cropY', 0);
	addToPropertyConfig('Image', 'cropWidth', 0);
	addToPropertyConfig('Image', 'cropHeight', 0);
	addToPropertyConfig('Text', 'fontFamily', 'Arial');
	addToPropertyConfig('Text', 'fontSize', 12);
	addToPropertyConfig('Text', 'fontStyle', 'normal');
	addToPropertyConfig('Text', 'fontVariant', 'normal');
	addToPropertyConfig('Text', 'padding', 0);
	addToPropertyConfig('Text', 'align', 'left');
	addToPropertyConfig('Text', 'lineHeight', 1);
	addToPropertyConfig('Text', 'wrap', 'word');
	addToPropertyConfig('Text', 'text');
	addToPropertyConfig('Line', 'closed', false);
	addToPropertyConfig('Line', 'tension', 0);
	addToPropertyConfig('Line', 'points');
	addToPropertyConfig('Sprite', 'animation');
	addToPropertyConfig('Sprite', 'animations');
	addToPropertyConfig('Sprite', 'image');
	addToPropertyConfig('Sprite', 'frameIndex', 0);
	addToPropertyConfig('Sprite', 'frameRate', 17);
	addToPropertyConfig('Path', 'data');
	addToPropertyConfig('TextPath', 'fontFamily', 'Arial');
	addToPropertyConfig('TextPath', 'fontSize', 12);
	addToPropertyConfig('TextPath', 'fontStyle', 'normal');
	addToPropertyConfig('TextPath', 'fontVariant', 'normal');
	addToPropertyConfig('RegularPolygon', 'radius', 0);
	addToPropertyConfig('RegularPolygon', 'sides', 0);
	addToPropertyConfig('Star', 'numPoints', 5);
	addToPropertyConfig('Star', 'innerRadius', 0);
	addToPropertyConfig('Star', 'outerRadius', 0);
	addToPropertyConfig('Tag', 'pointerDirection', 'none');
	addToPropertyConfig('Tag', 'pointerWidth', 0);
	addToPropertyConfig('Tag', 'pointerHeight', 0);
	addToPropertyConfig('Tag', 'cornerRadius', 0);

	module.exports = {
	  KonvaPropertyConfig: KonvaPropertyConfig,
	  KonvaHierarchy: KonvaHierarchy,
	  KonvaEvents: KonvaEvents
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);
	var cloneWithProps = __webpack_require__(13);
	var Konva = __webpack_require__(7);
	var KonvaBaseMixin = __webpack_require__(8);
	var KonvaContainerMixin = __webpack_require__(9);

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

	  componentDidMount: function componentDidMount() {
	    // So konva requires container to be available on creation time, but
	    // as we need to add nodes before the DOM is available, we use 'fake' node
	    // and then copy children to real one.
	    var oldNode = this.getKonvaNode();
	    // Konva modifies children array in place
	    var children = oldNode.getChildren().slice();

	    this._node = this.createKonvaNode({}, this.refs.canvas.getDOMNode());
	    this.updateNodeProperties({});

	    children.forEach((function (child) {
	      child.moveTo(this.getKonvaNode());
	    }).bind(this));

	    oldNode.destroy();
	  },

	  createKonvaNode: function createKonvaNode(props, container) {
	    if (!container) {
	      container = document.createElement('div');
	    }
	    return new Konva.Stage({
	      container: container
	    });
	  },

	  render: function render() {
	    return React.withContext({
	      konvaContainer: this.getKonvaNode()
	    }, (function () {
	      var children = React.Children.map(this.props.children, (function (child) {
	        return cloneWithProps(child, {});
	      }).bind(this));
	      return React.DOM.div({}, React.DOM.div({ ref: 'canvas' }), children);
	    }).bind(this));
	  }
	});

	module.exports = Stage;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);
	var Konva = __webpack_require__(7);
	var KonvaBaseMixin = __webpack_require__(8);
	var KonvaComponentMixin = __webpack_require__(10);
	var KonvaContainerMixin = __webpack_require__(9);
	var KonvaLayerMixin = __webpack_require__(11);
	var util = __webpack_require__(12);

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var KonvaProperty = __webpack_require__(2).KonvaProperty;

	var KonvaBaseMixin = {
	  componentWillMount: function componentWillMount() {
	    this._propValidCache = {};
	    var initialProps = this._getRequiredUpdates({}, this.props);
	    this._node = this.createKonvaNode(initialProps.properties);
	  },

	  componentDidMount: function componentDidMount() {
	    this.updateNodeProperties({});
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    this.updateNodeProperties(prevProps);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.getKonvaNode().destroy();
	  },

	  getKonvaNode: function getKonvaNode() {
	    return this._node;
	  },

	  _isPropValid: function _isPropValid(prop) {
	    return KonvaProperty.getValidProps[this.constructor.displayName][prop];
	  },

	  _getValidProp: function _getValidProp(propKey) {
	    if (!this._propValidCache.hasOwnProperty(propKey)) {
	      this._propValidCache[propKey] = this._isPropValid(propKey);
	    }
	    return this._propValidCache[propKey];
	  },

	  _getRequiredUpdates: function _getRequiredUpdates(oldProps, newProps) {
	    var updates = {
	      eventsOn: {},
	      eventsOff: {},
	      properties: {}
	    };

	    var propKey;
	    var validEvent;
	    var validProp;

	    for (propKey in oldProps) {
	      validEvent = KonvaProperty.getEventName[propKey];
	      validProp = this._getValidProp(propKey);
	      if (!newProps.hasOwnProperty(propKey)) {
	        if (validEvent) {
	          updates.eventsOff[validEvent] = true;
	        } else if (validProp) {
	          updates.properties[propKey] = validProp[1];
	        }
	      }
	    }

	    for (propKey in newProps) {
	      validEvent = KonvaProperty.getEventName[propKey];
	      validProp = this._getValidProp(propKey);
	      if (validEvent) {
	        if (oldProps.hasOwnProperty(propKey)) {
	          if (oldProps[propKey] !== newProps[propKey]) {
	            updates.eventsOff[validEvent] = true;
	            updates.eventsOn[validEvent] = newProps[propKey];
	          }
	        } else {
	          updates.eventsOn[validEvent] = newProps[propKey];
	        }
	      } else if (validProp) {
	        if (!oldProps.hasOwnProperty(propKey) || oldProps[propKey] !== newProps[propKey]) {
	          updates.properties[propKey] = newProps[propKey];
	        }
	      }
	    }

	    return updates;
	  },

	  updateNodeProperties: function updateNodeProperties(prevProps) {
	    var node = this.getKonvaNode();
	    var updates = this._getRequiredUpdates(prevProps, this.props);

	    var eventName;
	    for (eventName in updates.eventsOff) {
	      node.off(eventName);
	    }

	    for (eventName in updates.eventsOn) {
	      node.on(eventName, updates.eventsOn[eventName]);
	    }

	    node.setAttrs(updates.properties);
	  }
	};

	module.exports = KonvaBaseMixin;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);
	var cloneWithProps = __webpack_require__(13);

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(6);

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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var KonvaLayerMixin = {
	  componentDidUpdate: function componentDidUpdate() {
	    this.getKonvaNode().draw();
	  }
	};

	module.exports = KonvaLayerMixin;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 * @providesModule cloneWithProps
	 */

	"use strict";

	var ReactElement = __webpack_require__(14);
	var ReactPropTransferer = __webpack_require__(15);

	var keyOf = __webpack_require__(16);
	var warning = __webpack_require__(17);

	var CHILDREN_PROP = keyOf({ children: null });

	/**
	 * Sometimes you want to change the props of a child passed to you. Usually
	 * this is to add a CSS class.
	 *
	 * @param {ReactElement} child child element you'd like to clone
	 * @param {object} props props you'd like to modify. className and style will be
	 * merged automatically.
	 * @return {ReactElement} a clone of child with props merged in.
	 */
	function cloneWithProps(child, props) {
	  if (false) {
	    "production" !== process.env.NODE_ENV ? warning(!child.ref, "You are calling cloneWithProps() on a child with a ref. This is " + "dangerous because you're creating a new child which will not be " + "added as a ref to its parent.") : null;
	  }

	  var newProps = ReactPropTransferer.mergeProps(props, child.props);

	  // Use `child.props.children` if it is provided.
	  if (!newProps.hasOwnProperty(CHILDREN_PROP) && child.props.hasOwnProperty(CHILDREN_PROP)) {
	    newProps.children = child.props.children;
	  }

	  // The current API doesn't retain _owner and _context, which is why this
	  // doesn't use ReactElement.cloneAndReplaceProps.
	  return ReactElement.createElement(child.type, newProps);
	}

	module.exports = cloneWithProps;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	"use strict";

	var ReactContext = __webpack_require__(21);
	var ReactCurrentOwner = __webpack_require__(22);

	var assign = __webpack_require__(18);
	var warning = __webpack_require__(17);

	var RESERVED_PROPS = {
	  key: true,
	  ref: true
	};

	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} object
	 * @param {string} key
	 */
	function defineWarningProperty(object, key) {
	  Object.defineProperty(object, key, {

	    configurable: false,
	    enumerable: true,

	    get: function get() {
	      if (!this._store) {
	        return null;
	      }
	      return this._store[key];
	    },

	    set: function set(value) {
	      false ? warning(false, "Don't set the %s property of the React element. Instead, " + "specify the correct value when initially creating the element.", key) : null;
	      this._store[key] = value;
	    }

	  });
	}

	/**
	 * This is updated to true if the membrane is successfully created.
	 */
	var useMutationMembrane = false;

	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} element
	 */
	function defineMutationMembrane(prototype) {
	  try {
	    var pseudoFrozenProperties = {
	      props: true
	    };
	    for (var key in pseudoFrozenProperties) {
	      defineWarningProperty(prototype, key);
	    }
	    useMutationMembrane = true;
	  } catch (x) {}
	}

	/**
	 * Base constructor for all React elements. This is only used to make this
	 * work with a dynamic instanceof check. Nothing should live on this prototype.
	 *
	 * @param {*} type
	 * @param {string|object} ref
	 * @param {*} key
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function ReactElement(type, key, ref, owner, context, props) {
	  // Built-in properties that belong on the element
	  this.type = type;
	  this.key = key;
	  this.ref = ref;

	  // Record the component responsible for creating this element.
	  this._owner = owner;

	  // TODO: Deprecate withContext, and then the context becomes accessible
	  // through the owner.
	  this._context = context;

	  if (false) {
	    // The validation flag and props are currently mutative. We put them on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    this._store = { props: props, originalProps: assign({}, props) };

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    try {
	      Object.defineProperty(this._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true
	      });
	    } catch (x) {}
	    this._store.validated = false;

	    // We're not allowed to set props directly on the object so we early
	    // return and rely on the prototype membrane to forward to the backing
	    // store.
	    if (useMutationMembrane) {
	      Object.freeze(this);
	      return;
	    }
	  }

	  this.props = props;
	};

	// We intentionally don't expose the function on the constructor property.
	// ReactElement should be indistinguishable from a plain object.
	ReactElement.prototype = {
	  _isReactElement: true
	};

	if (false) {
	  defineMutationMembrane(ReactElement.prototype);
	}

	ReactElement.createElement = function (type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;

	  if (config != null) {
	    ref = config.ref === undefined ? null : config.ref;
	    key = config.key === undefined ? null : "" + config.key;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (typeof props[propName] === "undefined") {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }

	  return new ReactElement(type, key, ref, ReactCurrentOwner.current, ReactContext.current, props);
	};

	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. <Foo />.type === Foo.type.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceProps = function (oldElement, newProps) {
	  var newElement = new ReactElement(oldElement.type, oldElement.key, oldElement.ref, oldElement._owner, oldElement._context, newProps);

	  if (false) {
	    // If the key on the original is valid, then the clone is valid
	    newElement._store.validated = oldElement._store.validated;
	  }
	  return newElement;
	};

	ReactElement.cloneElement = function (element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (config.ref !== undefined) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (config.key !== undefined) {
	      key = "" + config.key;
	    }
	    // Remaining properties override existing props
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return new ReactElement(element.type, key, ref, owner, element._context, props);
	};

	/**
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  // ReactTestUtils is often used outside of beforeEach where as React is
	  // within it. This leads to two different instances of React on the same
	  // page. To identify a element from a different React instance we use
	  // a flag instead of an instanceof check.
	  var isElement = !!(object && object._isReactElement);
	  // if (isElement && !(object instanceof ReactElement)) {
	  // This is an indicator that you're using multiple versions of React at the
	  // same time. This will screw with ownership and stuff. Fix it, please.
	  // TODO: We could possibly warn here.
	  // }
	  return isElement;
	};

	module.exports = ReactElement;

	// IE will fail on defineProperty

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTransferer
	 */

	"use strict";

	var assign = __webpack_require__(18);
	var emptyFunction = __webpack_require__(19);
	var joinClasses = __webpack_require__(20);

	/**
	 * Creates a transfer strategy that will merge prop values using the supplied
	 * `mergeStrategy`. If a prop was previously unset, this just sets it.
	 *
	 * @param {function} mergeStrategy
	 * @return {function}
	 */
	function createTransferStrategy(mergeStrategy) {
	  return function (props, key, value) {
	    if (!props.hasOwnProperty(key)) {
	      props[key] = value;
	    } else {
	      props[key] = mergeStrategy(props[key], value);
	    }
	  };
	}

	var transferStrategyMerge = createTransferStrategy(function (a, b) {
	  // `merge` overrides the first object's (`props[key]` above) keys using the
	  // second object's (`value`) keys. An object's style's existing `propA` would
	  // get overridden. Flip the order here.
	  return assign({}, b, a);
	});

	/**
	 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
	 * NOTE: if you add any more exceptions to this list you should be sure to
	 * update `cloneWithProps()` accordingly.
	 */
	var TransferStrategies = {
	  /**
	   * Never transfer `children`.
	   */
	  children: emptyFunction,
	  /**
	   * Transfer the `className` prop by merging them.
	   */
	  className: createTransferStrategy(joinClasses),
	  /**
	   * Transfer the `style` prop (which is an object) by merging them.
	   */
	  style: transferStrategyMerge
	};

	/**
	 * Mutates the first argument by transferring the properties from the second
	 * argument.
	 *
	 * @param {object} props
	 * @param {object} newProps
	 * @return {object}
	 */
	function transferInto(props, newProps) {
	  for (var thisKey in newProps) {
	    if (!newProps.hasOwnProperty(thisKey)) {
	      continue;
	    }

	    var transferStrategy = TransferStrategies[thisKey];

	    if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
	      transferStrategy(props, thisKey, newProps[thisKey]);
	    } else if (!props.hasOwnProperty(thisKey)) {
	      props[thisKey] = newProps[thisKey];
	    }
	  }
	  return props;
	}

	/**
	 * ReactPropTransferer are capable of transferring props to another component
	 * using a `transferPropsTo` method.
	 *
	 * @class ReactPropTransferer
	 */
	var ReactPropTransferer = {

	  /**
	   * Merge two props objects using TransferStrategies.
	   *
	   * @param {object} oldProps original props (they take precedence)
	   * @param {object} newProps new props to merge in
	   * @return {object} a new object containing both sets of props merged.
	   */
	  mergeProps: function mergeProps(oldProps, newProps) {
	    return transferInto(assign({}, oldProps), newProps);
	  }

	};

	module.exports = ReactPropTransferer;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyOf
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without loosing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	"use strict";

	var keyOf = function keyOf(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	"use strict";

	var emptyFunction = __webpack_require__(19);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (false) {
	  warning = function (condition, format) {
	    for (var args = [], $__0 = 2, $__1 = arguments.length; $__0 < $__1; $__0++) args.push(arguments[$__0]);
	    if (format === undefined) {
	      throw new Error("`warning(condition, format, ...args)` requires a warning " + "message argument");
	    }

	    if (format.length < 10 || /^[s\W]*$/.test(format)) {
	      throw new Error("The warning format should be able to uniquely identify this " + "warning. Please, use a more descriptive format than: " + format);
	    }

	    if (format.indexOf("Failed Composite propType: ") === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = "Warning: " + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      console.warn(message);
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	'use strict';

	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }

	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  return to;
	}

	module.exports = assign;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	"use strict";

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	function joinClasses(className /*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactContext
	 */

	"use strict";

	var assign = __webpack_require__(18);
	var emptyObject = __webpack_require__(23);
	var warning = __webpack_require__(17);

	var didWarn = false;

	/**
	 * Keeps track of the current context.
	 *
	 * The context is automatically passed down the component ownership hierarchy
	 * and is accessible via `this.context` on ReactCompositeComponents.
	 */
	var ReactContext = {

	  /**
	   * @internal
	   * @type {object}
	   */
	  current: emptyObject,

	  /**
	   * Temporarily extends the current context while executing scopedCallback.
	   *
	   * A typical use case might look like
	   *
	   *  render: function() {
	   *    var children = ReactContext.withContext({foo: 'foo'}, () => (
	   *
	   *    ));
	   *    return <div>{children}</div>;
	   *  }
	   *
	   * @param {object} newContext New context to merge into the existing context
	   * @param {function} scopedCallback Callback to run with the new context
	   * @return {ReactComponent|array<ReactComponent>}
	   */
	  withContext: function withContext(newContext, scopedCallback) {
	    if (false) {
	      "production" !== process.env.NODE_ENV ? warning(didWarn, "withContext is deprecated and will be removed in a future version. " + "Use a wrapper component with getChildContext instead.") : null;

	      didWarn = true;
	    }

	    var result;
	    var previousContext = ReactContext.current;
	    ReactContext.current = assign({}, previousContext, newContext);
	    try {
	      result = scopedCallback();
	    } finally {
	      ReactContext.current = previousContext;
	    }
	    return result;
	  }

	};

	module.exports = ReactContext;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 *
	 * The depth indicate how many composite components are above this render level.
	 */
	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyObject
	 */

	"use strict";

	var emptyObject = {};

	if (false) {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;

/***/ }
/******/ ])
});
;