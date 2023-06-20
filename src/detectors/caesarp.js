const obfuscationName = 'caesar_plus';

/**
 * @param {ASTNode} targetNode
 * @param {Scope} targetScope
 * @return {boolean} true if the target node is found in the targetScope; false otherwise.
 */
function isNodeInScope(targetNode, targetScope) {
	if (!targetScope) return true;
	let currentScope = targetNode.scope;
	while (currentScope.scopeId) {
		if (targetScope === currentScope.scopeId) return true;
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
	const candidates = flatTree.filter(n =>
		n.type === 'FunctionExpression' &&
		n.id && n.id.name.length === 3 &&
		n.parentNode && n.parentNode.type === 'CallExpression' && !n.parentNode.arguments.length);

	for (const c of candidates) {
		const funcTree = flatTree.filter(n => isNodeInScope(n, c.scope.scopeId));
		// Verify all variables are 3 letters long
		if (!funcTree.filter(n => n.type === 'VariableDeclarator' &&
			n.id.name.length !== 3).length) {
			// Verify that inside the function there are references to window, document and String.fromCharCode;
			if (funcTree.filter(n => n.type === 'Identifier' && n.name === 'window').length &&
				funcTree.filter(n => n.type === 'Identifier' && n.name === 'document').length &&
				funcTree.filter(n => n.type === 'MemberExpression' &&
					n.object.type === 'Identifier' &&
					n.object.name === 'String' && [n.property.name, n.property.value].includes('fromCharCode')).length) return obfuscationName;
		}
	}
	return '';
}

module.exports = detectCaesarPlus;
