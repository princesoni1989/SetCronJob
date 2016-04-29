var helper = require('./helper/helper');
var config = require('./config/config.json');
var cronConfig = config.methods.cron;

/**
 * Initialize Cron
 * @param key
 * @constructor
 */
function Cron(token) {
    this.token = token;
}

/**
 * List all cronjobs under your account.
 * @param params - input parameters
 * @param callback - callback function
 */
Cron.prototype.list = function (callback) {
    helper.makeCall(cronConfig.list, this.token, callback);
};

/**
 * Get one cronjob's information
 * @param params - input parameters
 * @param callback - callback function

 */
Cron.prototype.get = function (params, callback) {
    helper.makeCall(cronConfig.get, this.token, params, callback);
};

/**
 * Add a new cronjob
 * @param params - input parameters
 * @param callback - callback function

 */
Cron.prototype.add = function (params, callback) {
    helper.makeCall(cronConfig.add, this.token, params, callback);
};

/**
 * Update an existing cronjob
 * @param params - input parameters
 * @param callback - callback function

 */

Cron.prototype.edit = function (params, callback) {
    helper.makeCall(cronConfig.edit, this.token, params, callback);
};

/**
 * Enable a cronjob
 * @param params - input parameters
 * @param callback - callback function

 */
Cron.prototype.enable = function (params, callback) {
    helper.makeCall(cronConfig.enable, this.token, params, callback);
};

/**
 * Disabled a cronjob
 * @param params - input parameters
 * @param callback - callback function

 */
Cron.prototype.disable = function (params, callback) {
    helper.makeCall(cronConfig.disable, this.token, params, callback);
};

/**
 * Delete a cronjob
 * @param params - input parameters
 * @param callback - callback function
 */
Cron.prototype.delete = function (params, callback) {
    helper.makeCall(cronConfig.delete, this.token, params, callback);
};

/**
 * Schedule the cronjob to run within next minute.
 * This doesn't change the cronjob's time settings
 * @param params - input parameters
 * @param callback - callback function
 */
Cron.prototype.run = function (params, callback) {
    helper.makeCall(cronConfig.run, this.token, params, callback);
};

/**
 * Get your cronjob execution logs.
 * @param params - input parameters
 * @param callback - callback function
 */
Cron.prototype.logs = function (params, callback) {
    helper.makeCall(cronConfig.logs, this.token, params, callback);
};

module.exports = Cron;
