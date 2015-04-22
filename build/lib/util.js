'use strict';

exports.__esModule = true;
exports.diff = diff;

function diff(lhs, rhs) {
  var result = new Map();

  var properies = new Set([].concat(Object.keys(lhs), Object.keys(rhs)));

  for (var _iterator = properies, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var property = _ref;

    if (lhs.hasOwnProperty(property) && !rhs.hasOwnProperty(property)) {
      result.set(property, 'delete');
    }

    if (!lhs.hasOwnProperty(property) && rhs.hasOwnProperty(property)) {
      result.set(property, 'create');
    }

    if (lhs.hasOwnProperty(property) && rhs.hasOwnProperty(property)) {
      if (lhs[property] !== rhs[property]) {
        result.set(property, 'update');
      }
    }
  }

  return result;
}