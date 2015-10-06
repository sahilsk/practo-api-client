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
    if( error){
      callback(error, null);
      return;
    }
    response.statusCode = (response && response.statusCode) || 500;
    debug(error, response.statusCode, body);
    if (response.statusCode >= 400) {
      error = body;
    }
    callback(error, {
      statusCode: response.statusCode,
      body: body
    });
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
    if( error){
      callback(error, null);
      return;
    }
    response.statusCode = (response && response.statusCode) || 500;
    debug(error, response.statusCode, body);
    if (response.statusCode >= 400) {
      error = body;
    }
    debug(error, response.statusCode, body);
    callback(error, {
      statusCode: response.statusCode,
      body: body
    });
  }
}

module.exports = Adapter;
