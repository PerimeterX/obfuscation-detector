# Obfuscation Detector
[![Node.js CI](https://github.com/PerimeterX/obfuscation-detector/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/PerimeterX/obfuscation-detector/actions/workflows/node.js.yml)
[![Downloads](https://img.shields.io/npm/dm/obfuscation-detector.svg?maxAge=43200)](https://www.npmjs.com/package/obfuscation-detector)

## Overview
Obfuscation Detector is a tool for identifying different types of JavaScript obfuscation by analyzing the code's Abstract Syntax Tree (AST). It is designed for security researchers, reverse engineers, and developers who need to quickly determine if and how a JavaScript file has been obfuscated.

**Use Cases:**
- Automated analysis of suspicious or third-party JavaScript
- Security auditing and malware research
- Integration into CI/CD pipelines to flag obfuscated code
- Educational purposes for understanding obfuscation techniques

## How it Works
Obfuscation Detector parses JavaScript code into an AST using [flAST](https://www.npmjs.com/package/flast) and applies a series of modular detectors. Each detector looks for specific patterns or structures that are characteristic of known obfuscation techniques. The tool can return all matching types or just the most likely (best) match.

## Installation
```shell
npm install obfuscation-detector
```

## Usage
### As a Module
```javascript
import fs from 'node:fs';
import detectObfuscation from 'obfuscation-detector';

const code = fs.readFileSync('obfuscated.js', 'utf-8');
const bestMatch = detectObfuscation(code); // returns [bestMatch] or []
const allMatches = detectObfuscation(code, false); // returns all matches as an array
console.log(`Obfuscation type(s): ${allMatches.join(', ')}`);
```

### CLI
```shell
obfuscation-detector /path/to/obfuscated.js [--bestMatch|-b]
cat /path/to/obfuscated.js | obfuscation-detector [--bestMatch|-b]
obfuscation-detector --help
```

#### CLI Options
- `--bestMatch`, `-b`: Return only the first (most likely) detected obfuscation type.
- `--help`, `-h`: Show usage instructions.
- Unknown flags will result in an error and print the usage.

#### Examples
- **All matches:**
  ```shell
  $ obfuscation-detector /path/to/obfuscated.js
  [+] function_to_array_replacements, augmented_proxied_array_function_replacements
  ```
- **Best match only:**
  ```shell
  $ obfuscation-detector /path/to/obfuscated.js --bestMatch
  [+] function_to_array_replacements
  ```
- **From stdin:**
  ```shell
  $ cat obfuscated.js | obfuscation-detector -b
  [+] function_to_array_replacements
  ```

## API Reference
### `detectObfuscation(code: string, stopAfterFirst: boolean = true): string[]`
- **code**: JavaScript source code as a string.
- **stopAfterFirst**: If `true`, returns after the first positive detection (default). If `false`, returns all detected types.
- **Returns**: An array of detected obfuscation type names. Returns an empty array if no known type is detected.

## Supported Obfuscation Types
Descriptions and technical details for each type are available in [src/detectors/README.md](src/detectors/README.md):
- [Array Replacements](src/detectors/arrayReplacements.js)
- [Augmented Array Replacements](src/detectors/augmentedArrayReplacements.js)
- [Array Function Replacements](src/detectors/arrayFunctionReplacements.js)
- [Augmented Array Function Replacements](src/detectors/augmentedArrayFunctionReplacements.js)
- [Function To Array Replacements](src/detectors/functionToArrayReplacements.js)
- [Obfuscator.io](src/detectors/obfuscator-io.js)
- [Caesar Plus](src/detectors/caesarp.js)

## Troubleshooting
- **No obfuscation detected:** The code may not be obfuscated, or it uses an unknown technique. Consider contributing a new detector!
- **Error: File not found:** Check the file path and try again.
- **Unknown flag:** Run with only `--help` to see what options are available.
- **Performance issues:** For very large files, detection may take longer. Consider running with only the detectors you need (advanced usage).

## Contribution
To contribute to this project, see our [contribution guide](CONTRIBUTING.md).

---
For technical details on each obfuscation type and how to add new detectors, see [src/detectors/README.md](src/detectors/README.md).