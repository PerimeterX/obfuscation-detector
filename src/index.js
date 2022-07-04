const {generateFlatAST} = require('flast');
const detectCaesarPlus = require(__dirname + '/detectors/caesarp');
const detectObfuscatorIo = require(__dirname + '/detectors/obfuscator-io');
const detectArrayReplacements = require(__dirname + '/detectors/arrayReplacements');
const detectArrayFunctionReplacements = require(__dirname + '/detectors/arrayFunctionReplacements');
const detectAugmentedArrayReplacements = require(__dirname + '/detectors/augmentedArrayReplacements');
const detectFunctionToArrayReplacemets = require(__dirname + '/detectors/functionToArrayReplacements');
const detectAugmentedArrayFunctionReplacements = require(__dirname + '/detectors/augmentedArrayFunctionReplacements');

/**
 * @param {string} code
 * @param {boolean} stopAfterFirst If true, return results after the first positive detection.
 * @return {string[]} All detected obfuscation types (or just the first one if stopAfterFirst is set to true);
 *                    An empty array if no known obfuscation type matched.
 */
function detectObfuscation(code, stopAfterFirst = true) {
	const detectedObfuscations = [];
	const detectors = [
		detectArrayReplacements,
		detectFunctionToArrayReplacemets,
		detectAugmentedArrayReplacements,
		detectArrayFunctionReplacements,
		detectAugmentedArrayFunctionReplacements,
		detectObfuscatorIo,
		detectCaesarPlus,
	];
	try {
		const tree = generateFlatAST(code);
		for (const detection of detectors) {
			try {
				const detectionType = detection(tree, detectedObfuscations);
				if (detectionType) detectedObfuscations.push(detectionType);
				if (stopAfterFirst && detectedObfuscations.length) break;
			} catch {}
		}
	} catch {}
	return detectedObfuscations;
}

try {
	module.exports = detectObfuscation;
} catch {}