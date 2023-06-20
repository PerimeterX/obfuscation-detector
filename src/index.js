const {generateFlatAST} = require('flast');

const availableDetectors = [];
// Lazily import available detectors
[
	'arrayReplacements',
	'functionToArrayReplacements',
	'augmentedArrayReplacements',
	'arrayFunctionReplacements',
	'augmentedArrayFunctionReplacements',
	'obfuscator-io',
	'caesarp',
	'augmentedProxiedArrayFunctionReplacements',
].forEach(detName => availableDetectors.push(__dirname + `/detectors/${detName}`));

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
		for (let i = 0; i < availableDetectors.length; i++) {
			const detector = require(availableDetectors[i]);
			try {
				const detectionType = detector(tree, detectedObfuscations);
				if (detectionType) {
					detectedObfuscations.push(detectionType);
					if (stopAfterFirst) break;
				}
			} catch (e) {
				// console.log(`Error while running ${detector?.name}: ${e.message}`);	// Keep for debugging
			}
		}
	} catch (e) {
		// console.log(e.message);	// Keep for debugging
	}
	return detectedObfuscations;
}

module.exports = detectObfuscation;
