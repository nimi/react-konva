'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _ContainerComponent2 = require('./abstract/ContainerComponent');

var _ContainerComponent3 = _interopRequireWildcard(_ContainerComponent2);

var Group = (function (_ContainerComponent) {
  function Group() {
    _classCallCheck(this, Group);

    if (_ContainerComponent != null) {
      _ContainerComponent.apply(this, arguments);
    }

    this.displayName = 'Group';
  }

  _inherits(Group, _ContainerComponent);

  _createClass(Group, [{
    key: 'displayName',
    value: undefined,
    enumerable: true
  }]);

  return Group;
})(_ContainerComponent3['default']);

exports['default'] = Group;
module.exports = exports['default'];