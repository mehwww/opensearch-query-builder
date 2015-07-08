var crypto = require('crypto');
var utils = require('./utils');

exports = module.exports = function () {
  var params = this._params;
  var url;
  var requestParams;

  requestParams = {
    Version: 'v2',
    AccessKeyId: this.accessKeyId,
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: utc(),
    SignatureVersion: '1.0',
    SignatureNonce: '' + +new Date() + (Math.floor(Math.random() * 9000) + 1000)
  };

  params.query = Object.keys(params.query)
    .map(function (key) {
      if (params.query[key]) return key + '=' + params.query[key];
    })
    .filter(function (value) {
      return value
    })
    .join('&&');

  requestParams = utils.extend(requestParams, params);

  Object.keys(requestParams).forEach(function (key) {
    requestParams[key] = encode(requestParams[key]);
  });

  url = sortKeys(requestParams);
  url = this.host + '?' + url + '&Signature=' + encode(sign(this.method, this.accessKeySecret, url));

  return url;

};


function sortKeys(args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
}

// get utc time
function utc() {
  var d = new Date();
  var YY = d.getUTCFullYear();
  var MM = d.getUTCMonth() + 1;
  var DD = d.getUTCDate();
  var hh = d.getUTCHours();
  var mm = d.getUTCMinutes();
  var ss = d.getUTCSeconds();
  return YY + '-' +
    (MM < 10 ? '0' : '') + MM + '-' +
    (DD < 10 ? '0' : '') + DD + 'T' +
    (hh < 10 ? '0' : '') + hh + ':' +
    (mm < 10 ? '0' : '') + mm + ':' +
    (ss < 10 ? '0' : '') + ss + 'Z';
}

// URI encode
function encode(string) {
  return encodeURIComponent(string)
    .replace(/\+/g, '%20')
    .replace(/\!/g, '%21')
    .replace(/\'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/\~/g, '%7E')
}

// get signature
function sign(method, secret, url) {
  var str = method.toUpperCase() + '&' + encode('/') + '&' + encode(url);
  return crypto.createHmac('sha1', secret + '&').update(str).digest('base64')
}


