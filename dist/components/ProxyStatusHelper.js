'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateProxyStatusList = undefined;

var _immutable = require('immutable');

var _spdzGuiLib = require('spdz-gui-lib');

/**
 * Utility functions to support the display of spdz proxy config state in Connection component.
 */
var findOrDefault = function findOrDefault(statusValues, index) {
  if (statusValues === undefined) {
    return _spdzGuiLib.ProxyStatusCodes.Disconnected;
  }
  var match = statusValues.find(function (element) {
    return element.id === index;
  });
  return match !== undefined ? match.status : _spdzGuiLib.ProxyStatusCodes.Disconnected;
};

/**
 * Generate the proxy connection status list to be used by the Connection component.
 * @param {spdzProxyList} Immutable List of Map containing key for 'url', represents proxy servers
 * @param {values} Array of {id, ProxyStatus} to apply to spdzProxyList, map be empty list or undefined
 * @returns An immutable List<Map> containing url:String and status:ProxyStatusCode.
 */
var generateProxyStatusList = function generateProxyStatusList(spdzProxyList, statusValues) {

  return (0, _immutable.List)(spdzProxyList.map(function (spdzProxy, index) {
    return (0, _immutable.Map)({
      url: spdzProxy.get('url'),
      status: findOrDefault(statusValues, index)
    });
  }));
};

exports.generateProxyStatusList = generateProxyStatusList;