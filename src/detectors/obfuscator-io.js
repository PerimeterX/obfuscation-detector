const obfuscationName = 'obfuscator.io';

function setCookieIndicator(flatTree) {
	const candidates = flatTree.filter(n =>
		n.type === 'ObjectExpression' &&
		n.properties.length &&
		n.properties.filter(p =>
			p.key.type === 'Literal' &&
			p.key.value === 'setCookie').length);

	if (candidates.length === 1) {
		const setCookieFunc = candidates[0].properties.filter(p =>
			p.key.type === 'Literal' &&
			p.key.value === 'setCookie')[0].value;
		if (setCookieFunc.type === 'FunctionExpression' &&
			setCookieFunc.body.body.filter(b => b.type === 'ForStatement').length) return true;
	}
	return false;
}

function notBooleanTilde(flatTree) {
	const candidates = flatTree.filter(n =>
		n.type === 'BlockStatement' &&
		n.body.length === 2 &&
		n.body[0].type === 'IfStatement' &&
		n.body[0].test?.type === 'UnaryExpression' &&
		n.body[1].type === 'ReturnStatement');
	for (const c of candidates) {
		/** @type {ASTNode} */
		const t = c.body[0].test;
		if (t.operator === '!' && t.argument?.callee?.name === 'Boolean' && t.argument.arguments?.length === 1 &&
			t.argument.arguments[0].type === 'UnaryExpression' && t.argument.arguments[0].operator === '~') return true;
	}
	return false;
}

/**
 * Obfuscator.io obfuscation type has the following characteristics:
 * - The same characteristics as an Augmented Array Function Replacements obfuscation type.
 * - An object expression A with a key of 'setCookie' exists.
 * - The value of object expression A is a function expression containing a for statement.
 *
 * @param {ASTNode[]} flatTree
 * @param {string[]} pdo A list of names of previously detected obfuscations
 * @return {string} The obfuscation name if detected; empty string otherwise.
 */
function detectObfuscatorIo(flatTree, pdo = []) {
	// Older version
	if (pdo.includes('augmented_array_function_replacements') && setCookieIndicator(flatTree)) return obfuscationName;
	// Newer version
	else if (notBooleanTilde(flatTree)) return obfuscationName;
	return '';
}

module.exports = detectObfuscatorIo;
