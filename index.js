var cpu = require("./lib/cpu.js");
var dgram = require('dgram');
var os = require('os');

var client = dgram.createSocket("udp4");
var PORT, TARGET;
var load = ((os.loadavg()[0] / os.cpus().length) * 100);
var mem = process.memoryUsage().rss;
var message;
var config = {};
var startMeasure = cpu.cpuAverage(),
endMeasure;
config.target = "localhost";
config.port = 3000;
config.name = "A";


start = function() {
	TARGET = config.target;
	PORT = config.port;
	NAME = config.name;
	message = new Buffer('{ "app": "' + NAME + '", "load": "' + load + '", "mem": "' + mem + '"}');
	setInterval(function() { 
		client.send(message, 0, message.length, PORT, TARGET, function(err) {
			endMeasure = cpu.cpuAverage(); 
  		load = cpu.percentageCPU(startMeasure,endMeasure);
  		startMeasure = endMeasure;
			mem = process.memoryUsage().rss;
				message = new Buffer('{ "app": "' + NAME + '", "load": "' + load + '", "mem": "' + mem + '"}');
					});
	}, 5000);
}
start();