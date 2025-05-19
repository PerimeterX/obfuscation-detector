# Obfuscation Detector
[![Node.js CI](https://github.com/PerimeterX/obfuscation-detector/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/PerimeterX/obfuscation-detector/actions/workflows/node.js.yml)
[![Downloads](https://img.shields.io/npm/dm/obfuscation-detector.svg?maxAge=43200)](https://www.npmjs.com/package/obfuscation-detector)

Detect different types of JS obfuscation by their AST structure.

## Installation
`npm install obfuscation-detector`

## Usage
### Module
```javascript
import fs from 'node:fs';
import detectObfuscation from 'obfuscation-detector';

const code = fs.readFileSync('obfuscated.js', 'utf-8');
const most_likely_obfuscation_type = detectObfuscation(code);
// const all_matching_obfuscation_types = detectObfuscation(code, false);
console.log(`Obfuscation type is probably ${most_likely_obfuscation_type}`);
```

### CLI
```bash
obfuscation-detector /path/to/obfuscated.js [--bestMatch|-b]
cat /path/to/obfuscated.js | obfuscation-detector [--bestMatch|-b]
obfuscation-detector --help
```

- By default, all matching obfuscation types for a file are returned:
```bash
$ obfuscation-detector /path/to/obfuscated.js
[+] function_to_array_replacements, augmented_proxied_array_function_replacements
```

- To get just the first (best) match, use the `--bestMatch` or `-b` flag:
```bash
$ obfuscation-detector /path/to/obfuscated.js --bestMatch
[+] function_to_array_replacements
```

- The `--help` or `-h` flag prints usage instructions.
- Unknown flags will result in an error and print the usage.

## Supported Obfuscation Types
You can find descriptions of the different types in the code itself, and more info [here](src/detectors/README.md). 
- [Array Replacements](src/detectors/arrayReplacements.js)
- [Augmented Array Replacements](src/detectors/augmentedArrayReplacements.js)
- [Array Function Replacements](src/detectors/arrayFunctionReplacements.js)
- [Augmented Array Function Replacements](src/detectors/augmentedArrayFunctionReplacements.js)
- [Function To Array Replacements](src/detectors/functionToArrayReplacements.js)
- [Obfuscator.io](src/detectors/obfuscator-io.js)
- [Caesar Plus](src/detectors/caesarp.js)

## Contribution
To contribute to this project see our [contribution guide](CONTRIBUTING.md)