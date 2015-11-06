var fs = require('fs');

module.exports.readConfig = function() {
	var config = JSON.parse(
		fs.readFileSync('m.json')
	);
	return config;
}