function Account(key){
    this.key = key;
}

/**
 *
 * @returns {*}
 */
Account.prototype.update = function(){
    return this.key
}

module.exports = Account;
