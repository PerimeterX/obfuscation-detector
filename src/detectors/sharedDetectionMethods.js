/**
 * Shared detection methods used by multiple obfuscation detectors.
 * @module sharedDetectionMethods
 */

const minMeaningfulPercentageOfReferences = 2; // 2%
const minMeaningfulArrayContentLengthPercentage = 2; // 2%

/**
 * Checks if the number of array elements presents a meaningful percentage of all AST nodes.
 * @param {ASTNode[]} targetArray - The array elements to check.
 * @param {ASTNode[]} flatTree - The flattened AST.
 * @returns {boolean} True if the array is considered meaningful in length.
 */
function arrayHasMeaningfulContentLength(targetArray, flatTree) {
	return Math.floor(targetArray.length / (flatTree.length || 1) * 100) >= minMeaningfulArrayContentLengthPercentage;
}

/**
 * Finds variable declarators that are arrays with more than a few literal items.
 * @param {ASTNode[]} flatTree - The flattened AST.
 * @returns {ASTNode[]} Array declaration candidates.
 */
function findArrayDeclarationCandidates(flatTree) {
	return (flatTree[0].typeMap.VariableDeclarator || []).filter(n =>
		n?.init?.type === 'ArrayExpression' &&
		arrayHasMeaningfulContentLength(n.init.elements, flatTree) &&
		!n.init.elements.some(el => el.type !== 'Literal'));
}

/**
 * Checks if the target array has at least the minimum required references in the AST.
 * @param {ASTNode[]} references - References to the array.
 * @param {string} targetArrayName - The name of the array variable.
 * @param {ASTNode[]} flatTree - The flattened AST.
 * @returns {boolean} True if the array has enough references.
 */
function arrayHasMinimumRequiredReferences(references, targetArrayName, flatTree) {
	return references.filter(n =>
		n.type === 'MemberExpression' &&
		n.object.name === targetArrayName).length / (flatTree.length || 1) * 100 >= minMeaningfulPercentageOfReferences;
}

/**
 * Checks if an IIFE exists with the target array as one of its arguments.
 * @param {ASTNode[]} references - References to the array.
 * @param {string} targetArrayName - The name of the array variable.
 * @returns {ASTNode|null} The IIFE node if found, otherwise null.
 */
function arrayIsProvidedAsArgumentToIIFE(references, targetArrayName) {
	return references.find(n =>
		n.type === 'CallExpression' &&
		n.callee.type === 'FunctionExpression' &&
		n.arguments.some(arg => arg.name === targetArrayName)) || null;
}

/**
 * Checks if the minimum required references to the target function were found.
 * @param {ASTNode} reference - A reference node to the function.
 * @param {ASTNode[]} flatTree - The flattened AST.
 * @returns {boolean} True if the function has enough relevant references.
 */
function functionHasMinimumRequiredReferences(reference, flatTree) {
	const funcRef = reference.scope.block;
	const funcRefs = funcRef?.id?.references || funcRef?.parentNode?.id?.references;
	if (funcRefs?.length) {
		// References can be call expressions or right side of assignment expressions if proxied.
		let relevantRefs = funcRefs.filter(n =>
			(n.parentNode.type === 'CallExpression' &&
				n.parentNode.arguments.length &&
				n.parentKey === 'callee' &&
				!n.parentNode.arguments.some(a => a.type !== 'Literal')) ||
			(n.parentNode.type === 'AssignmentExpression' && n.parentKey === 'right') ||
			(n.parentNode.type === 'VariableDeclarator' && n.parentKey === 'init'));
		if (relevantRefs.length && relevantRefs[0].parentNode.type === 'VariableDeclarator') {
			relevantRefs = relevantRefs.map(r => r.parentNode.id.references).flat();
		}
		return relevantRefs.length / (flatTree.length || 1) * 100 >= minMeaningfulPercentageOfReferences;
	}
	return false;
}

export {
	arrayHasMinimumRequiredReferences,
	arrayIsProvidedAsArgumentToIIFE,
	findArrayDeclarationCandidates,
	functionHasMinimumRequiredReferences,
};