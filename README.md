# Obfuscation Detector
Detect different types of JS obfuscation by their AST structure.

## Installation
`npm install obfuscation-detector`

## Usage
```javascript
const fs = ('fs');
const detectObfuscation = require('obfuscation-detector');

const code = fs.readFileSync('obfuscated.js', 'utf-8');
// const all_matching_obfuscation_types = detectObfuscation(code, false);
const most_likely_obfuscation_type = detectObfuscation(code);
console.log(`Obfuscation type is probably ${most_likely_obfuscation_type}`);
```

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