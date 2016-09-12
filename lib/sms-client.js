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
		url: SERVICE_URL + '/auth',
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

			body = JSON.parse(body);
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

/**
 * Send SMS message
 */
SMSClient.send = function send(receiver, message, done) {
	if (typeof(done) !== 'function') {
		done = function(err) {
			if (err) {
				console.error(err);
			}
		};
	}
	request({
		method: 'POST',
		url: SERVICE_URL + '/sms',
		headers: {
			Authorization: 'Bearer ' + accessToken
		},
		form: {
			receiver: receiver,
			message: message
		}
	},
	function(err, res, body) {
		if (err) {
			return done(err);
		}
		if (res.statusCode === 200) {

			body = JSON.parse(body);

			if (body.error) {
				err = new Error(body.errorMessage);
				err.errorCode = body.error;
				return done(err);
			}

			return done(null, body.result);

		} else {
			var httpError = new Error(res.statusCode + ' ' + res.statusMessage);
			httpError.statusCode = res.statusCode;
			httpError.statusMessage = res.statusMessage;
			done(httpError);
		}
	});
};

module.exports = exports = SMSClient;
