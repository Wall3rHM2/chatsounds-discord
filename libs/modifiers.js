

//				  #		  *		  %		   ++		 --		  =
let allPatterns = /#(\d+)|\*(\d+)|\%(\d+)|\+\+(\d+)|\-\-(\d+)|\=(\d+)/g;


function hasModifiers(sentence) {
	let result = sentence.search(allPatterns);
	return result != -1;
}

function removeModifiers(sentence) {
	sentence = sentence.replace(allPatterns, "");
	return sentence;
}


function getIndex(sentence) {
	sentence = sentence.match(/#(\d+)/g);
	if (sentence != null) {
		sentence = sentence[0].substring(1); //removes pattern
	}
	return sentence;
}

function getMultiplier(sentence) {
	sentence = sentence.match(/\*(\d+)/g);
	if (sentence != null) {
		sentence = sentence[0].substring(1);
	}
	return sentence;
}

function getPitch(sentence) {
	sentence = sentence.match(/\%(\d+)/g);
	if (sentence != null) {
		sentence = sentence[0].substring(1);
	}
	return sentence;
}

function getStart(sentence) { // ++ starts to play the sound after x%
	sentence = sentence.match(/\+\+(\d+)/g);
	if (sentence != null) {
		sentence = sentence[0].substring(2);
	}
	return sentence;
}

function getEnd(sentence) {	// ++ interrupts the sound after x%
	sentence = sentence.match(/\-\-(\d+)/g);
	if (sentence != null) {
		sentence = sentence[0].substring(2);
	}
	return sentence;
}

function getNextDelay(sentence) {	// play next sound after x seconds
	sentence = sentence.match(/\=(\d+)/g);
	if (sentence != null) {
		sentence = sentence[0].substring(1);
	}
	return sentence;
}



function getModifiers(sentence) {
	modifiers = {};
	modifiers.index = getIndex(sentence);
	modifiers.multiplier = getMultiplier(sentence);
	modifiers.pitch = getPitch(sentence);
	modifiers.start = getStart(sentence);
	modifiers.end = getEnd(sentence);
	modifiers.nextDelay = getNextDelay(sentence);

	return modifiers;
}



module.exports.hasModifiers = hasModifiers;
module.exports.removeModifiers = removeModifiers;
module.exports.getModifiers = getModifiers;