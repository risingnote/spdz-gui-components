'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _ProxyStatus = require('./ProxyStatus');

var _ProxyStatus2 = _interopRequireDefault(_ProxyStatus);

var _ProxyStatusHelper = require('./ProxyStatusHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Responsible for displaying SPDZ connection information based on props passed in.
 */
var Connection = function Connection(props) {
  var combinedComponentStyle = Object.assign({
    padding: '0px 10px 5px 10px',
    border: '1px solid darkgrey',
    margin: '0 auto',
    textAlign: 'left'
  }, props.componentStyle);

  var combinedHeadingStyle = Object.assign({
    color: 'rgb(28, 118, 152)',
    marginRight: '10px'
  }, props.headerStyle);

  var proxyServers = function proxyServers(spdzProxyServerList, spdzProxyStatus) {
    var proxyStatusForDisplay = (0, _ProxyStatusHelper.generateProxyStatusList)(spdzProxyServerList, spdzProxyStatus);
    return proxyStatusForDisplay.map(function (proxyServer) {
      return _react2.default.createElement(_ProxyStatus2.default, { key: proxyServer.get('url'), status: proxyServer.get('status'),
        url: proxyServer.get('url'), urlStyle: props.urlStyle });
    });
  };

  return _react2.default.createElement(
    'div',
    { style: combinedComponentStyle },
    _react2.default.createElement(
      'p',
      { style: combinedHeadingStyle },
      'Spdz Proxy Servers'
    ),
    proxyServers(props.spdzProxyServerList, props.spdzProxyStatus)
  );
};

Connection.propTypes = {
  spdzProxyServerList: _react2.default.PropTypes.instanceOf(_immutable.List).isRequired,
  spdzProxyStatus: _react2.default.PropTypes.array.isRequired,
  componentStyle: _react2.default.PropTypes.object,
  headerStyle: _react2.default.PropTypes.object,
  urlStyle: _react2.default.PropTypes.object
};

exports.default = Connection;