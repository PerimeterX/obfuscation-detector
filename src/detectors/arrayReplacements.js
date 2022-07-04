// noinspection JSValidateJSDoc

const {findArrayDeclarationCandidates, arrayHasMinimumRequiredReferences} = require(__dirname + '/sharedDetectionMethods');

const obfuscationName = 'array_replacements';

/**
 * Array Replacements obfuscation type has the following characteristics:
 * - An array (A) is with many strings is defined.
 * - There are many member expression references where the object is array A.
 *
 * @param {ASTNode[]} flatTree
 * @return {string} The obfuscation name if detected; empty string otherwise.
 */
function detectArrayReplacements(flatTree) {
	const candidates = findArrayDeclarationCandidates(flatTree);

	for (const c of candidates) {
		const refs = c.id.references.map(n => n.parentNode);
		if (arrayHasMinimumRequiredReferences(refs, c, flatTree)) return obfuscationName;
	}
	return '';
}

try {
	module.exports = detectArrayReplacements;
} catch {}