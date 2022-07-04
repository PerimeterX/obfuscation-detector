// noinspection JSValidateJSDoc,JSUnusedGlobalSymbols

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
	return ((targetArray || []).length || 0) / flatTree.length * 100 >= minMeaningfulArrayContentLegthPercentage;
}

/**
 * @param {ASTNode[]} flatTree
 * @return {ASTNode[]} Candidates matching the target profile of an array with more than a few items, all literals.
 */
function findArrayDeclarationCandidates(flatTree) {
	return flatTree.filter(n => n.type === 'VariableDeclarator' && n.init && n.init.type === 'ArrayExpression' && arrayHasMeaningfulContentLength(n.init.elements, flatTree) && n.init.elements.filter(el => el.type !== 'Literal'));
}

/**
 * @param {ASTNode[]} references
 * @param {ASTNode} targetArray
 * @param {ASTNode[]} flatTree
 * @return {boolean} true if the target array has at least the minimum required references; false otherwise.
 */
function arrayHasMinimumRequiredReferences(references, targetArray, flatTree) {
	return references.filter(n => n.type === 'MemberExpression' && n.object.name === targetArray.id.name).length / flatTree.length * 100 >= minMeaningfulPercentageOfReferences;
}

/**
 * @param {ASTNode[]} references
 * @param {ASTNode} targetArray
 * @return {boolean} true if an IIFE with the target array as one of its arguments exists; false otherwise.
 */
function arrayIsProvidedAsArgumentToIIFE(references, targetArray) {
	return !!references.filter(n => n.type === 'CallExpression' && n.callee.type === 'FunctionExpression' && n.arguments.filter(arg => arg.name === targetArray.id.name).length).length;
}

/**
 * @param {ASTNode} reference
 * @param {ASTNode[]} flatTree
 * @return {boolean} true if the minimum required references to the target function were found; false otherwise.
 */
function functionHasMinimumRequiredReferences(reference, flatTree) {
	const funcRef = reference.scope.block;
	const funcIdentifier = funcRef.id ? funcRef.id : funcRef.parentNode ? funcRef.parentNode.id : null;
	if (funcIdentifier) {
		// References can be call expressions or right side of assignement expressions if proxied.
		const funcReferences = funcIdentifier.references
			.filter(n => (
				n.parentNode.type === 'CallExpression' &&
				n.parentNode.arguments.length &&
				n.parentNode.callee.nodeId === n.nodeId &&
				!n.parentNode.arguments.filter(a => a.type !== 'Literal').length) ||
				(n.parentNode.type === 'AssignmentExpression' && n.parentNode.right.nodeId === n.nodeId) ||
				(n.parentNode.type === 'VariableDeclarator' && n.parentNode.init.nodeId === n.nodeId));
		const relevantReferences = (funcReferences.length && funcReferences[0].parentNode.type === 'VariableDeclarator') ? funcReferences.map(r => r.parentNode.id.references).flat() : funcReferences;
		return relevantReferences.length / flatTree.length * 100 >= minMeaningfulPercentageOfReferences;
	}
}

try {
	module.exports = {
		findArrayDeclarationCandidates,
		arrayHasMinimumRequiredReferences,
		functionHasMinimumRequiredReferences,
		arrayIsProvidedAsArgumentToIIFE,
	};
} catch {}