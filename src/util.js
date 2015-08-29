var util = {

  defaults: function (objToExtend, objDefault) {
    var finalObj = {};
    var keys = Object.keys(objDefault);
    for (var i = 0; i < keys.length; i++) {
      objToExtend[keys[i]] = objToExtend[keys[i]] || objDefault[keys[i]]
    }
  }

}

module.exports = util;