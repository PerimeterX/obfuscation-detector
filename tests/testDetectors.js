const fs = require('fs');
const assert = require('assert');
const detectObfuscation = require(__dirname + '/../src');

const targetFolder = 'tests/resources';
fs.readdirSync(targetFolder).forEach(f => {
	const filename = `${targetFolder}/${f}`;
	const expectedResult = f.split('.js')[0];
	const code = fs.readFileSync(filename, 'utf-8');
	const results = detectObfuscation(code, false);

	console.log(`Testing ${f} - [${results.join(', ')}]`);
	let bestMatch = '';
	results.forEach(res => {if (expectedResult.includes(res) && res.length > bestMatch.length) bestMatch = res;});

	assert.equal(!!bestMatch, true,
		`Failed to detect correct obfuscation type. ${results.length ? 'found ' + results.join(', ') : ''}`);
	console.log(`\tMatched ${bestMatch}`);
});