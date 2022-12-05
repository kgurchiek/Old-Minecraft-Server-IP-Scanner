const { MinecraftServerListPing } = require("minecraft-status");
const fs = require("fs");
const file = require('./serverList.json')
var successes = [];
const pingChunkSize = 5240;
const pingTimeout = 1500;
var chunksScanned = 0;

function ping(ip, port) {
  MinecraftServerListPing.ping(0, ip, port, pingTimeout)
    .then(response => {
        console.log("success: " + ip);
        successes.push({
          ip: ip,
          port: port
        });
    })
    .catch(error => {
      //console.log(error);
    });
}

function saveData() {
  for (var i = 0; i < successes.length; i++) {
    if (!(file.successIPs.includes(successes[i].ip) && file.successPorts.includes(successes[i].port))) {
      file.successIPs.push(successes[i].ip);
      file.successPorts.push(successes[i].port);
    }
  }

  file.totalServers = file.successIPs.length;
  
  fs.writeFile("./serverList.json", JSON.stringify(file), 'utf8', function (err) {
    if (err) {
      console.log("error while saving data:");
      return console.log(err);
    }
 
    console.log("data saved");
  });
}

function ipValue(ip) {
  var ipList = ip.split('.');
  return ipList[3] + 255 * ipList[2] + 255**2 * ipList[1] + 255**3 * ipList[0]
}

function countIP(ip, count) {
  var ipList = String(ip).split('.');

  ipList[0] = parseInt(ipList[0]);
  ipList[1] = parseInt(ipList[1]);
  ipList[2] = parseInt(ipList[2]);
  ipList[3] = parseInt(ipList[3]);
  
  if (count >= 0) {
    ipList[3] += count;
    var remainder = 0;

    if (ipList[3] > 255) {
      remainder = Math.floor(ipList[3] / 255);
      ipList[3] %= 255;
      ipList[2] += remainder;
    }
    
    if (ipList[2] > 255) {
      remainder = Math.floor(ipList[2] / 255);
      ipList[2] %= 255;
      ipList[1] += remainder;
    }

    if (ipList[1] > 255) {
      remainder = Math.floor(ipList[1] / 255);
      ipList[1] %= 255;
      ipList[0] += remainder;
    }

    if (ipList[0] > 255) {
      console.log('ip too large ' + ip);
    }

    return ipList[0] + '.' + ipList[1] + '.' + ipList[2] + '.' + ipList[3];
  }
}

function pingChunk(start) {
  console.log(start);
  
  for (var i = 0; i < pingChunkSize; i++) {
    ping(countIP(start, i), 25565);
  }

  setTimeout(function() {
    chunksScanned++;
    if (chunksScanned % 20 == 0) {
      saveData();
    }
    pingChunk(countIP(start, pingChunkSize))
  }, pingTimeout)
}

pingChunk('52.0.0.0');