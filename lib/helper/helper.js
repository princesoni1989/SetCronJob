/**
 * Created by princesoni on 3/13/16.
 */
var request = require('request');
var baseUrl = 'https://www.setcronjob.com/api/';


exports.makeCall = function (options, params, callback) {
    var requestObj = {
        url: baseUrl + options.method,
        rejectUnauthorized: false,
        method: options.methodType,
        qs: {
            token: token,
        }
    }
    request(requestObj, function (err, response, body) {
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

