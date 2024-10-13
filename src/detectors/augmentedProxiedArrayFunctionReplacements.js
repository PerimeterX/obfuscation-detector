const obfuscationName = 'augmented_proxied_array_function_replacements';

/**
 * @param {ASTNode} node
 * @param {string} refName
 * @return {boolean}
 */
function isCallExpressionWithNamedReferenceArgument(node, refName) {
	return node?.type === 'CallExpression' && (node.arguments|| []).some(a => a?.name === refName);
}

/**
 * Augmented Proxied Array-Function Replacements obfuscation type has the following characteristics:
 * - Has at least 3 root nodes - the last one containing the actual obfuscated code and the rest are obfuscation code.
 * - Has a function that assigns an array full of strings to itself, and then returns itself.
 * - Has an anonymous IIFE that is called with the array function as one of its arguments.
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
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
