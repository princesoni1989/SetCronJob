/**
 * Created by prince on 17/12/15.
 */

"use strict";
var VERSION = "1.6.2";
var querystring = require("querystring");
var oauth = require("oauth");
var request = require("request");
var fs = require("fs");
var async = require('async')

var baseUrl = "https://api.twitter.com/1.1/";
var uploadBaseUrl = "https://upload.twitter.com/1.1/";
var authUrl = "https://twitter.com/oauth/authenticate?oauth_token=";

var TwitterApi = function (options) {
  if (!(this instanceof TwitterApi))
    return new TwitterApi(options);

  this.consumerKey = options.consumerKey;
  this.consumerSecret = options.consumerSecret;
  this.callback = options.callback;

  this.oa = new oauth.OAuth("https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
    this.consumerKey, this.consumerSecret, "1.0A", this.callback, "HMAC-SHA1");

  return this;
};
TwitterApi.VERSION = VERSION;

TwitterApi.prototype.getRequestToken = function (callback) {
  this.oa.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret, results) {
    if (error) {
      callback(error);
    } else {
      callback(null, oauthToken, oauthTokenSecret, results);
    }
  });
};

TwitterApi.prototype.getAuthUrl = function (requestToken) {
  return authUrl + requestToken;
};

TwitterApi.prototype.getAccessToken = function (requestToken, requestTokenSecret, oauth_verifier, callback) {
  this.oa.getOAuthAccessToken(requestToken, requestTokenSecret, oauth_verifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      callback(error);
    } else {
      callback(null, oauthAccessToken, oauthAccessTokenSecret, results);
    }
  });
};

TwitterApi.prototype.verifyCredentials = function (accessToken, accessTokenSecret, callback, params) {
  var url = baseUrl + "account/verify_credentials.json";
  if (params) {
    url += '?' + querystring.stringify(params);
  }
  this.oa.get(url, accessToken, accessTokenSecret, function (error, data, response) {
    if (error) {
      callback(error);
    } else {
      try {
        callback(null, JSON.parse(data));
      } catch (e) {
        callback(e, data);
      }
    }
  });
};

TwitterApi.prototype.statuses = function (type, params, accessToken, accessTokenSecret, callback) {
  var url = type.toLowerCase();

  var method = "GET";
  switch (type) {
    case "retweets":
      url = "retweets/" + params.id;
      delete params.id;
      break;
    case "show":
      url = "show/" + params.id;
      delete params.id;
      break;
    case "lookup":
      url = "lookup";
      method = "POST";
      break;
    case "destroy":
      url = "destroy/" + params.id;
      delete params.id;
      method = "POST";
      break;
    case "update":
      method = "POST";
      break;
    case "retweet":
      url = "retweet/" + params.id;
      delete params.id;
      method = "POST";
      break;
    case "upload_media":
      this.uploadMedia(params, accessToken, accessTokenSecret, callback);
      return;
    case "update_with_media":
      callback("'update_with_media' type has been removed. Use 'upload_media' instead");
      return false;
    default:
      callback("Please specify an existing type.");
      return false;
  }

  if (method == "GET") {
    this.oa.get(baseUrl + "statuses/" + url + ".json?" + querystring.stringify(params), accessToken, accessTokenSecret, function (error, data, response) {
      if (error) {
        callback(error, data, response, baseUrl + "statuses/" + url + ".json?" + querystring.stringify(params));
      } else {
        try {
          callback(null, JSON.parse(data), response);
        } catch (e) {
          callback(e, data, response);
        }
      }
    });
  } else {
    this.oa.post(baseUrl + "statuses/" + url + ".json", accessToken, accessTokenSecret, params, function (error, data, response) {
      if (error) {
        callback(error, data, response);
      } else {
        try {
          callback(null, JSON.parse(data), response);
        } catch (e) {
          callback(e, data, response);
        }
      }
    });
  }
};

TwitterApi.prototype.uploadMedia = function (params, accessToken, accessTokenSecret, callback) {
  var oauthObj = {
    consumer_key: this.consumerKey,
    consumer_secret: this.consumerSecret,
    token: accessToken,
    token_secret: accessTokenSecret
  }
  var r = request.post({
    url: uploadBaseUrl + "media/upload.json",
    oauth: oauthObj
  }, function (error, response, body) {
    if (error) {
      callback(error, body, response, uploadBaseUrl + "media/upload.json?" + querystring.stringify(params));
    } else {
      try {
        callback(null, JSON.parse(body), response);
      } catch (e) {
        callback(e, body, response);
      }
    }
  });

  var parameter = (params.isBase64) ? "media_data" : "media";

  // multipart/form-data
  var form = r.form();
  if (fs.existsSync(params.media)) {
    form.append(parameter, fs.createReadStream(params.media));
  } else {
    form.append(parameter, params.media);
  }
};

//customized upload media with video support
TwitterApi.prototype.uploadVideo = function (params, accessToken, accessTokenSecret, callback) {
  var bufferLength = 1000000;
  var theBuffer = new Buffer(bufferLength);
  var offset = 0;
  var segment_index = 0;
  var finished = 0;
  var oauthObj = {
    consumer_key: this.consumerKey,
    consumer_secret: this.consumerSecret,
    token: accessToken,
    token_secret: accessTokenSecret
  };

  fs.stat(params.media, function (err, stats) {
    var formData, finalizeVideo, options;

    formData = {
      command: "INIT",
      media_type: 'video/mp4',
      total_bytes: params.size
    };
    options = {
      url: uploadBaseUrl + "media/upload.json",
      oauth: oauthObj,
      formData: formData
    };

    finalizeVideo = function (media_id) {
      return function (err, response, body) {

        finished++;
        if (finished === segment_index) {

          options.formData = {
            command: 'FINALIZE',
            media_id: media_id
          };
          request.post(options, function (err, response, body) {
            if (err) {
              return cb(err, body);
            } else {
              try {
                return callback(null, JSON.parse(body));
              } catch (e) {
                return callback(e, body);
              }
            }
          });
        }
      };
    };
    request.post(options, function (err, response, body) {
      var media_id;
      media_id = JSON.parse(body).media_id_string;
      fs.open(params.media, 'r', function (err, fd) {
        var bytesRead, data;

        while (offset < stats.size) {

          bytesRead = fs.readSync(fd, theBuffer, 0, bufferLength, null);
          data = bytesRead < bufferLength ? theBuffer.slice(0, bytesRead) : theBuffer;
          options.formData = {
            command: "APPEND",
            media_id: media_id,
            segment_index: segment_index,
            media_data: data.toString('base64')
          };
          request.post(options, finalizeVideo(media_id));
          offset += bufferLength;
          segment_index++
        }
      });
    });
  });
};

TwitterApi.prototype.users = function (type, params, accessToken, accessTokenSecret, callback) {
  var url = type.toLowerCase();

  this.oa.get(baseUrl + "users/" + url + ".json?" + querystring.stringify(params), accessToken, accessTokenSecret, function (error, data, response) {
    if (error) {
      callback(error, data, response, baseUrl + "users/" + url + ".json?" + querystring.stringify(params));
    } else {
      try {
        callback(null, JSON.parse(data), response);
      } catch (e) {
        callback(e, data, response);
      }
    }
  });
};

TwitterApi.prototype.getTimeline = function(type, params, accessToken, accessTokenSecret, callback) {
  type = type.toLowerCase();

  var url;
  switch (type) {
    case "home_timeline":
    case "home":
      url = "home_timeline";
      break;
    case "mentions_timeline":
    case "mentions":
      url = "mentions_timeline";
      break;
    case "user_timeline":
    case "user":
      if (!params.user_id && !params.screen_name) {
        callback("Always specify either an user_id or screen_name when requesting a user timeline.");
        return false;
      }
      url = "user_timeline";
      break;
    case "retweets_of_me":
    case "retweets":
      url = "retweets_of_me";
      break;
    default:
      callback("Please specify an existing type.");
      return false;
  }

  this.oa.get(baseUrl + "statuses/" + url + ".json?" + querystring.stringify(params), accessToken, accessTokenSecret, function(error, data, response) {
    if (error) {
      callback(error);
    } else {
      try {
        callback(null, JSON.parse(data));
      } catch (e) {
        callback(e, data, response);
      }
    }
  });
};

TwitterApi.prototype.direct_messages = function (type, params, accessToken, accessTokenSecret, callback) {
  var url = type.toLowerCase();
  var method = "GET";


  switch (url) {
    case "direct_messages":
    case "":
      url = "";
      break;
    case "destroy":
    case "new":
      method = "POST";
  }

  if (method == "GET") {
    this.oa.get(baseUrl + "direct_messages" + ((url) ? "/" + url : "") + ".json?" + querystring.stringify(params), accessToken, accessTokenSecret, function (error, data, response) {
      if (error) {
        callback(error, data, response, baseUrl + "direct_messages" + ((url) ? "/" + url : "") + ".json?" + querystring.stringify(params));
      } else {
        try {
          callback(null, JSON.parse(data), response);
        } catch (e) {
          callback(e, data, response);
        }
      }
    });
  } else {
    this.oa.post(baseUrl + "direct_messages/" + url + ".json", accessToken, accessTokenSecret, params, function (error, data, response) {
      if (error) {
        callback(error, data, response);
      } else {
        try {
          callback(null, JSON.parse(data), response);
        } catch (e) {
          callback(e, data, response);
        }
      }
    });
  }
};

module.exports = TwitterApi;

