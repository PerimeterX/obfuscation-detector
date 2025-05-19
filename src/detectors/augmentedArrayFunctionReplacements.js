import {arrayIsProvidedAsArgumentToIIFE, findArrayDeclarationCandidates, functionHasMinimumRequiredReferences} from './sharedDetectionMethods.js';

const obfuscationName = 'augmented_array_function_replacements';

/**
 * Detects the Augmented Array-Function Replacements obfuscation type.
 *
 * Characteristics:
 * - The same characteristics as an Array-Function Replacements obfuscation type.
 * - An IIFE with a reference to Array A as one of its arguments.
 *
 * @param {ASTNode[]} flatTree - The flattened AST of the code.
 * @returns {string} The obfuscation name if detected; otherwise, an empty string.
 */
function detectAugmentedArrayFunctionReplacements(flatTree) {
	const candidates = findArrayDeclarationCandidates(flatTree);

	const isFound = candidates.some(c => {
		if (c.id.references.length > 2) return false;
		const refs = c.id.references.map(n => n.parentNode);
		const iife = arrayIsProvidedAsArgumentToIIFE(refs, c.id.name);
		if (!iife) return false;
		const relevantFunc = c.id.references.find(ref => ref.parentKey === 'arguments' &&
			ref.parentNode?.type === 'CallExpression' &&
			ref.parentNode.callee.type === 'FunctionExpression')?.parentNode;
		return functionHasMinimumRequiredReferences(relevantFunc, flatTree);
	});
	return isFound ? obfuscationName : '';
}

export {detectAugmentedArrayFunctionReplacements};