const fs = require("fs");
const colors = require("./colors.js");
const list = require("./start_tree.js");
const tree = list.startTree();
const playArbitraryFFmpeg = require("discord.js-arbitrary-ffmpeg");
const mod = require("./modifiers.js");
var autocomplete = true;





function randomInt(min, max) {
	return Math.floor(
		Math.random() * (max + 1 - min) + min
	)
}

function getInfo(content) {
	let allInfo = [];
	let infoMax = content.length;
	//var currentWord
	for (let i = 0; i < infoMax; i++) {
		let info = content[i];
		allInfo[i] = info;
	}
	return allInfo;
}

function isValid(element) {
	if (typeof element != "undefined" && element && element != -1) {
		return true;
	} else {
		return false;
	}
}

function pitchToRate(pitch) {
	if (!isValid(pitch)) {
		pitch = 100;
	}
	else if (parseInt(pitch) < 10) {
		pitch = 100;
	}
	else {
		pitch = parseInt(pitch);
	}
	let defaultRate = 44100;
	let finalRate = defaultRate * (pitch / 100);

	return finalRate;
}


function play(connection, path, modifiers) {
	path = "./sounds/" + path;

	if (!fs.existsSync(path)) { return; }

	let rate = pitchToRate(modifiers.pitch);
	let params = [
		"-i", path,
		"-af", "aformat=channel_layouts=stereo,asetrate=" + rate
	];

	const dispatcher = playArbitraryFFmpeg(
		connection, // A VoiceConnection from Discord.js
		params, // Optional stream options (same as for playFile, playStream, etc.)
		{ bitrate: "44100" }
	);
}


function parse(connection, text) {
	var lastInfo = -1; //last piece of information that was valid in the sentence
	var lastInfoIndex = -1;
	var words = text.split(" ");
	var wordsMax = words.length;
	var lastWord = -1;
	var currentBranch = tree; //last part of the list tree that was used
	var started = false;


	function clearCurrentData() {

		lastInfoIndex = -1;
		started = false;
		lastInfo = -1;
		currentBranch = tree;
	}


	for (let i = 0; i < wordsMax; i++) {
		let rawWord = words[i];
		let word = mod.removeModifiers(rawWord);
		let modifiers = mod.getModifiers(rawWord);


		if (isValid(currentBranch[word])) { //when the word exists in the tree

			currentBranch = currentBranch[word];
			started = true;
			let info = currentBranch.info;
			if (isValid(info)) { lastInfo = info; lastInfoIndex = i; } //registers the current available info
			else { continue; } //proceed when last information checked is valid

			let indexMax = lastInfo.length - 1;
			let index = randomInt(0, indexMax);

			modifiers.index = parseInt(modifiers.index); //tries to use the #x modifier number
			if (modifiers.index) {
				modifiers.index = modifiers.index - 1; //convert the list (starts in 1) to array (starts in 0)
				if (modifiers.index <= indexMax && modifiers.index >= 0) {
					index = modifiers.index;
				}
			}

			let path = lastInfo[index].path;
			let sentenceFinalIndex = wordsMax - 1;
			if (!(i >= sentenceFinalIndex)) { continue; } //proceed only when it is the last word
			clearCurrentData();
			play(connection, path, mod.getModifiers(rawWord));
			if ((lastInfoIndex < sentenceFinalIndex)) { continue; }

			if (lastInfoIndex != -1) {
				i = lastInfoIndex; //return to the same word but starts creating a new sentence
			} else {
				i--;
			}
		}



		else if (started) {

			if (isValid(lastInfo)) {
				let indexMax = lastInfo.length - 1;
				let index = randomInt(0, indexMax);

				modifiers.index = parseInt(modifiers.index); //tries to use the #x modifier number
				if (modifiers.index) {
					modifiers.index = modifiers.index - 1;
					if (modifiers.index <= indexMax && modifiers.index >= 0) {
						index = modifiers.index;
					}
				}

				let path = lastInfo[index].path;
				play(connection, path, mod.getModifiers(rawWord));
			}

			if (lastInfoIndex != -1) {
				i = lastInfoIndex; //return to the same word but starts creating a new sentence
			} else {
				i--;
			}

			clearCurrentData();
		}
	}
	//connection.play(fs.createReadStream('audio.ogg'));
}
//console.log(tree.breaking.news.the.mongols.have.invaded.china);

module.exports.parse = parse;