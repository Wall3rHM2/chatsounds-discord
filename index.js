const Discord = require("discord.js");
const client = new Discord.Client();
const debug = require("./libs/debug_functions.js")
const fs = require("fs");
const sounds = require("./libs/parse_sounds.js");


function connect(message) {
  if (message.member == null) { debug.print("could not connect to channel (owner of message == null)"); return 0; }
  let voiceChannel = message.member.voice.channel;
  if (voiceChannel == null) { debug.print("could not connect to channel (null voice channel)"); return 0; }

  voiceChannel.join().then(connection => { sounds.parse(connection, message.content) }).catch(err => debug.print(err));
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  connect(msg);
});

client.login("");