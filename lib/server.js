var helper = require('./helper/helper');
var config = require('./config/config.json');
var serverConfig = config.methods.server;

/**
 * Initialize Server
 * @param key
 * @constructor
 */
function Server(key) {
    this.key = key;
}

/**
 * Get current SetCronJob server time.
 * @param params - input parameters
 * @param callback - callback function
 */
Server.prototype.time = function (callback) {
    helper.makeCall(serverConfig.time, this.token, callback);
};

/**
 * List all supported time zones.
 * @param params - input parameters
 * @param callback - callback function
 */
Server.prototype.timezones = function (params, callback) {
    helper.makeCall(serverConfig.timezones, this.token, callback);
};

/**
 * Return the current user agent (browser name) of SetCronJob bot.
 * @param params - input parameters
 * @param callback - callback function
 */
Server.prototype.useragent = function (params, callback) {
    helper.makeCall(serverConfig.useragent, this.token, callback);
};

/**
 *Return the current IP addresses of SetCronJob bot.
 * @param params - input parameters
 * @param callback - callback function
 */
Server.prototype.ip = function (params, callback) {
    helper.makeCall(serverConfig.ip, this.token, callback);
};

module.exports = Server;
