'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _Base2 = require('./Base');

var _Base3 = _interopRequireWildcard(_Base2);

var Component = (function (_Base) {
  function Component() {
    _classCallCheck(this, Component);

    if (_Base != null) {
      _Base.apply(this, arguments);
    }
  }

  _inherits(Component, _Base);

  Component.prototype.componentDidMount = function componentDidMount() {
    _Base.prototype.componentDidMount.call(this);
    this.context.container.add(this.node);
  };

  return Component;
})(_Base3['default']);

Component.contextTypes = {
  container: _React2['default'].PropTypes.object.isRequired
};

exports['default'] = Component;
module.exports = exports['default'];