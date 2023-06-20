const obfuscationName = 'function_to_array_replacements';

/**
 * Function To Array obfuscation type has the following characteristics:
 * - A variable A assigned to a call expression with a function for a callee.
 * - All references to variable A are objects of member expressions.
 *
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
 */
function detectFunctionToArrayReplacemets(flatTree) {
	return flatTree.filter(n =>
		n.type === 'VariableDeclarator' &&
		n.init && n.init.type === 'CallExpression' &&
		/function/i.test(n.init.callee.type) &&
		n.id && n.id.references &&
		n.id.references.filter(r =>
			r.parentNode.type === 'MemberExpression' &&
			r.parentKey === 'object').length === n.id.references.length)
		.length ? obfuscationName : '';
}

module.exports = detectFunctionToArrayReplacemets;
