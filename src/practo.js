var
Adapter = require("./adapter"),
    util = require("./util"),
    PractoEndpoints = require("./endpoints"),
    debug = require('debug')('Practo');


/**
 * Class Practo
 **/
var Practo = function Practo(option) {
  this.defaults = {
    host: "https://api.practo.com",
    timeout: 10000
  }
  // set defaults, if missing
  util.defaults(option, this.defaults);
  debug(option);
  //prepare endpoints
  this.endpoints = new PractoEndpoints(option.host);

  //prepare transport
  this.adapter = new Adapter({
    headers: {
      'X-API-KEY': option.token,
      'X-CLIENT-ID': option.client_id
    },
    timeout: option.timeout
  });
}

/**
 * Check api endpoints
 *
 */
Practo.prototype.ping = function (callback) {
  var self = this;
  debug("End url: ", self.endpoints.search_url());
  this.adapter.get({
    url: self.endpoints.search_url(),
    payload: {
      'city': 'bangalore'
    }
  }, function (error, response) {
    debug(response.statusCode);
    if (!error) {
      if (response.statusCode === 200) {
        callback(null, 'pong');
      } else {
        callback(response.body, null);
      }
    } else {
      callback(error, null);
    }
  });
}

/**
 **** * List doctors
 * @param{ option } : option object : page
 * @param{ Function}: callback function
 */
Practo.prototype.list_doctors = function (option, callback) {
  var self = this;
  debug("End url: ", self.endpoints.doctors_url());
  this.adapter.get({
    url: self.endpoints.doctors_url(),
    payload: {
      'page': option.page || 0
    }
  }, callback);
}

/**
 **** * List doctors
 * @param{ option } : option object : page
 * @param{ Function}: callback function
 */
Practo.prototype.get_doctor = function (option, callback) {
  var self = this;
  debug("End url: ", self.endpoints.fetch_doctor_url(option.id));
  this.adapter.get({
    url: self.endpoints.fetch_doctor_url(option.id)
  }, callback);
}


/**
 **** * List practices
 * @param{ option } : option object : page
 * @param{ Function}: callback function
 */
Practo.prototype.list_practices = function (option, callback) {
  var self = this;
  debug("End url: ", self.endpoints.practices_url());
  this.adapter.get({
    url: self.endpoints.practices_url(),
    payload: {
      'page': option.page || 0
    }
  }, callback);
}

/**
 **** * Get practice detail
 * @param{ option } : option object : page
 * @param{ Function}: callback function
 */
Practo.prototype.get_practice = function (option, callback) {
  var self = this;
  debug("End url: ", self.endpoints.fetch_practice_url(option.id));
  this.adapter.get({
    url: self.endpoints.fetch_practice_url(option.id),
    payload: {
      'with_doctors': !! option.with_doctors
    }
  }, callback);
}

/**
 **** * Search
 * @param{ option } : option object : page
 * @param{ Function}: callback function
 */
Practo.prototype.search = function (option, callback) {
  var self = this;
  debug("End url: ", self.endpoints.search_url());
  this.adapter.get({
    url: self.endpoints.search_url(),
    payload: option
  }, callback);
}

/**
 **** * List cities
 * @param{ option } : option object : page
 * @param{ Function}: callback function
 */
Practo.prototype.list_cities = function (callback) {
  var self = this;
  debug("End url: ", self.endpoints.city_search_url());
  this.adapter.get({
    url: self.endpoints.city_search_url()
  }, callback);
}

/**
 **** * list of localities, specialties for a city
 * @param{ option } : option object : page
 * @param{ Function}: callback function
 */
Practo.prototype.get_city_report = function (option, callback) {
  var self = this;
  debug("End url: ", self.endpoints.city_report_url(option.id));
  this.adapter.get({
    url: self.endpoints.city_report_url(option.id),
    payload: option
  }, callback);
}

module.exports = Practo;