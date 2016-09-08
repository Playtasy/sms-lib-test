'use strict';

var request = require('request');

var SERVICE_URL = 'http://188.166.232.247:8007/api';

var SMSClient = {};
var accessToken = null;

/**
 * Autheticate with APIKEY and APISECRET
 */
SMSClient.authenticate = function authenticate(apikey, apisecret, done) {
	if (typeof(done) !== 'function') {
		done = function(err) {
			if (err) {
				console.error(err);
			}
		};
	}
	request({
		method: 'POST',
		uri: SERVICE_URL + '/auth',
		headers: {
			apikey: apikey,
			apisecret: apisecret
		}
	},
	function(err, res, body) {
		if (err) {
			return done(err);
		}
		if (res.statusCode === 200) {

			accessToken = body.access_token;

			done(null);
		} else {
			var httpError = new Error(res.statusCode + ' ' + res.statusMessage);
			httpError.statusCode = res.statusCode;
			httpError.statusMessage = res.statusMessage;
			done(httpError);
		}
	});
};

module.exports = exports = SMSClient;
