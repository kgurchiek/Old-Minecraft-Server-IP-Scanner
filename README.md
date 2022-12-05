# Minecraft-Server-IP-Scanner
Scans the internet for Minecraft server ips. Used to gather the database for my server scanner discord bot (https://github.com/kgurchiek/Minecraft-Server-Scanner-Discord-Bot).

## Configuration
There are two variables in index.js that you'll want to configure to your liking:
- **pingChunkSize:** how many ips are pinged at once. Larger numbers will make the scan faster, but will of course be harder on your computer. Make sure this number is below your max open files limit, otherwise you won't get any results.
- **pingTimeout:** how long to wait for a ping response before deciding it isn't an active server. 1500 - 2000 is recommended.

## Usage
When you start, copy the contents of templateServerList.json into serverList.json. This code re uires node.js, so make sure you have that installed. When you're ready to start the scan, run `node index.js`.

Note that the code only logs ips to the console every ping chunk, not every single ping.
