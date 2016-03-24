var setCronJob = require('../index');
var cronJob = new setCronJob('xxxxxxxx');

//Edit account
var params = {
    timezone: 'Asia/kolkatta'
};
cronJob.account.edit(params, function (err, result) {
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
