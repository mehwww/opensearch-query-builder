var template = require('./template');
var compile = require('./compile');

exports = module.exports = function (options) {

  function Builder(indexName) {

    if (!(this instanceof Builder)) {
      return new Builder(indexName);
    }

    options = options || {};
    this.host = options.host;
    this.accessKeyId = options.accessKeyId;
    this.accessKeySecret = options.accessKeySecret;
    this.method = 'GET';
    this._params = {query: {}};
    Builder.prototype.indexName.call(this, indexName);
  }

  Builder.prototype.indexName = function (name) {
    if (typeof name === 'string') {
      this._params.index_name = name;
    } else if (Array.isArray(name)) {
      this._params.index_name = name.join(';');
    }
    return this;
  };

  Builder.prototype.fetchFields = function (name) {
    if (typeof name === 'string') {
      this._params.fetch_fields = name;
    } else if (Array.isArray(name)) {
      this._params.fetch_fields = name.join(';');
    }
    return this;
  };

  Builder.prototype.qp = function (name) {
    if (typeof name === 'string') {
      this._params.qp = name;
    } else if (Array.isArray(name)) {
      this._params.qp = name.join(',');
    }
    return this;
  };

  Builder.prototype.disable = function (value) {
    this._params.disable = value;
    return this;
  };

  Builder.prototype.firstFormulaName = function (name) {
    this._params.first_formula_name = name;
    return this;
  };

  Builder.prototype.formulaName = function (name) {
    this._params.formula_name = name;
    return this;
  };

  Builder.prototype.summary = function (options) {
    this._params.summary = template.apply(this, arguments);
    return this;
  };

  var queryClauses = ['query', 'config', 'filter', 'sort', 'aggregate', 'distinct', 'kvpair'];
  queryClauses.forEach(function (clause) {
    Builder.prototype[clause] = function (options) {
      this._params.query[clause] = template.apply(this, arguments);
      return this;
    }
  });

  Builder.prototype.toString = Builder.prototype.compile = function () {
    return compile.apply(this);
  };

  return Builder;

};

