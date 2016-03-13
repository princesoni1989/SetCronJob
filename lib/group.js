function Group(key){
    this.key = key;
}

Group.prototype.getKey = function(){
    console.log("key is", this.key);
}

module.exports = Group;
