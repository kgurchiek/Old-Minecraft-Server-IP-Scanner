# Minecraft-Server-IP-Scanner

<div align="center">
    <img src="https://img.shields.io/github/last-commit/kgurchiek/Minecraft-Server-Scanner-Discord-Bot" alt="GitHub last commit"/>
    <img src="https://img.shields.io/github/languages/code-size/kgurchiek/Minecraft-Server-Scanner-Discord-Bot" alt="GitHub code size in bytes"/>
</div>

Scans the internet for Minecraft server ips. Used to gather the database for my server scanner discord bot (https://github.com/kgurchiek/Minecraft-Server-Scanner-Discord-Bot).

## Configuration
There are two variables in index.js that you'll want to configure to your liking:
- **pingChunkSize:** how many ips are pinged at once. Larger numbers will make the scan faster, but will of course be harder on your computer. Make sure this number is below your max open files limit, otherwise you won't get any results.
- **pingTimeout:** how long to wait for a ping response before deciding it isn't an active server. 1500 - 2000 is recommended.

Copy the contents of templateServerList.json into serverList.json. Then go to the bottom and find where the pingChunk() function is used. Replace the ip inside with whatever ip you want to start the scan with. Then, just above that, look into the pingChunk function's code, and find where it runs a ping() funtion. After `countIP(start, i)`, there's a number (25565 by default). That's the port of the server that the scanner is searching for, you can set that to whatver you'd like. 25565 is the default Java Edition port, and 19132 is the default Bedrock Edition port, so those are recommended as they would have the most servers.

This code requires Node.js, so make sure you have that installed.

## Usage
When you're ready to start the scan, run `node index.js`.

Note that the code only logs ips to the console every ping chunk, not every single ping.

All servers will be saved to serverList.json. The order of items in the list is synchronized, so successIPs[3]'s port will be successPorts[3]. 

Since the code currently only scans for one port anyway, you could not save the port if you want. To do that, go to the code of the saveData() function. Find `file.successPorts.push(successes[i].port)` near the beginning, and remove it.
