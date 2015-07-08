// https://github.com/lodash/lodash/blob/master/lodash.js#L111
// var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
var reEsTemplate = /\$\{([^\\}]*)\}/g;

exports = module.exports = function (str) {
  var args = Array.prototype.slice.call(arguments, 1);
  if (args[0] !== null && typeof args[0] === 'object') {
    args = args[0];
  } else {
    args.unshift(null)
  }
  return str.replace(reEsTemplate, function (match, escapeValue) {
    return args[escapeValue];
  })
};