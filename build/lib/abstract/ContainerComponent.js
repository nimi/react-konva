'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _Container2 = require('./Container');

var _Container3 = _interopRequireWildcard(_Container2);

var ContainerComponent = (function (_Container) {
  function ContainerComponent() {
    _classCallCheck(this, ContainerComponent);

    if (_Container != null) {
      _Container.apply(this, arguments);
    }
  }

  _inherits(ContainerComponent, _Container);

  ContainerComponent.prototype.componentDidMount = function componentDidMount() {
    var _Container$prototype$componentDidMount;

    (_Container$prototype$componentDidMount = _Container.prototype.componentDidMount).call.apply(_Container$prototype$componentDidMount, [this].concat(arguments));
    this.context.container.add(this.node);
  };

  return ContainerComponent;
})(_Container3['default']);

ContainerComponent.contextTypes = {
  container: _React2['default'].PropTypes.object.isRequired
};

exports['default'] = ContainerComponent;
module.exports = exports['default'];