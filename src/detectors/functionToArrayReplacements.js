const obfuscationName = 'function_to_array_replacements';

/**
 * Detects the Function To Array Replacements obfuscation type.
 *
 * Characteristics:
 * - A variable A assigned to a call expression with a function for a callee.
 * - All references to variable A are objects of member expressions.
 *
 * @param {ASTNode[]} flatTree - The flattened AST of the code.
 * @returns {string} The obfuscation name if detected; otherwise, an empty string.
 */
function detectFunctionToArrayReplacements(flatTree) {
	return (flatTree[0].typeMap.VariableDeclarator || []).some(n =>
		n.type === 'VariableDeclarator' &&
		n?.init?.callee?.type?.indexOf('unction') > -1 &&
		n?.id?.references?.length &&
		!n.id.references.some(r =>
			!(r.parentNode.type === 'MemberExpression' &&
			r.parentKey === 'object'))) ? obfuscationName : '';
}

export {detectFunctionToArrayReplacements};