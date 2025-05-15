import {arrayHasMinimumRequiredReferences, findArrayDeclarationCandidates} from './sharedDetectionMethods.js';

const obfuscationName = 'array_replacements';

/**
 * Array Replacements obfuscation type has the following characteristics:
 * - An array (A) is with many strings is defined.
 * - There are many member expression references where the object is array A.
 *
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
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
