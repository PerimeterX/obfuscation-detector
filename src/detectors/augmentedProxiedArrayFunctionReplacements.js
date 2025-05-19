const obfuscationName = 'augmented_proxied_array_function_replacements';

/**
 * Checks if a node is a call expression with a named reference argument.
 * @param {ASTNode} node - The AST node to check.
 * @param {string} refName - The reference name to look for in arguments.
 * @returns {boolean} True if the node is a call expression with the named argument.
 */
function isCallExpressionWithNamedReferenceArgument(node, refName) {
	return node?.type === 'CallExpression' && (node.arguments|| []).some(a => a?.name === refName);
}

/**
 * Detects the Augmented Proxied Array-Function Replacements obfuscation type.
 *
 * Characteristics:
 * - Has at least 3 root nodes - the last one containing the actual obfuscated code and the rest are obfuscation code.
 * - Has a function that assigns an array full of strings to itself, and then returns itself.
 * - Has an anonymous IIFE that is called with the array function as one of its arguments.
 *
 * @param {ASTNode[]} flatTree - The flattened AST of the code.
 * @returns {string} The obfuscation name if detected; otherwise, an empty string.
 */
function detectAugmentedProxiedArrayFunctionReplacements(flatTree) {
	const roots = flatTree[0].childNodes;
	if (roots.length >= 3) {
		const arrFunc = roots.find(n =>
			n.body?.body?.length &&
			n.body.body.slice(-1)[0]?.argument?.callee?.name === n?.id?.name &&
			n.type === 'FunctionDeclaration');

		if (arrFunc) {
			const arrFuncName = arrFunc.id.name;
			if (roots.some(n =>
				n.type === 'ExpressionStatement' &&
				(isCallExpressionWithNamedReferenceArgument(n.expression, arrFuncName) ||
					n.expression.type === 'SequenceExpression' &&
					isCallExpressionWithNamedReferenceArgument(n.expression.expressions[0], arrFuncName))
			)) return obfuscationName;
		}
	}
	return '';
}

export {detectAugmentedProxiedArrayFunctionReplacements};