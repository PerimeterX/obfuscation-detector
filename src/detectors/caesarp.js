const obfuscationName = 'caesar_plus';

/**
 * @param {ASTNode} targetNode
 * @param {ASTNode} targetScopeBlock
 * @return {boolean} true if the target node is found in the targetScope; false otherwise.
 */
function isNodeInScope(targetNode, targetScopeBlock) {
	if (!targetScopeBlock) return true;
	let currentScope = targetNode.scope;
	while (currentScope) {
		if (targetScopeBlock === currentScope.block) return true;
		currentScope = currentScope.upper;
	}
	return false;
}

/**
 * Caesar Plus obfuscation type has the following characteristics:
 * - A function expression A with an id of 3 characters exists.
 * - Function A is wrapped in a call expressions without arguments.
 * - Function A contains the following identifiers:
 *   - window
 *   - document
 *   - String.fromCharCode
 *
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
 */
function detectCaesarPlus(flatTree) {
	// Verify the main function's name is 3 letters long and has maximum 1 reference;
	const candidates = (flatTree[0].typeMap.FunctionExpression || []).filter(n =>
		n.type === 'FunctionExpression' &&
		n?.id?.name?.length === 3 &&
		n?.parentNode?.type === 'CallExpression' && !n.parentNode.arguments.length);

	for (const c of candidates) {
		const funcTree = flatTree.filter(n => isNodeInScope(n, c.isScopeBlock ? c : c.scope.block));
		// Verify all variables are 3 letters long
		if (!funcTree.some(n => n.type === 'VariableDeclarator' &&
			n.id.name.length !== 3)) {
			// Verify that inside the function there are references to window, document and String.fromCharCode;
			if (funcTree.some(n => n.type === 'Identifier' && n.name === 'window') &&
				funcTree.some(n => n.type === 'Identifier' && n.name === 'document') &&
				funcTree.some(n => n.type === 'MemberExpression' &&
					n.object.type === 'Identifier' &&
					n.object.name === 'String' &&
					'fromCharCode' === (n.property.name || n.property.value))) return obfuscationName;
		}
	}
	return '';
}

export {detectCaesarPlus};
