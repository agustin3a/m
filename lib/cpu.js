var os = require("os");

module.exports.cpuAverage = function() {

  var totalIdle = 0, 
      totalTick = 0,
      cpu;
  var cpus = os.cpus();

  for(var i = 0, len = cpus.length; i < len; i++) {
    cpu = cpus[i];
    for(type in cpu.times) {
      totalTick += cpu.times[type];
   }     
    totalIdle += cpu.times.idle;
  }
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

module.exports.percentageCPU = function(start,end) {
  var idleDifference = end.idle - start.idle;
  var totalDifference = end.total - start.total;
  var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
  return percentageCPU;
}
