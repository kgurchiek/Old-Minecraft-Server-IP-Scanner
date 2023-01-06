const { MinecraftServerListPing } = require("minecraft-status");
const fs = require("fs");
const serverListFile = require('./serverList.json')
let successes = [];

let chunksScanned = 0;

const config = require("./config.json");

function ping(ip, port) {
  MinecraftServerListPing.ping(0, ip, port, config.pingTimeout)
    .then(() => {
        console.log("success: " + ip);
        successes.push({
          ip: ip,
          port: port
        });
    })
    .catch(() => {
      //console.log(error);
    });
}

function saveData() {
  for (let i = 0; i < successes.length; i++) {
    if (!(serverListFile.successIPs.includes(successes[i].ip) && serverListFile.successPorts.includes(successes[i].port))) {
      serverListFile.successIPs.push(successes[i].ip);
      serverListFile.successPorts.push(successes[i].port);
    }
  }

  serverListFile.totalServers = serverListFile.successIPs.length;
  
  fs.writeFile("./serverList.json", JSON.stringify(serverListFile), 'utf8', function (err) {
    if (err) {
      console.log("error while saving data:");
      return console.log(err);
    }
 
    console.log("data saved");
  });
}
function countIP(ip, count) {
  let ipList = String(ip).split('.');

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
  
  for (let i = 0; i < config.pingChunkSize; i++) {
    ping(countIP(start, i), config.scanPort);
  }

  setTimeout(function() {
    chunksScanned++;
    if (chunksScanned % 20 === 0) {
      saveData();
    }
    pingChunk(countIP(start, config.pingChunkSize))
  }, config.pingTimeout)
}

pingChunk(config.scanBlock);