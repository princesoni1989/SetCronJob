function Server(key){
    this.key = key;
}

Server.prototype.time = function(){
    console.log("key is", this.key);
}


Server.prototype.timezones = function(){
    console.log("key is", this.key);
}

Server.prototype.useragent = function(){
    console.log("key is", this.key);
}


Server.prototype.ip = function(){
    console.log("key is", this.key);
}

module.exports = Server;
