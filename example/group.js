var setCronJob = require('../index');
var cronJob = new setCronJob('xxxxxxxx');

//list group
cronJob.group.list(function (err, result) {
    printResult(err, result);
});


//Get group
var params = {
    id: 'xyz'
};
cronJob.group.get(params, function (err, result) {
    printResult(err, result);
});


//Add group
var params = {
    name: 'test-group'
};
cronJob.group.add(params, function (err, result) {
    printResult(err, result);
});


//Edit group
var params = {
    id: 'xyz',
    name: 'test-edit'
};
cronJob.group.edit(params, function (err, result) {
    printResult(err, result);
});


//Delete group
var params = {
    id: 'xyz'
};
cronJob.group.delete(params, function (err, result) {
    printResult(err, result);
});


//Vanish group
var params = {
    id: 'xyz'
};
cronJob.group.vanish(params, function (err, result) {
    printResult(err, result);
});


//Emp†y group
var params = {
    id: 'xyz'
};
cronJob.group.empty(params, function (err, result) {
    printResult(err, result);
});


/**
 *
 * @param err
 * @param result
 */
function printResult(err, result){
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
}
