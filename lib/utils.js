exports.extend = function (obj) {
  var length = arguments.length;
  if (length < 2 || obj == null) return obj;
  for (var index = 1; index < length; index++) {
    var source = arguments[index];
    Object.keys(source).forEach(function (key) {
      if (source[key] === undefined) return;
      obj[key] = source[key];
    });
  }
  return obj;
}