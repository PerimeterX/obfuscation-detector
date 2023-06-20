const fs = require('node:fs');
const assert = require('node:assert');
const detectObfuscation = require(__dirname + '/../src');

function testCode(testName, code, expectedResult) {
	const timeName = `\tCompleted in `;
	console.log(`Test ${testName}`);
	console.time(timeName);

	const results = detectObfuscation(code, false);

	let bestMatch = '';
	results.forEach(res => {if (expectedResult.includes(res) && res.length > bestMatch.length) bestMatch = res;});
	assert.equal(!!bestMatch, true,	`Failed to detect "${expectedResult}". ${results.length ? 'Detected "' + results.join(', ') + '"' : ''}`);
	results[results.indexOf(bestMatch)] = `[${bestMatch}]`;
	console.log(`\t${results.join('\n\t')}`);
	console.timeEnd(timeName);
}

// Test samples
const targetFolder = 'tests/resources';
console.time('Completed running tests in ');
fs.readdirSync(targetFolder).forEach(f => {
	const filename = `${targetFolder}/${f}`;
	const expectedResult = f.split('.js')[0];
	const code = fs.readFileSync(filename, 'utf-8');
	testCode(expectedResult, code, expectedResult);
});
console.timeEnd('Completed running tests in ');