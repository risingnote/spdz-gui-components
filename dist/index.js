'use strict';

Object.defineProperty(exports, "__esModule", {
         value: true
});
exports.setupWrapper = exports.Connection = undefined;

var _Connection = require('./components/Connection');

var _Connection2 = _interopRequireDefault(_Connection);

var _SetupContainer = require('./wrappers/SetupContainer');

var _SetupContainer2 = _interopRequireDefault(_SetupContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Polyfill Object.assign
Object.assign = require('object-assign');

exports.Connection = _Connection2.default;
exports.setupWrapper = _SetupContainer2.default;