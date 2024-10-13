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

	for (const c of candidates) {
		if (c.id.references.length > 2) continue;
		const refs = c.id.references.map(n => n.parentNode);
		if (!arrayIsProvidedAsArgumentToIIFE(refs, c.id.name)) continue;
		for (const ref of c.id.references) {
			if (functionHasMinimumRequiredReferences(ref, flatTree)) return obfuscationName;
		}
	}
	return '';
}

export {detectAugmentedArrayFunctionReplacements};