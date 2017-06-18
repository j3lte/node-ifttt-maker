node-ifttt-maker
=================

[![NPM](https://nodei.co/npm/node-ifttt-maker.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-ifttt-maker/)

[![Build Status](https://travis-ci.org/j3lte/node-ifttt-maker.svg?branch=master)](https://travis-ci.org/j3lte/node-ifttt-maker)
[![DAVID](https://david-dm.org/j3lte/node-ifttt-maker.svg)](https://david-dm.org/j3lte/node-ifttt-maker)
[![npm version](https://badge.fury.io/js/node-ifttt-maker.svg)](http://badge.fury.io/js/node-ifttt-maker)
[![Development Dependency Status](https://david-dm.org/j3lte/node-ifttt-maker/dev-status.svg?theme=shields.io)](https://david-dm.org/j3lte/node-ifttt-maker#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/j3lte/node-ifttt-maker/badges/gpa.svg)](https://codeclimate.com/github/j3lte/node-ifttt-maker)

A simple wrapper that will connect with the [IFTTT maker channel](https://ifttt.com/maker)

## Usage


```js
const IFTTT = require('node-ifttt-maker');
const ifttt = new IFTTT('<YOUR MAKER KEY>');

const event = 'eventname';

// Simple request
ifttt
  .request(event)
  .then((response) => {})
  .catch((err) => {});

// Using POST
const method = 'POST';

ifttt
  .request({ event, method })
  .then((response) => {})
  .catch((err) => {});

// Adding values (only value1, value2 and value3 are accepted by IFTTT)
const params = {
    'value1': 'test',
    'value2': 2,
    'value3': {
        x: 1, y: 2
    }
}

ifttt
  .request({ event, params })
  .then((response) => {})
  .catch((err) => {});

// The 'old' way of calling Maker using a callback still works
ifttt.request(event, (err, body) {
    if (err) {
      console.log(err);
    } else {
      console.log(body);
    }
});
```

## Bugs / issues / features

Please, if you find any bugs, or are a way better developer than I am (as in, you are thinking 'spaghetti' when looking at my code), feel free to create an issue. If you have features or addons for compatibility, please add a [pull request](https://github.com/j3lte/node-ifttt-maker/pulls)!

## [License](https://github.com/j3lte/node-ifttt-maker/blob/master/LICENSE)

(The MIT License)

Copyright (c) 2017 Jelte Lagendijk <jwlagendijk@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
