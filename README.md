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

`npm install setcronjob  //install locally`

`npm install -g setcronjob  //install globally`

`npm install setcronjob --save  //install locally and save to package json`

## Quick Start

You will need valid Setcronjob Token to work with this module, You can obtain token after signing up (https://www.setcronjob.com/)


## Cron Job:

```javascript
var setCronJob = require('setcronjob');
var cronJob = new setCronJob('xxxxxxxx');
```

```javascript
//list cron for a token
cronJob.cron.list(function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});
```
```javascript
//get one cron job information
var params = {
    id: 'xxxxxx'
};
cronJob.cron.get(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});
```

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
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```

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
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```


```javascript
//Enable cron
var params = {
    id: 'xyz'
};
cronJob.cron.enable(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```


```javascript

//Disable cron
var params = {
    id: 'xyz'
};
cronJob.cron.disable(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});
```


```javascript

//delete cron
var params = {
    id: 'xyz'
};
cronJob.cron.delete(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});
```


```javascript

//run cron
var params = {
    id: 'xyz'
};
cronJob.cron.run(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
})
```


```javascript

//get logs
var params = {
    id: 'xyz'
};
cronJob.cron.logs(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});
```

## Account job:

```javascript
var setCronJob = require('setcronjob');
var cronJob = new setCronJob('xxxxxxxx');
```

```javascript

//Edit account
var params = {
    timezone: 'Asia/kolkatta'
};
cronJob.account.edit(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```

## Group Job:

```javascript
var setCronJob = require('setcronjob');
var cronJob = new setCronJob('xxxxxxxx');
```

```javascript

//list group
cronJob.group.list(function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```

```javascript

//Get group
var params = {
    id: 'xyz'
};
cronJob.group.get(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```

```javascript

//Add group
var params = {
    name: 'test-group'
};
cronJob.group.add(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```

```javascript

//Edit group
var params = {
    id: 'xyz',
    name: 'test-edit'
};
cronJob.group.edit(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```


```javascript

//Delete group
var params = {
    id: 'xyz'
};
cronJob.group.delete(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```

```javascript

//Vanish group
var params = {
    id: 'xyz'
};
cronJob.group.vanish(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```


```javascript

//Emp†y group
var params = {
    id: 'xyz'
};
cronJob.group.empty(params, function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```

## Server Job:
```javascript
var setCronJob = require('setcronjob');
var cronJob = new setCronJob('xxxxxxxx');
```


```javascript

//Get server time
cronJob.server.get(function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```


```javascript

//get supported time zones
cronJob.server.timezones(function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```


```javascript

//get user agents
cronJob.server.userAgent(function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
});

```


```javascript

//get server ip
cronJob.server.ip(function (err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
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
