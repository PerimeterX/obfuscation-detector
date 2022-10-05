const obfuscationName = 'augmented_proxied_array_function_replacements';

/**
 * Augmented Proxied Array-Function Replacements obfuscation type has the following characteristics:
 * - Has at least 3 root nodes - the last one containing the actual obfuscated code and the rest are obfuscation code.
 * - Has a function that assigns an array full of strings to itself, and then returns itself.
 * - Has an anonymous IIFE that is called with the array function as one of its arguments.
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
 */
function detectAugmentedProxiedArrayFunctionReplacements(flatTree) {
	const roots = flatTree.filter(n => n.parentNode?.type === 'Program');
	if (roots.length > 3) {
		const arrFunc = roots.find(n => n.type === 'FunctionDeclaration' &&
			n.body?.body?.length &&
			n.body.body.slice(-1)[0]?.argument?.callee?.name === n?.id?.name);
		if (arrFunc) {
			const augFunc = roots.find(n => n.type === 'ExpressionStatement' &&
				n.expression.type === 'CallExpression' &&
				n.expression.arguments.find(a => a?.name === arrFunc.id.name));
			if (augFunc) {
				return obfuscationName;
			}
		}
	}
	return '';
}

try {
	module.exports = detectAugmentedProxiedArrayFunctionReplacements;
} catch {}