import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import {describe, it} from 'node:test';
import {fileURLToPath} from 'node:url';
import {detectObfuscation} from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetFolder = path.join(__dirname, 'resources');

describe('Detectors tests', () => {
	fs.readdirSync(targetFolder).forEach(f => {
		const filename = `${targetFolder}/${f}`;
		const expectedResult = f.split('.js')[0];
		const code = fs.readFileSync(filename, 'utf-8');
		it(expectedResult, () => {
			const results = detectObfuscation(code, false);
			let bestMatch = '';
			results.forEach(res => {if (expectedResult.includes(res) && res.length > bestMatch.length) bestMatch = res;});
			assert.ok(!!bestMatch, `Failed to detect "${expectedResult}" in ${filename}. ${results.length ? 'Detected "' + results.join(', ') + '"' : ''}`);
		});
	});
});