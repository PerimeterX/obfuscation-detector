/**
 * Shared code used by more than one detector.
 */

const minMeaningfulPercentageOfReferences = 2; // 2%
const minMeaningfulArrayContentLegthPercentage = 2; // 2%

/**
 * @param {ASTNode[]} targetArray
 * @param {ASTNode[]} flatTree
 * @return {boolean} Whether the number of array elements presents a meaningful percentage of all nodes.
 */
function arrayHasMeaningfulContentLength(targetArray, flatTree) {
	return targetArray.length / flatTree.length * 100 >= minMeaningfulArrayContentLegthPercentage;
}

/**
 * @param {ASTNode[]} flatTree
 * @return {ASTNode[]} Candidates matching the target profile of an array with more than a few items, all literals.
 */
function findArrayDeclarationCandidates(flatTree) {
	return (flatTree[0].typeMap.VariableDeclarator || []).filter(n =>
		n.type === 'VariableDeclarator' &&
		n?.init?.type === 'ArrayExpression' &&
		arrayHasMeaningfulContentLength(n.init.elements, flatTree) &&
		!n.init.elements.some(el => el.type !== 'Literal'));
}

/**
 * @param {ASTNode[]} references
 * @param {string} targetArrayName
 * @param {ASTNode[]} flatTree
 * @return {boolean} true if the target array has at least the minimum required references; false otherwise.
 */
function arrayHasMinimumRequiredReferences(references, targetArrayName, flatTree) {
	return references.filter(n =>
		n.type === 'MemberExpression' &&
		n.object.name === targetArrayName).length / flatTree.length * 100 >= minMeaningfulPercentageOfReferences;
}

/**
 * @param {ASTNode[]} references
 * @param {string} targetArrayName
 * @return {boolean} true if an IIFE with the target array as one of its arguments exists; false otherwise.
 */
function arrayIsProvidedAsArgumentToIIFE(references, targetArrayName) {
	return references.some(n =>
		n.type === 'CallExpression' &&
		n.callee.type === 'FunctionExpression' &&
		n.arguments.some(arg => arg.name === targetArrayName));
}

/**
 * @param {ASTNode} reference
 * @param {ASTNode[]} flatTree
 * @return {boolean} true if the minimum required references to the target function were found; false otherwise.
 */
function functionHasMinimumRequiredReferences(reference, flatTree) {
	const funcRef = reference.scope.block;
	const funcRefs = funcRef?.id?.references || funcRef?.parentNode?.id?.references;
	if (funcRefs?.length) {
		// References can be call expressions or right side of assignement expressions if proxied.
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
		return relevantRefs.length / flatTree.length * 100 >= minMeaningfulPercentageOfReferences;
	}
}

export {
	arrayHasMinimumRequiredReferences,
	arrayIsProvidedAsArgumentToIIFE,
	findArrayDeclarationCandidates,
	functionHasMinimumRequiredReferences,
};
