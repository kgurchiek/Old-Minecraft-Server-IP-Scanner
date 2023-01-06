# Minecraft Server IP Scanner

<div align="center">
    <img src="https://img.shields.io/github/last-commit/kgurchiek/Minecraft-Server-IP-Scanner" alt="GitHub last commit"/>
    <img src="https://img.shields.io/github/languages/code-size/kgurchiek/Minecraft-Server-IP-Scanner" alt="GitHub code size in bytes"/>
</div>

## About
Scans the internet for Minecraft server ips. Used to gather the database for my server scanner discord bot (https://github.com/kgurchiek/Minecraft-Server-Scanner-Discord-Bot).

## Configuration
Configuration is handled via a json file, `config.json`. An example `config.example.json` is provided in this repository.

There are two variables in config.json that you'll want to configure to your liking:
- **pingChunkSize:** how many ips are pinged at once. Larger numbers will make the scan faster, but will of course be harder on your computer. Make sure this number is below your max open files limit, otherwise you won't get any results.
- **pingTimeout:** how long to wait for a ping response before deciding it isn't an active server. 1500 - 2000 is recommended.

You can also adjust **scanPort** to configure which port will be hit on each IP, and **scanBlock** to adjust which /8 block will be hit by the scanner.

25565 is the default Java Edition port, and 19132 is the default Bedrock Edition port, so those are recommended as they would have the most servers.

The **database** section will be passed directly to `mariadb.createPool()`. Check out [their documentation](https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/) for more information.

This code requires Node.js, so make sure you have that installed.

## Usage
When you're ready to start the scan, run `node index.js`.

Note that the code only logs ips to the console every ping chunk, not every single ping.

All servers will be saved to serverList.json. The order of items in the list is synchronized, so successIPs[3]'s port will be successPorts[3]. 

Since the code currently only scans for one port anyway, you could not save the port if you want. To do that, go to the code of the saveData() function. Find `file.successPorts.push(successes[i].port)` near the beginning, and remove it.
