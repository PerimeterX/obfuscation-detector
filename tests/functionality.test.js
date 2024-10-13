import assert from 'node:assert';
import {describe, it} from 'node:test';
import {detectObfuscation} from '../src/index.js';

describe('Functionality', () => {
	it('Invalid input should not throw an error', () => {
		assert.doesNotThrow(() => detectObfuscation(Error, false), 'Invalid input should not throw an error');
	});
	it('Invalid input should return an empty array', () => {
		assert.deepStrictEqual(detectObfuscation(Object, false), [], 'Invalid input does not return an empty array');
	});
});