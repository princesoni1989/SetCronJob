/**
 * Created by princesoni on 3/24/16.
 */

/**
 * test data for account
 */
exports.account = function () {
    return {
        timezone: 'Asia/kolkatta'
    };
};

/**
 *
 * test data for cron
 */
exports.cron = function () {
    return {
        month: new Date().getMonth() + 1,
        day: 25,
        hour: 18,
        minute: 0,
        url: 'https://test.com:9000/api/v1//execute',
        timezone: 'Asia/Kolkata',
        postData: '{"postId":"xyz"}',
        httpMethod: 'POST'
    };
};

/**
 *
 * test data for group
 */
exports.group = function () {
    return {
        name: 'test-group'
    };
};
