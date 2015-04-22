'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _React = require('react/addons');

var _React2 = _interopRequireWildcard(_React);

var _Base2 = require('./Base');

var _Base3 = _interopRequireWildcard(_Base2);

var Container = (function (_Base) {
  function Container() {
    _classCallCheck(this, Container);

    _Base.call(this);
    this.node = new Set();
  }

  _inherits(Container, _Base);

  Container.prototype.getChildContext = function getChildContext() {
    return {
      container: this.node
    };
  };

  Container.prototype.componentDidMount = function componentDidMount() {
    var _this = this;

    var mountedChildNodes = this.node;
    _Base.prototype.componentDidMount.call(this);
    mountedChildNodes.forEach(function (node) {
      return _this.node.add(node);
    });
  };

  Container.prototype.render = function render() {
    return _React2['default'].createElement(
      'span',
      null,
      _React2['default'].Children.map(this.props.children, function (child) {
        return _React2['default'].addons.cloneWithProps(child);
      })
    );
  };

  return Container;
})(_Base3['default']);

Container.childContextTypes = {
  container: _React2['default'].PropTypes.object.isRequired
};

Container.propTypes = {
  children: _React2['default'].PropTypes.any
};

exports['default'] = Container;
module.exports = exports['default'];