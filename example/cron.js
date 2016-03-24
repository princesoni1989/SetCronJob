var setCronJob = require('../index');
var cronJob = new setCronJob('xxxxxxxx');

//list cron for a token
cronJob.cron.list(function (err, result) {
    printResult(err, result);
});


//get one cron job information
var params = {
    id: 'xxxxxx'
};
cronJob.cron.get(params, function (err, result) {
    printResult(err, result);
});


//Add cron job
var params = {
    month: 3,
    day: 25,
    hour: 18,
    minute: 0,
    url: 'https://test.com:9000/api/v1//execute',
    timezone: 'Asia/Kolkata',
    postData: '{"postId":"xyz"}',
    httpMethod: 'POST'
};
cronJob.cron.add(params, function (err, result) {
    printResult(err, result);
});


//Edit cron
var params = {
    id: 'xyz',
    month: 4,
    day: 26,
    hour: 19,
    minute: 20,
    url: 'https://daytest.com:9000/api/v1//execute',
    timezone: 'Asia/Kolkata',
    postData: '{"postId":"xyz"}',
    httpMethod: 'POST'
};
cronJob.cron.edit(params, function (err, result) {
    printResult(err, result);
});


//Enable cron
var params = {
    id: 'xyz'
};
cronJob.cron.enable(params, function (err, result) {
    printResult(err, result);
});


//Disable cron
var params = {
    id: 'xyz'
};
cronJob.cron.disable(params, function (err, result) {
    printResult(err, result);
});


//delete cron
var params = {
    id: 'xyz'
};
cronJob.cron.delete(params, function (err, result) {
    printResult(err, result);
});


//run cron
var params = {
    id: 'xyz'
};
cronJob.cron.run(params, function (err, result) {
    printResult(err, result);
})


//get logs
var params = {
    id: 'xyz'
};
cronJob.cron.logs(params, function (err, result) {
    printResult(err, result);
});


/**
 *
 * @param err
 * @param result
 */
function printResult(err, result) {
    if (err) {
        console.log("Error : ", err)
    } else {
        console.log("Result : ", result)
    }
}
