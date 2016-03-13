function Cron(key){
    this.key = key;
}

Cron.prototype.getKey = function(){
    console.log("key is", this.key);
}


module.exports = Cron;
