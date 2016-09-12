'use strict';

var chai = require('chai');
var SMSClient = require('../lib');

var expect = chai.expect;

var APIKEY = 'test';
var APISECRET = 'test';

describe('SMSClient Test Suite', function() {

	describe('#authenticate', function() {

		it('should fail to authenticate and return http error 401', function(done) {
			SMSClient.authenticate(null, null, function(err) {
				expect(err).to.be.not.null;
				expect(err).to.have.property('statusCode', 401);
				done();
			});
		});

		it('should authenticate successfully with test account', function(done) {
			SMSClient.authenticate(APIKEY, APISECRET, function(err) {
				expect(err).to.be.null;
				done();
			});
		});

	});

	describe('#send', function() {
		it('should fail with error -101, no resource permission', function(done) {
			SMSClient.send('+80000000000', 'Hello World!', function(err, result) {
				expect(err).to.be.a('Error');
				expect(err.errorCode).to.be.equal(-101);
				done();
			});
		});
	});

});
