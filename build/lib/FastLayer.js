'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _Layer2 = require('./Layer');

var _Layer3 = _interopRequireWildcard(_Layer2);

var FastLayer = (function (_Layer) {
  function FastLayer() {
    _classCallCheck(this, FastLayer);

    if (_Layer != null) {
      _Layer.apply(this, arguments);
    }

    this.displayName = 'FastLayer';
  }

  _inherits(FastLayer, _Layer);

  _createClass(FastLayer, [{
    key: 'displayName',
    value: undefined,
    enumerable: true
  }]);

  return FastLayer;
})(_Layer3['default']);

exports['default'] = FastLayer;
module.exports = exports['default'];