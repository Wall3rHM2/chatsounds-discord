const fs = require("fs");
const colors = require("./colors.js");
const path = require("path")
const jsonPath = path.join(__dirname, '../chatsounds_lists.json'); //"./../chatsounds_lists.json";
var tree = {}; //main list of sound names and their sound paths

function isValid(element) {
	if (typeof element != "undefined" && element) {
		return true;
	} else {
		return false;
	}
}
const SANITIZE = false;
function sanitizeInfo(array) {
	if (!SANITIZE) { return array; }
	for (let i = 0; i < array.length; i++) {
		if (isValid(array[i])) {
			let path = array[i].path;
			if (!fs.existsSync("./sounds/" + path)) {
				array.splice(i, 1);
				i--;
			}
		}
	}
	return array;
};

function getInfo(content) {
	var allInfo = [];
	var infoMax = content.length;
	//var currentWord
	for (let i = 0; i < infoMax; i++) {
		var info = content[i];

		allInfo[i] = info;
	}
	//console.log(allInfo);
	return allInfo;
}

function appendInfo(info, newInfo) {
	let start = info.length;
	let end = start + newInfo.length;

	for (let i = start; i < end; i++) {
		newInfoIndex = i - start;
		info[i] = newInfo[newInfoIndex];
	}
	return info;
}

function defineTreePath(content, element) {
	var branches = element.split(" ");
	var branchesSize = branches.length;
	var currentBranch = -1;
	//var info = content[0];
	var paths;

	for (let i = 0; i < branchesSize; i++) {
		var word = branches[i];

		if ((typeof tree[word] == "undefined" || !tree[word]) && currentBranch == -1) {
			tree[word] = {};
		}
		else if (typeof currentBranch[word] == "undefined" || !currentBranch[word]) {
			currentBranch[word] = {};
		}

		if (currentBranch == -1) {
			currentBranch = tree[word];
		} else {
			currentBranch = currentBranch[word];
		}

	}
	
	if (!isValid(currentBranch.info)) {
		let info = getInfo(content);
		let sanitized = sanitizeInfo(info);
		if (!isValid(sanitized[0])) { return; }
		currentBranch.info = sanitized;
	} 
	else {
		let info = getInfo(content);
		let sanitized = sanitizeInfo(info);
		if (!isValid(sanitized[0])) { return; }
		currentBranch.info = appendInfo(currentBranch.info, sanitized);
	}

}

function defineSectionElements(content, section) {
	keys = Object.keys(content);
	keys.forEach(element => defineTreePath(content[element], element));
}

function startTree() {
	console.log(colors.FgCyan + "Starting list tree" + colors.Reset);
	var startTree = new Date();

	var content = fs.readFileSync(jsonPath);
	var jsonContent = JSON.parse(content);
	var keys = Object.keys(jsonContent);
	tree = {};
	keys.forEach(section => defineSectionElements(jsonContent[section], section));


	var endTree = new Date();
	var interval = (endTree.getTime() - startTree.getTime()) / 1000;
	console.log(colors.FgGreen + "List tree started (took " + (interval) + " seconds)" + colors.Reset);
	console.log(tree.dr);
	return tree;
}

module.exports.startTree = startTree;
