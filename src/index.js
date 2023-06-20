const {generateFlatAST} = require('flast');

const availableDetectors = [];
// Dynamically import available detectors
[
	'arrayReplacements',
	'functionToArrayReplacements',
	'augmentedArrayReplacements',
	'arrayFunctionReplacements',
	'augmentedArrayFunctionReplacements',
	'obfuscator-io',
	'caesarp',
	'augmentedProxiedArrayFunctionReplacements',
].forEach(detName => availableDetectors.push(require(__dirname + `/detectors/${detName}`)));

/**
 * @param {string} code
 * @param {boolean} stopAfterFirst If true, return results after the first positive detection.
 * @return {string[]} All detected obfuscation types (or just the first one if stopAfterFirst is set to true);
 *                    An empty array if no known obfuscation type matched.
 */
function detectObfuscation(code, stopAfterFirst = true) {
	const detectedObfuscations = [];
	try {
		const tree = generateFlatAST(code);
		for (const detection of availableDetectors) {
			try {
				const detectionType = detection(tree, detectedObfuscations);
				if (detectionType) detectedObfuscations.push(detectionType);
				if (stopAfterFirst && detectedObfuscations.length) break;
			} catch {}
		}
	} catch {}
	return detectedObfuscations;
}

module.exports = detectObfuscation;
