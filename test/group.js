/**
 * Created by princesoni on 3/13/16.
 */
var should = require('should');
var group = require('../lib/group');
var testData = require('./testData/testData');
var token = 'xxxxxx';

/**
 * Test cases for Group
 */
describe('Group', function () {
    this.timeout(100000000);
    var params = testData.group();
    /**
     * Positive test cases
     */
    describe('Positive cases for group', function () {
        var groupObj = new group(token);
        it('should create group ', function (done) {
            groupObj.add(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.data.should.have.property('id');
                params.id = result.id;
                done();
            });
        });

        it('should get list of group ', function (done) {
            groupObj.list(function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should get single group ', function (done) {
            groupObj.get(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should update group ', function (done) {
            params.name = 'updated-group';
            groupObj.edit(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should empty group ', function (done) {
            groupObj.empty(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should vanish group ', function (done) {
            groupObj.vanish(params, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });
    })

    /**
     * Negative test cases
     */
    describe('Negative cases', function () {
        var groupObj = new group();
        it('should give no access token found', function (done) {
            groupObj.list(function (err, result) {
                done();
            });
        });
        it('should not delete group with invalid id', function (done) {
            groupObj.delete({id: 'invalid'}, function (err, result) {
                console.log(err, result);
                done();
            });
        });
    });
});
