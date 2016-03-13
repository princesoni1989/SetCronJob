var account = require('./lib/account');
var cron = require('./lib/cron');
var group = require('./lib/group');
var server = require('./lib/server');

/**
 *
 * @param config
 * @returns {SetCronJob}
 * @constructor
 */
function SetCronJob(config){
    if (!(this instanceof SetCronJob))
        return new SetCronJob(config);

    this.token = config && config.token ;
    SetCronJob.prototype.account = new account(this.token);
    SetCronJob.prototype.cron = new cron(this.token);
    SetCronJob.prototype.group = new group(this.token);
    SetCronJob.prototype.server = new server(this.token);
}
module.exports = SetCronJob;
