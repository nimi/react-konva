'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Component2 = require('../abstract/Component');

var _Component3 = _interopRequireWildcard(_Component2);

var Shape = (function (_Component) {
  function Shape() {
    _classCallCheck(this, Shape);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(Shape, _Component);

  return Shape;
})(_Component3['default']);

exports['default'] = Shape;
module.exports = exports['default'];