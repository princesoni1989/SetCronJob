function Server(key){
    this.key = key;
}

Server.prototype.getKey = function(){
    console.log("key is", this.key);
}

module.exports = Server;
