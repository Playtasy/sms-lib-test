'use strict';

require('./sms-client').authenticate('foo', 'bar', function(err, data) {
	if (err) {
		return console.error(err);
	}
	console.log(data);
});
