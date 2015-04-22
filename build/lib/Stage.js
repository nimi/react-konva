'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _Konva = require('konva');

var _Konva2 = _interopRequireWildcard(_Konva);

var _Container2 = require('./abstract/Container');

var _Container3 = _interopRequireWildcard(_Container2);

var Stage = (function (_Container) {
  function Stage() {
    _classCallCheck(this, Stage);

    if (_Container != null) {
      _Container.apply(this, arguments);
    }

    this.displayName = 'Stage';
  }

  _inherits(Stage, _Container);

  Stage.prototype.createKonvaNode = function createKonvaNode() {
    return new _Konva2['default'].Stage({
      container: _React2['default'].findDOMNode(this.refs.canvas)
    });
  };

  Stage.prototype.render = function render() {
    return _React2['default'].createElement(
      'div',
      null,
      _React2['default'].createElement('div', { ref: 'canvas' }),
      _React2['default'].Children.map(this.props.children, function (child) {
        return _React2['default'].addons.cloneWithProps(child);
      })
    );
  };

  _createClass(Stage, [{
    key: 'displayName',
    value: undefined,
    enumerable: true
  }]);

  return Stage;
})(_Container3['default']);

Stage.propTypes = {
  children: _React2['default'].PropTypes.any
};

exports['default'] = Stage;
module.exports = exports['default'];