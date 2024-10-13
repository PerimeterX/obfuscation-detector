import {arrayHasMinimumRequiredReferences, arrayIsProvidedAsArgumentToIIFE, findArrayDeclarationCandidates} from './sharedDetectionMethods.js';

const obfuscationName = 'augmented_array_replacements';

/**
 * Augmented Array Replacements obfuscation type has the following characteristics:
 * - The same characteristics as an Array Replacements obfuscation type.
 * - An IIFE with a reference to Array A as one if its arguments.
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
 */
function detectAugmentedArrayReplacements(flatTree) {
	const candidates = findArrayDeclarationCandidates(flatTree);

	for (const c of candidates) {
		const refs = c.id.references.map(n => n.parentNode);
		// Verify the IIFE exists and has the candidate array as one of its arguments.
		if (arrayIsProvidedAsArgumentToIIFE(refs, c.id.name) &&
				arrayHasMinimumRequiredReferences(refs, c.id.name, flatTree)) return obfuscationName;
	}
	return '';
}

export {detectAugmentedArrayReplacements};