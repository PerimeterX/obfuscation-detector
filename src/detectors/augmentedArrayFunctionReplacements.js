import {arrayIsProvidedAsArgumentToIIFE, findArrayDeclarationCandidates, functionHasMinimumRequiredReferences} from './sharedDetectionMethods.js';

const obfuscationName = 'augmented_array_function_replacements';

/**
 * Augmented Array-Function Replacements obfuscation type has the following characteristics:
 * - The same characteristics as an Array-Function Replacements obfuscation type.
 * - An IIFE with a reference to Array A as one if its arguments.
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
 */
function detectAugmentedArrayFunctionReplacements(flatTree) {
	const candidates = findArrayDeclarationCandidates(flatTree);

	const isFound = candidates.some(c => {
		if (c.id.references.length > 2) return false;
		const refs = c.id.references.map(n => n.parentNode);
		if (!arrayIsProvidedAsArgumentToIIFE(refs, c.id.name)) return false;
		return c.id.references.some(ref => functionHasMinimumRequiredReferences(ref, flatTree));
	});
	return isFound ? obfuscationName : '';
}

export {detectAugmentedArrayFunctionReplacements};