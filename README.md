node-ifttt-maker
=================

[![NPM](https://nodei.co/npm/node-ifttt-maker.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-ifttt-maker/)

[![npm version](https://badge.fury.io/js/node-ifttt-maker.svg)](http://badge.fury.io/js/node-ifttt-maker)

NodeJS module that will connect with the [IFTTT maker channel](https://ifttt.com/maker)

It is a simple wrapper for using the Maker channel in IFTTT

**This is work-in-progress, will build the next version with promises/event emitter**

## Usage


```js
var IFTTT = require('node-ifttt-maker'),
    ifttt = new IFTTT('<YOUR MAKER KEY>');

ifttt.request({
    event: 'event',
    method: 'GET',
    params: {
        'value1': 'test',
        'value2': 2,
        'value3': {
            x: 1, y: 2
        }
    }
}, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('OK');
    }
});
```

## Bugs / issues / features

Please, if you find any bugs, or are a way better developer than I am (as in, you are thinking 'spaghetti' when looking at my code), feel free to create an issue. If you have features or addons for compatibility, please add a [pull request](https://github.com/j3lte/node-ifttt-maker/pulls)!

## [License](https://github.com/j3lte/node-ifttt-maker/blob/master/LICENSE)

(The MIT License)

Copyright (c) 2015 Jelte Lagendijk <jwlagendijk@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
