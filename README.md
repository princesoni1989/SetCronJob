# SetCronJob Client Library for Node.js
  Setting schedulars for your application

Setting schedulars for your application [REST] (https://www.setcronjob.com/documentation/api) API's.


```javascript
var setCronJob = require('setcronjob');
var cronJob = new setCronJob('xxxxxxxx');

//list cron for a token
cronJob.cron.list(function (err, result) {
     if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});
```

## Installation

`npm install setcronjob`

## Quick Start

You will need valid Setcronjob Token to work with this module, Yu can obtain token after signing up (https://www.setcronjob.com/)


## Cron
```javascript
var setCronJob = require('setcronjob');
var cronJob = new setCronJob('xxxxxxxx');
```

## List:
```javascript
//list cron for a token
cronJob.cron.list(function (err, result) {
    printResult(err, result);
});
```
## Get:
```javascript
//get one cron job information
var params = {
    id: 'xxxxxx'
};
cronJob.cron.get(params, function (err, result) {
    printResult(err, result);
});
```

## Add Corn:
```javascript

//Add cron job
var params = {
    month: 3,
    day: 25,
    hour: 18,
    minute: 0,
    url: 'https://test.com:9000/api/v1//execute',
    timezone: 'Asia/Kolkata',
    postData: '{"postId":"xyz"}',
    httpMethod: 'POST'
};
cronJob.cron.add(params, function (err, result) {
    printResult(err, result);
});

```

## Update Cron:
```javascript

//Edit cron
var params = {
    id: 'xyz',
    month: 4,
    day: 26,
    hour: 19,
    minute: 20,
    url: 'https://daytest.com:9000/api/v1//execute',
    timezone: 'Asia/Kolkata',
    postData: '{"postId":"xyz"}',
    httpMethod: 'POST'
};
cronJob.cron.edit(params, function (err, result) {
    printResult(err, result);
});

```
## Enable Cron:

```javascript
//Enable cron
var params = {
    id: 'xyz'
};
cronJob.cron.enable(params, function (err, result) {
    printResult(err, result);
});

```


## Disable Cron:

```javascript

//Disable cron
var params = {
    id: 'xyz'
};
cronJob.cron.disable(params, function (err, result) {
    printResult(err, result);
});
```

## Delete Cron:

```javascript

//delete cron
var params = {
    id: 'xyz'
};
cronJob.cron.delete(params, function (err, result) {
    printResult(err, result);
});
```

## Run Cron:

```javascript

//run cron
var params = {
    id: 'xyz'
};
cronJob.cron.run(params, function (err, result) {
    printResult(err, result);
})
```

## Run Cron:

```javascript

//run cron
var params = {
    id: 'xyz'
};
cronJob.cron.run(params, function (err, result) {
    printResult(err, result);
})
```


## Get log Cron:

```javascript

//get logs
var params = {
    id: 'xyz'
};
cronJob.cron.logs(params, function (err, result) {
    printResult(err, result);
});
```


## Examples

* [Cron](https://github.com/princesoni1989/SetCronJob/blob/master/example/cron.js)
* [Group](https://github.com/princesoni1989/SetCronJob/blob/master/example/group.js)
* [Server](https://github.com/princesoni1989/SetCronJob/blob/master/example/server.js)
* [Account](https://github.com/princesoni1989/SetCronJob/blob/master/example/account.js)

## Contributors

Originally authored by  [@princesoni1989](https://github.com/princesoni1989)

## LICENSE

setcronjob is released under the ISC License Copyright (c) 2016 Prince Soni

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
