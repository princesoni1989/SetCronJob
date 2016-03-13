var account = require('./lib/account');
var cron = require('./lib/cron');
var group = require('./lib/group');
var server = require('./lib/server');


function SetCronJob(config){
    if (!(this instanceof SetCronJob))
        return new SetCronJob(config);

    this.key = config && config.key ;
    SetCronJob.prototype.account = new account(this.key);
    SetCronJob.prototype.cron = new cron(this.key);
    SetCronJob.prototype.group = new group(this.key);
    SetCronJob.prototype.server = new server(this.key);
}
//if(! this.token){
//    throw new Error(Errors.No_Access_Token);
//}
module.exports = SetCronJob;
