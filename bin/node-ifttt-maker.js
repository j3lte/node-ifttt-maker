'use strict';
/*
 * node-ifttt-maker
 * https://github.com/j3lte/node-ifttt-maker
 *
 * Copyright (c) 2015 Jelte Lagendijk
 * Licensed under the MIT license.
 */

var util = require('util');
var request = require('request');

var BASEURL = 'https://maker.ifttt.com/trigger/%s/with/key/%s';

var IFTTT = function(secret) {
  this.secret = secret;
};

IFTTT.prototype.request = function request(data, callback) {
  if (!this.secret || typeof this.secret !== 'string') {
    throw new Error('You need to set a secret in order to do a request');
  }
  if (!data || !data.event) {
    throw new Error('Request needs at least have a data.event property to work');
  }

  var requestParams = {
    url: util.format(BASEURL, data.event, this.secret),
    qs: data.params || {},
    method: data.method || 'GET'
  };

  makeRequest(requestParams, function (err) {
    if (callback) {
      callback(err);
    } else if (err) {
      throw new Error(err);
    }
  });
};

IFTTT.prototype.startListening = function(config) {
  // TO BE IMPLEMENTED
};

function makeRequest (params, cb){
  request(params, function (error, response, body) {
    if (response.statusCode == 200) {
      return cb();
    }
    return cb(JSON.parse(body)['errors']);
  });
}

module.exports = IFTTT;
