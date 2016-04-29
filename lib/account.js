var helper = require('./helper/helper');
var config = require('./config/config.json');
var accountConfig = config.methods.account;

/**
 * Initialize Account
 * @param token
 * @constructor
 */
function Account(token) {
    this.token = token;
}

/**
 * Update your account settings, currently,
 * we only support changing account's timezone.
 * @param params - input parameters
 * @param callback - callback function
 */
Account.prototype.edit = function (params, callback) {
    helper.makeCall(accountConfig.edit, this.token , params, callback);
};

module.exports = Account;
