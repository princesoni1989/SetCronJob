var helper = require('./helper/helper');

function Account(token) {
    this.token = token;
}

/**
 *
 * @returns {*}
 */
Account.prototype.update = function (params, callback) {
    checkToken();
    helper.makeCall(this.token, params, callback)
}

function checkToken() {
    if (!this.token) {
        throw new Error('No access token found');
    }
}
module.exports = Account;
