var	cpu       = require("./lib/cpu.js");
		config    = require("./lib/config.js"),
		dgram     = require('dgram'),
		os        = require('os'),
		http      = require('http'),
		httpProxy = require('http-proxy');

var client = dgram.createSocket("udp4"),
		load   = ((os.loadavg()[0] / os.cpus().length) * 100),
		config = config.readConfig();

//INIT VARIABLES WITH VALUES IN CONFIG FILE m.json
var TARGET     = config.target,
		PORT       = config.port,
		NAME       = config.name,
		APP_PORT   = config.app_port,
		PROXY_PORT = config.proxy_port;

var startMeasure = cpu.cpuAverage(),
		mem          = process.memoryUsage().rss,
		endMeasure,
		message;

//SEND THE LOAD OF THE CPU AND THE MEMORY OF THE PROCESS EVERY 5 SECONDS
start = function() {
	message = new Buffer('{ "app": "' + NAME + '", "type":"cpu-status", "load": "' + load + '", "mem": "' + mem + '"}');
	setInterval(function() { 
		client.send(message, 0, message.length, PORT, TARGET, function(err) {
			if(!err) {
				endMeasure = cpu.cpuAverage(); 
	  		load = cpu.percentageCPU(startMeasure,endMeasure);
	  		startMeasure = endMeasure;
				mem = process.memoryUsage().rss;
				message = new Buffer('{ "app": "' + NAME + '", "type":"cpu-status", "load": "' + load + '", "mem": "' + mem + '"}');
			}
		});
	}, 10000);
}
start();

// INIT THE PROXY SERVER
var proxy = httpProxy.createProxyServer({});
var target = 'http://127.0.0.1:' + APP_PORT;
var server = http.createServer(function(req, res) {
	message = new Buffer('{ "app": "' + NAME + '", "type" : "req" , "url": "' + req.url + '"}');
	client.send(message, 0, message.length, PORT, TARGET);
  proxy.web(req, res, { target: target });
});

server.listen(PROXY_PORT);

