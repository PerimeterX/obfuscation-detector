#!/usr/bin/env node
const fs = require('node:fs');
const detectObfuscation = require(__dirname + '/../src');

if (require.main === module) {
	try {
		const args = process.argv.slice(2);
		if (args.length) {
			let content = fs.readFileSync(args[0], 'utf-8');
			const stopAfterFirst = !!args[1];
			const obfuscationType = detectObfuscation(content, stopAfterFirst);
			if (obfuscationType.length) console.log('[+] ' + obfuscationType.join(', '));
			else console.log('[-] No obfuscation detected / unknown obfuscation');
		} else console.log('Usage: obfuscation-detector /path/to/obfuscated.js [stopAfterFirst]');
	} catch (e) {
		console.error(`[X] Critical Error: ${e.message}`);
	}
}
