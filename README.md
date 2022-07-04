# Obfuscation Detector
Detect different types of JS obfuscation by their AST structure.

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