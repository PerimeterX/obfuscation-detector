const obfuscationName = 'obfuscator.io';

/**
 * Checks if an object expression with a 'setCookie' key and a function containing a for statement exists.
 * @param {ASTNode[]} flatTree - The flattened AST of the code.
 * @returns {boolean} True if the pattern is found.
 */
function setCookieIndicator(flatTree) {
	const candidate = (flatTree[0].typeMap.ObjectExpression || []).find(n =>
		n.type === 'ObjectExpression' &&
		n.properties.length &&
		n.properties.some(p =>
			p.key.type === 'Literal' &&
			p.key.value === 'setCookie'));

	if (candidate) {
		const setCookieFunc = candidate.properties.find(p =>
			p.key.type === 'Literal' &&
			p.key.value === 'setCookie')?.value;
		if (setCookieFunc?.type === 'FunctionExpression' &&
			setCookieFunc.body.body.some(b => b.type === 'ForStatement')) return true;
	}
	return false;
}

/**
 * Checks for a specific Boolean tilde pattern in the AST.
 * @param {ASTNode[]} flatTree - The flattened AST of the code.
 * @returns {boolean} True if the pattern is found.
 */
function notBooleanTilde(flatTree) {
	const candidates = (flatTree[0].typeMap.BlockStatement || []).filter(n =>
		n.type === 'BlockStatement' &&
		n.body.length === 2 &&
		n.body[0].type === 'IfStatement' &&
		n.body[0].test?.type === 'UnaryExpression' &&
		n.body[1].type === 'ReturnStatement');

	for (const c of candidates) {
		/** @type {ASTNode} */
		const t = c.body[0].test;
		if (t.operator === '!' &&
			t.argument?.callee?.name === 'Boolean' &&
			t.argument.arguments?.length === 1 &&
			t.argument.arguments[0].type === 'UnaryExpression' &&
			t.argument.arguments[0].operator === '~') return true;
	}
	return false;
}

/**
 * Detects the Obfuscator.io obfuscation type.
 *
 * Characteristics:
 * - The same characteristics as an Augmented Array Function Replacements obfuscation type.
 * - An object expression A with a key of 'setCookie' exists.
 * - The value of object expression A is a function expression containing a for statement.
 *
 * @param {ASTNode[]} flatTree - The flattened AST of the code.
 * @param {string[]} [pdo=[]] - A list of names of previously detected obfuscations.
 * @returns {string} The obfuscation name if detected; otherwise, an empty string.
 */
function detectObfuscatorIo(flatTree, pdo = []) {
	return (pdo.includes('augmented_array_function_replacements') && setCookieIndicator(flatTree)) ||
		notBooleanTilde(flatTree) ? obfuscationName : '';
}

export {detectObfuscatorIo};