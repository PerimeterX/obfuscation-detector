/**
 * Main entry point for obfuscation detection.
 * Exports the detectObfuscation function.
 * @module obfuscation-detector
 */

import {generateFlatAST, logger} from 'flast';
import * as detectors from './detectors/index.js';

/**
 * Detects obfuscation types in JavaScript code by analyzing its AST.
 *
 * @param {string} code - The JavaScript source code to analyze.
 * @param {boolean} [stopAfterFirst=true] - If true, returns after the first positive detection; if false, returns all matches.
 * @returns {string[]} An array of detected obfuscation type names. Returns an empty array if no known type is detected.
 */
function detectObfuscation(code, stopAfterFirst = true) {
	const detectedObfuscations = [];
	try {
		const tree = generateFlatAST(code);
		for (const detectorName of Object.keys(detectors)) {
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