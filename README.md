# sms-lib-test

Node.js SMS helper library (for testing purpose only).

#### Getting Started

```js
var SMSClient = require('sms-lib-test');

var APIKEY = 'your-api-key';
var APISECRET = 'your-api-secret';

SMSClient.authenticate(APIKEY, APISECRET, function(err) {
	if (err) {
		return console.error(err);
	}

	console.info('sms client authenticate success');

	SMSClient.send('+00000000000', 'sms message body', function(err, result) {
		if (err) {
			return console.error(err);
		}

		console.log(result);
	});
});
```
