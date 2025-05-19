import {findArrayDeclarationCandidates, functionHasMinimumRequiredReferences} from './sharedDetectionMethods.js';

const obfuscationName = 'array_function_replacements';

/**
 * Detects the Array-Function Replacements obfuscation type.
 *
 * Characteristics:
 * - An array (A) with many strings is defined.
 * - A function (B) that returns a single value from the array A, based on provided arguments is present.
 * - There are many call expressions to function B, with only literals as arguments.
 * - There are no more than 2 references to array A.
 *
 * @param {ASTNode[]} flatTree - The flattened AST of the code.
 * @returns {string} The obfuscation name if detected; otherwise, an empty string.
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