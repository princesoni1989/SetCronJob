/**
 * Created by princesoni on 3/13/16.
 */
var should = require('should');
var cron = require('../lib/cron');
var testData = require('./testData/testData');
var token = 'xxxxxx';

/**
 * Test cases for Cron
 */
describe('Cron', function () {
    this.timeout(100000000);
    var params = testData.cron();
    /**
     * Positive test cases
     */
    describe('Positive cases for cron', function () {
        var cronObj = new cron(token);
        it('should create cron ', function (done) {
            cronObj.add(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.data.should.have.property('id');
                params.id = result.data.id;
                done();
            });
        });

        it('should get list of cron ', function (done) {
            cronObj.list(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should get single cron ', function (done) {
            cronObj.get(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should update cron ', function (done) {
            params.month++;
            cronObj.edit(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should disable cron ', function (done) {
            cronObj.disable(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should enable cron ', function (done) {
            cronObj.enable(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should run cron ', function (done) {
            cronObj.run(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should get logs for cron ', function (done) {
            cronObj.logs(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should delete cron ', function (done) {
            cronObj.logs(params, function (err, result) {
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
        var cronObj = new cron();
        it('should give no access token found', function (done) {
            cronObj.list(function (err, result) {
                done();
            });
        });

        it('should not delete cron with invalid id', function (done) {
            cronObj.delete({id: 'invalid'}, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });
});
