#!/usr/bin/env node
import fs from 'node:fs';
import {detectObfuscation} from './../src/index.js';

function printUsage() {
	console.log('Usage: obfuscation-detector /path/to/obfuscated.js [--bestMatch|-b]');
	console.log('       obfuscation-detector < file.js [--bestMatch|-b]');
	console.log('       obfuscation-detector --help|-h');
}

const args = process.argv.slice(2);
const allowedFlags = new Set(['--help', '-h', '--bestMatch', '-b']);

// Check for unknown flags
const unknownFlags = args.filter(arg => arg.startsWith('-') && !allowedFlags.has(arg));
if (unknownFlags.length) {
	console.error(`[-] Unknown flag(s): ${unknownFlags.join(', ')}`);
	printUsage();
	process.exit(1);
}

if (args.includes('--help') || args.includes('-h')) {
	printUsage();
	process.exit(0);
}

try {
	let content = '';
	// Default: show all matches unless --bestMatch or -b is present
	let stopAfterFirst = args.includes('--bestMatch') || args.includes('-b');

	// Remove flags from file argument
	const fileArg = args.find(arg => !arg.startsWith('-'));

	if (fileArg) {
		if (!fs.existsSync(fileArg)) {
			console.error(`[-] File not found: ${fileArg}`);
			printUsage();
			process.exit(1);
		}
		content = fs.readFileSync(fileArg, 'utf-8');
	} else if (!process.stdin.isTTY) {
		content = fs.readFileSync(0, 'utf-8');
	} else {
		printUsage();
		process.exit(1);
	}

	const obfuscationType = detectObfuscation(content, stopAfterFirst);
	if (obfuscationType.length) console.log('[+] ' + obfuscationType.join(', '));
	else console.log('[-] No obfuscation detected / unknown obfuscation');
} catch (e) {
	console.error(`[X] Critical Error: ${e.message}`);
	process.exit(1);
}
