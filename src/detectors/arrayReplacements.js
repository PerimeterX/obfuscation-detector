import {arrayHasMinimumRequiredReferences, findArrayDeclarationCandidates} from './sharedDetectionMethods.js';

const obfuscationName = 'array_replacements';

/**
 * Detects the Array Replacements obfuscation type.
 *
 * Characteristics:
 * - An array (A) with many strings is defined.
 * - There are many member expression references where the object is array A.
 *
 * @param {ASTNode[]} flatTree - The flattened AST of the code.
 * @returns {string} The obfuscation name if detected; otherwise, an empty string.
 */
function detectArrayReplacements(flatTree) {
	const candidates = findArrayDeclarationCandidates(flatTree);

	const isFound = candidates.some(c => {
		const refs = c.id.references.map(n => n.parentNode);
		return arrayHasMinimumRequiredReferences(refs, c.id.name, flatTree);
	});
	return isFound ? obfuscationName : '';
}

export {detectArrayReplacements};