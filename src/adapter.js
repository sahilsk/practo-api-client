var
request = require("request"),
    debug = require('debug')('Transport');

var Adapter = function (option) {
  if (typeof option['headers'] !== "object") {
    throw new Error("Invalid arguments");
  }
  this.baseRequest = request.defaults({
    headers: option.headers,
    timeout: option.timeout,
    json: true
  });

}

Adapter.prototype.get = function (option, callback) {
  this.baseRequest({
    method: 'GET',
    url: option.url,
    qs: option.payload || {},
    json: true
  }, response);

  function response(error, response, body) {
    debug(error, response, body);
    callback(error, body);
  }
}

Adapter.prototype.post = function (option, callback) {
  this.baseRequest({
    method: 'POST',
    url: option.url,
    body: option.payload || {},
    json: true
  }, response);

  function response(error, response, body) {
    debug(error, response);
    if (!error && response.statusCode == 200) {
      callback(null, 'pong');
    } else {
      callback(error, null);
    }
  }
}

module.exports = Adapter;