'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _spdzGuiLib = require('spdz-gui-lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProxyStatus = function ProxyStatus(props) {
  // Styles are all inline to avoid having to use webpack css loaders.
  var proxyStatusStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: '0px 0px 10px 0px'
  };

  var statusColour = function statusColour(status) {
    if (status === _spdzGuiLib.ProxyStatusCodes.Connected) {
      return 'lightgreen';
    } else if (status === _spdzGuiLib.ProxyStatusCodes.Failure) {
      return 'lightcoral';
    } else {
      return 'lightgrey';
    }
  };

  var proxyStatusMarkerStyle = {
    width: '20px',
    borderRadius: '50%',
    border: '1px solid black',
    backgroundColor: statusColour(props.status)
  };

  var urlCombinedStyle = Object.assign({
    paddingLeft: '10px',
    fontSize: '14px'
  }, props.urlStyle);

  return _react2.default.createElement(
    'div',
    { style: proxyStatusStyle },
    _react2.default.createElement('div', { style: proxyStatusMarkerStyle }),
    _react2.default.createElement(
      'div',
      { style: urlCombinedStyle },
      props.url
    )
  );
}; /**
    * Display the status and url of a SPDZ proxy
    */


ProxyStatus.propTypes = {
  status: _react.PropTypes.number.isRequired,
  url: _react.PropTypes.string.isRequired,
  urlStyle: _react2.default.PropTypes.object
};

exports.default = ProxyStatus;