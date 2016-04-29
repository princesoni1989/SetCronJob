/**
 * Created by princesoni on 3/13/16.
 */
var server = require('../lib/server');
var should = require('should');
var token = 'xxxxxx';

/**
 * Test cases for Server
 */
describe('Server', function () {
    this.timeout(100000000);

    /**
     * Positive test cases
     */
    describe('Positive cases for server', function () {
        var serverObj = new server(token);
        it('should get time of server ', function (done) {
            serverObj.time(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should get timezones of server ', function (done) {
            serverObj.timezones(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should get useragent of  server ', function (done) {
            serverObj.userAgent(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should get ip of  server ', function (done) {
            serverObj.ip(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });
    });

    /**
     * Negative test cases
     */
    describe('Negative cases', function () {
        var serverObj = new server();
        it('should give no access token found', function (done) {
            serverObj.time(function (err, result) {
                done();
            })
        });
    });
});
