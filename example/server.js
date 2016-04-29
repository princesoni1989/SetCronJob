var setCronJob = require('../index');
var cronJob = new setCronJob('xxxxxxxx');

//Get server time
cronJob.server.time(function (err, result) {
    printResult(err, result);
});


//get supported time zones
cronJob.server.timezones(function (err, result) {
    printResult(err, result);
});


//get user agents
cronJob.server.userAgent(function (err, result) {
    printResult(err, result);
});


//get server ip
cronJob.server.ip(function (err, result) {
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

