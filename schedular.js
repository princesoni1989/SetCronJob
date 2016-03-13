/**
 * Created by root on 5/1/16.
 */

var request = require('request');
var baseUrl = 'https://www.setcronjob.com/api/'
var token = config.cron.apiKey;

exports.addCron = function (params, callback) {
  var addCronRequest = {
    'url': baseUrl + 'cron.add',
    'rejectUnauthorized': false,
    'method': 'get',
    qs: {
      token: token,
      month: params.month,
      day: params.day,
      hour: params.hour,
      minute: params.minute,
      url: params.url,
      timezone: params.timezone,
      postData: params.data,
      httpMethod: 'POST'
    }
  }
  request(addCronRequest, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      try {
        var parsedBody = JSON.parse(body);
        return callback(null, parsedBody);
      }catch(e){
        return callback(e, null);
      }
    } else {
      return callback(err || response, null);
    }
  });
}

exports.updateCron = function (params, callback) {
  var updateCronRequest = {
    'url': baseUrl + 'cron.edit',
    'rejectUnauthorized': false,
    'method': 'get',
    qs: {
      token: token,
      id: params.id,
      month: params.month,
      day: params.day,
      hour: params.hour,
      minute: params.minute,
    }
  }
  request(updateCronRequest, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      try{
        var parsedBody = JSON.parse(body);
        return callback(null, parsedBody);
      }catch(e){
        return callback(e, null);
      }
    } else {
      return callback(err || response, null);
    }
  });
}

exports.deleteCron = function (id, callback) {
  var deleteCronRequest = {
    'url': baseUrl + 'cron.edit',
    'rejectUnauthorized': false,
    'method': 'get',
    qs: {
      token: token,
      id: id
    }
  }
  request(deleteCronRequest, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      try {
        var parsedBody = JSON.parse(body);
        return callback(null, parsedBody);
      }catch(e){
        return callback(e, null);
      }
    } else {
      return callback(err || response, null);
    }
  });
}
