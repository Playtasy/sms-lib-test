'use strict';

var chai = require('chai');
var SMSClient = require('../lib/sms-client');

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

});
