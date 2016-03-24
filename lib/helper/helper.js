/**
 * Created by princesoni on 3/13/16.
 */
var request = require('request');
var config = require('../config/config.json');

/**
 * make call to server with respective parameters
 * @param token - access token
 * @param options - options
 * @param params - cronjob params
 * @param callback - callback function
 */
exports.makeCall = function (options, token, params, callback) {
    checkToken(token);
    if (arguments.length === 3) {
        callback = params;
        params = {};
    }
    var requestObj = {
        url: config.baseUrl + options.method,
        rejectUnauthorized: false,
        method: options.type,
        qs: extend(token, params)
    }
    request(requestObj, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            try {
                var result = JSON.parse(body);
                return callback(null, result);
            } catch (e) {
                return callback(e, null);
            }
        } else {
            return callback(err || body, null);
        }
    });
};


/**
 * check if token is present or not
 * @param token
 */
function checkToken(token) {
    if (!token) {
        throw new Error('No access token found');
    }
}


/**
 * extend one object to other
 * @param token - access token
 * @param source - source object
 * @returns query object
 */
function extend(token, source) {
    var query = {token: token}
    for (var key in source) {
        if (source.hasOwnProperty(key)) query[key] = source[key];
    }
    return query;
}
