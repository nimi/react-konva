'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Shape2 = require('./Shape');

var _Shape3 = _interopRequireWildcard(_Shape2);

var Sprite = (function (_Shape) {
  function Sprite() {
    _classCallCheck(this, Sprite);

    if (_Shape != null) {
      _Shape.apply(this, arguments);
    }

    this.displayName = 'Sprite';
  }

  _inherits(Sprite, _Shape);

  _createClass(Sprite, [{
    key: 'displayName',
    value: undefined,
    enumerable: true
  }]);

  return Sprite;
})(_Shape3['default']);

exports['default'] = Sprite;
module.exports = exports['default'];