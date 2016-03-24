var helper = require('./helper/helper');
var config = require('./config/config.json');
var groupConfig = config.methods.group;

/**
 * Initialize Group
 * @param key
 * @constructor
 */
function Group(token) {
    this.token = token;
}

/**
 * List all groups under your account.
 * @param params - input parameters
 * @param callback - callback function
 */
Group.prototype.list = function (callback) {
    helper.makeCall(groupConfig.list, this.token, callback);
};

/**
 * Get one group's information
 * @param params - input parameters
 * @param callback - callback function
 */
Group.prototype.get = function (params, callback) {
    helper.makeCall(groupConfig.get, this.token, params, callback);
};

/**
 * Add a new group
 * @param params - input parameters
 * @param callback - callback function
 */
Group.prototype.add = function (params, callback) {
    helper.makeCall(groupConfig.add, this.token, params, callback);
};

/**
 * Update an existing group
 * @param params - input parameters
 * @param callback - callback function
 */
Group.prototype.edit = function (params, callback) {
    helper.makeCall(groupConfig.edit, this.token, params, callback);
};

/**
 * Delete a group
 * @param params - input parameters
 * @param callback - callback function
 */
Group.prototype.delete = function (params, callback) {
    helper.makeCall(groupConfig.delete, this.token, params, callback);
};

/**
 * Delete a group and all cronjobs under that group.
 * @param params - input parameters
 * @param callback - callback function
 */
Group.prototype.vanish = function (params, callback) {
    helper.makeCall(groupConfig.vanish, this.token, params, callback);
};

/**
 * Keep the group and delete all cronjobs under that group.
 * @param params - input parameters
 * @param callback - callback function
 */
Group.prototype.empty = function (params, callback) {
    helper.makeCall(groupConfig.empty, this.token, params, callback);
};

module.exports = Group;
