import {findArrayDeclarationCandidates, functionHasMinimumRequiredReferences} from './sharedDetectionMethods.js';

const obfuscationName = 'array_function_replacements';

/**
 * Array-Function Replacements obfuscation type has the following characteristics:
 * - An array (A) is with many strings is defined.
 * - A function (B) that returns a single value from the array A, based on provided arguments is present.
 * - There are many call expressions to function B, with only literals as arguments.
 * - There are no more than 2 reference to array A.
 *
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
 */
function detectArrayFunctionReplacements(flatTree) {
	const candidates = findArrayDeclarationCandidates(flatTree);

	const isFound = candidates.some(c => {
	// A matching array would not have more than two reference to it
		if (c.id.references.length > 2) return false;
		return c.id.references.some(ref => functionHasMinimumRequiredReferences(ref, flatTree));
	});
	return isFound ? obfuscationName : '';
}

export {detectArrayFunctionReplacements};