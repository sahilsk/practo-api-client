/***
 * Practo endpoints
 */
var PractoEndpoints = function (host) {
  this.doctors_url = function () {
    return host + "/doctors/"
  }
  this.fetch_doctor_url = function (id) {
    return host + "/doctors/" + id
  }
  this.practices_url = function () {
    return host + "/practices"
  }
  this.fetch_practice_url = function (id) {
    return host + "/practices/" + id
  }
  this.search_url = function () {
    return host + "/search";
  }
  this.city_search_url = function () {
    return host + "/meta/search/cities";
  }
  this.city_report_url = function (id) {
    return host + "/meta/search/cities/" + id
  }
}

module.exports = PractoEndpoints;