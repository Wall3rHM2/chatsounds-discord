# Chatsounds for Discord
 A bot made in nodejs for discord, which plays sounds from source engine games with modifiers and more.
 This bot was inspired by the addon [Chatsounds](https://github.com/Metastruct/garrysmod-chatsounds) for the game Garry's Mod.
 
 ## Setup
 1. Download the repository and extract the files to a folder
 2. Open the index.js and put your bot token inside the bot login
 3. Create a folder inside called "sounds"
 4. Put inside the sounds that you want, such as from source engine games or chatsounds/autoadd
 5. Run the index.js with nodejs

## Requirements
Required npm packages:
* discord.js
* ffmpeg-static
* @discordjs/opus
* discord.js-arbitrary-ffmpeg

Other requirements:
* ffmpeg command available in your OS terminal (syscall)

Instaled source games:
* Half-Life 2
* Team Fortress 2
* Counter Strike: Source
* Counter Strike: Global Offensive


# FAQ

## What is this? (more detailed answer)

This is a bot code made in Node.js to be used with the communication platform Discord. Discord is the greatest voice application and it's free to use, providing many and many features. What this bot does is: when the bot is active, and someone types in the Discord chat anything that has a sound effect with the same name or very similar, the bot connects to the voice channel that the user who typed it is, and plays the request sound in voice by using mp3/wav files and streaming them in the voice channel. It also contains modifiers, which are special characters that you can use to modify how the sound is played. **A example of sound modifiers is the pitch** modifier, which is used by the % key followed by a integer that will affect the sound (e.g: hello%130).
