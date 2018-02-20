'use strict';

/*
 * node-ifttt-maker
 * https://github.com/j3lte/node-ifttt-maker
 *
 * Copyright (c) 2017 Jelte Lagendijk
 * Licensed under the MIT license.
 */
const util = require('util');
const request = require('request');
const Promise = require('promise');

const BASEURL = 'https://maker.ifttt.com/trigger/%s/with/key/%s';

const makeRequest = params => new Promise((resolve, reject) => {
  request(params, (error, response, body) => {
    if (response.statusCode === 200) {
      resolve(body);
      return;
    }
    const parsed = JSON.parse(body);
    reject(parsed.errors);
  });
});

class IFTTT {
  constructor(secret) {
    this.secret = secret;
    if (!this.secret || typeof this.secret !== 'string') {
      throw new Error('You need to set a secret in order to do a request');
    }
  }

  request(data, callback) {
    const usePromise = typeof callback === 'undefined';
    const requestData = typeof data === 'string' ? { event: data } : data;
    if (!requestData || !requestData.event) {
      const err = new Error('Request needs at least an event to work');
      if (usePromise) {
        return Promise.reject(err);
      }
      throw err;
    }

    const url = util.format(BASEURL, requestData.event, this.secret);
    const qs = requestData.params || {};
    const method = (requestData.method === 'GET' || requestData.method === 'POST') ? requestData.method : 'GET';
    const requestParams = { url, qs, method };

    if (usePromise) {
      return makeRequest(requestParams);
    }
    return makeRequest(requestParams)
      .then((body) => {
        callback(null, body);
      })
      .catch((err) => {
        callback(err, null);
      });
  }
}

module.exports = IFTTT;
