/**
 * Created by princesoni on 3/13/16.
 */
var should = require('should');
var account = require('../lib/account');
var testData = require('./testData/testData');
var token = 'me5qqyny91u9bzfd6k6nfcinsa9gzulj'

/**
 * Test cases for Account
 */
describe.skip('Account', function () {
    this.timeout(100000000);

    /**
     * Positive test cases
     */
    describe('Positive cases', function () {
        var accountObj = new account(token);
        var params = testData.account();
        it('should edit account', function (done) {
            accountObj.edit(params, function (err, result) {
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
        var accountObj = new account();
        var params = {};
        it('should not edit account ', function (done) {
            accountObj.edit(params, function (err, result) {
                done();
            });
        });
    });
});
