const obfuscationName = 'caesar_plus';

/**
 * Checks if a target AST node is within a given scope block.
 * @param {ASTNode} targetNode - The node to check.
 * @param {ASTNode} targetScopeBlock - The scope block to check against.
 * @returns {boolean} True if the node is in the scope; otherwise, false.
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
 * Detects the Caesar Plus obfuscation type.
 *
 * Characteristics:
 * - A function expression A with an id of 3 characters exists.
 * - Function A is wrapped in a call expression without arguments.
 * - Function A contains the following identifiers: window, document, String.fromCharCode.
 *
 * @param {ASTNode[]} flatTree - The flattened AST of the code.
 * @returns {string} The obfuscation name if detected; otherwise, an empty string.
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