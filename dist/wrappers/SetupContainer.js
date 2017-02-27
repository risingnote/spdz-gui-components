'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _spdzGuiLib = require('spdz-gui-lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Higher order component to wrap an MPC GUI with setup functions
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Responsible for getting available proxies and generating client key material.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function setupWrapper(MPCGui) {
  return function (_Component) {
    _inherits(SetupContainer, _Component);

    function SetupContainer(props) {
      _classCallCheck(this, SetupContainer);

      var _this = _possibleConstructorReturn(this, (SetupContainer.__proto__ || Object.getPrototypeOf(SetupContainer)).call(this, props));

      _this.state = {
        clientPublicKey: '',
        spdzApiRoot: "/",
        spdzProxyList: (0, _immutable.List)()
      };
      _this.initSpdzServerList = _this.initSpdzServerList.bind(_this);
      return _this;
    }

    /**
      * Convert a json config into an immutable List structure.
      * Add encryption key to each spdzProxy entry 
      */


    _createClass(SetupContainer, [{
      key: 'initSpdzServerList',
      value: function initSpdzServerList(spdzProxyList) {
        return (0, _immutable.List)(spdzProxyList.map(function (spdzProxy) {
          return (0, _immutable.Map)(spdzProxy).set("encryptionKey", (0, _spdzGuiLib.createEncryptionKey)(spdzProxy.publicKey));
        }));
      }

      /**
       * At startup get list of SPDZ proxies. Generate client key material.
       */

    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        (0, _spdzGuiLib.getProxyConfig)().then(function (json) {
          var spdzProxyList = _this2.initSpdzServerList(json.spdzProxyList);
          _this2.setState({ spdzApiRoot: json.spdzApiRoot });
          _this2.setState({ spdzProxyList: spdzProxyList });
          _this2.setState({ clientPublicKey: (0, _spdzGuiLib.createClientPublicKey)() });
        }).catch(function (ex) {
          console.log(ex);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(MPCGui, { spdzProxyServerList: this.state.spdzProxyList,
          spdzApiRoot: this.state.spdzApiRoot,
          clientPublicKey: this.state.clientPublicKey });
      }
    }]);

    return SetupContainer;
  }(_react.Component);
}

exports.default = setupWrapper;