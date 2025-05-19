import {arrayHasMinimumRequiredReferences, arrayIsProvidedAsArgumentToIIFE, findArrayDeclarationCandidates} from './sharedDetectionMethods.js';

const obfuscationName = 'augmented_array_replacements';

/**
 * Detects the Augmented Array Replacements obfuscation type.
 *
 * Characteristics:
 * - The same characteristics as an Array Replacements obfuscation type.
 * - An IIFE with a reference to Array A as one of its arguments.
 *
 * @param {ASTNode[]} flatTree - The flattened AST of the code.
 * @returns {string} The obfuscation name if detected; otherwise, an empty string.
 */
function detectAugmentedArrayReplacements(flatTree) {
	const candidates = findArrayDeclarationCandidates(flatTree);

	const isFound = candidates.find(c => {
		const refs = c.id.references.map(n => n.parentNode);
		 // Verify the IIFE exists and has the candidate array as one of its arguments.
		return arrayIsProvidedAsArgumentToIIFE(refs, c.id.name) &&
			arrayHasMinimumRequiredReferences(refs, c.id.name, flatTree);
	});
	return isFound ? obfuscationName : '';
}

export {detectAugmentedArrayReplacements};