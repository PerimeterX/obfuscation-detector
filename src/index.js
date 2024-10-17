import {generateFlatAST, logger} from 'flast';
import * as detectors from './detectors/index.js';

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
		for (const detectorName in detectors) {
			try {
				const detectionType = detectors[detectorName](tree, detectedObfuscations);
				if (detectionType) {
					detectedObfuscations.push(detectionType);
					if (stopAfterFirst) break;
				}
			} catch (e) {
				logger.debug(`Error while running ${detectorName}: ${e.message}`);	// Keep for debugging
			}
		}
	} catch (e) {
		logger.debug(e.message);	// Keep for debugging
	}
	return detectedObfuscations;
}

export {detectObfuscation};
