# Obfuscation Types

* [Obfuscator.io](#obfuscatorio)
  * [Debug Protection Explained](#debug-protection-explained)

## Obfuscator.io

This is [a free online JS obfuscation tool](https://obfuscator.io/) which includes features to hinder reversing and debugging the code.
This tool is still being updated, and not all of its features are currently covered by this deobfuscator.

One of the features is debug protection which is implemented by two regex checks that verify if trap functions
in the code have been beautified, as one would do when investigating the code.
These traps, when triggered, may result in endless loops, overflowing the process memory until the process hangs/crashes.

The way to solve the problem was to replace the two trap functions with a static string which satisfies the test condition.

Once these traps are deactivated, the rest of the script can be deobfuscated via the [augmented function array]()
deobfuscation, and other generic deobfuscation methods.

More research into this tool is required, to learn more of its obfuscation methods and develop counter measures.

### Debug Protection Explained
```javascript
var _ya = ['\x59\x32\x68\x68\x61\x57\x34\x3d', '\x5a\x47\x56\x69\x64\x51\x3d\x3d', '\x5a\x56\x42\x51\x62\x6c\x51\x3d', '\x5a\x32\x64\x6c\x63\x67\x3d\x3d', '\x59\x32\x39\x75\x63\x33\x52\x79\x64\x57\x4e\x30\x62\x33\x49\x3d', '\x64\x57\x31\x6f\x54\x56\x49\x3d', '\x59\x57\x4e\x30\x61\x57\x39\x75', '\x64\x32\x68\x70\x62\x47\x55\x67\x4b\x48\x52\x79\x64\x57\x55\x70\x49\x48\x74\x39', '\x54\x6d\x46\x6b\x57\x47\x51\x3d', '\x5a\x32\x56\x30\x55\x58\x56\x6c\x64\x57\x55\x3d', '\x55\x57\x68\x6c\x5a\x57\x38\x3d', '\x59\x32\x46\x77\x64\x47\x4e\x6f\x59\x56\x46\x31\x5a\x58\x56\x6c', '\x62\x48\x42\x6d\x53\x47\x55\x3d', '\x63\x33\x52\x79\x61\x57\x35\x6e', '\x59\x32\x39\x74\x63\x47\x6c\x73\x5a\x51\x3d\x3d', '\x61\x57\x35\x77\x64\x58\x51\x3d', '\x59\x32\x46\x73\x62\x41\x3d\x3d', '\x64\x45\x70\x4d\x51\x33\x67\x3d', '\x5a\x58\x46\x45\x57\x6d\x38\x3d', '\x64\x47\x56\x7a\x64\x41\x3d\x3d', '\x5a\x32\x56\x30\x54\x47\x46\x30\x5a\x58\x4e\x30\x52\x57\x78\x6c\x62\x57\x56\x75\x64\x41\x3d\x3d', '\x59\x30\x78\x4c\x52\x30\x73\x3d', '\x58\x43\x74\x63\x4b\x79\x41\x71\x4b\x44\x38\x36\x57\x32\x45\x74\x65\x6b\x45\x74\x57\x6c\x38\x6b\x58\x56\x73\x77\x4c\x54\x6c\x68\x4c\x58\x70\x42\x4c\x56\x70\x66\x4a\x46\x30\x71\x4b\x51\x3d\x3d', '\x62\x47\x56\x75\x5a\x33\x52\x6f', '\x64\x6b\x39\x58\x5a\x47\x77\x3d', '\x5a\x58\x68\x77\x62\x33\x4a\x30\x63\x77\x3d\x3d', '\x54\x32\x78\x46\x57\x56\x67\x3d', '\x59\x32\x39\x31\x62\x6e\x52\x6c\x63\x67\x3d\x3d', '\x62\x45\x4a\x61\x63\x58\x49\x3d', '\x59\x57\x52\x6b', '\x62\x6c\x46\x54\x5a\x55\x30\x3d', '\x59\x57\x78\x53\x51\x55\x6f\x3d', '\x5a\x57\x52\x61\x53\x45\x34\x3d', '\x5a\x6e\x56\x75\x59\x33\x52\x70\x62\x32\x34\x67\x4b\x6c\x77\x6f\x49\x43\x70\x63\x4b\x51\x3d\x3d', '\x59\x58\x42\x77\x62\x48\x6b\x3d', '\x57\x57\x78\x6f\x64\x6d\x51\x3d', '\x53\x6e\x4a\x57\x63\x46\x41\x3d', '\x51\x58\x70\x45\x54\x55\x63\x3d', '\x63\x33\x52\x68\x64\x47\x56\x50\x59\x6d\x70\x6c\x59\x33\x51\x3d', '\x63\x33\x42\x73\x61\x57\x4e\x6c', '\x52\x48\x52\x6d\x61\x6b\x49\x3d', '\x61\x57\x35\x70\x64\x41\x3d\x3d', '\x58\x69\x68\x62\x58\x69\x42\x64\x4b\x79\x67\x67\x4b\x31\x74\x65\x49\x46\x30\x72\x4b\x53\x73\x70\x4b\x31\x74\x65\x49\x46\x31\x39', '\x53\x6b\x35\x46\x62\x46\x6f\x3d', '\x63\x48\x56\x7a\x61\x41\x3d\x3d', '\x63\x6d\x56\x30\x64\x58\x4a\x75\x49\x43\x38\x69\x49\x43\x73\x67\x64\x47\x68\x70\x63\x79\x41\x72\x49\x43\x49\x76', '\x59\x6d\x5a\x78\x63\x56\x45\x3d', '\x5a\x47\x56\x73\x5a\x58\x52\x6c', '\x61\x47\x46\x7a\x55\x58\x56\x6c\x64\x57\x55\x3d', '\x52\x45\x31\x45\x62\x31\x45\x3d'];
    (function (a, seedNumber) {
        var shiftArray = function (numberOfShifts) {
            while (--numberOfShifts) {
                a['push'](a['shift']());
            }
        };
        var shiftArrayIfScriptNotBeautified = function () {
            var e = {
                'data': {
                    'key': 'cookie',
                    'value': 'timeout'
                },
                'setCookie': function (stringsArray, valueName, numericValue, obj) {
                    obj = obj || {};
                    var keyValuePair = valueName + '=' + numericValue;
                    var unusedCounter = 0x0;
                    for (var loopIndex = 0x0, lengthOfStringArray = stringsArray['length']; loopIndex < lengthOfStringArray; loopIndex++) {
                        var valueAtIndex = stringsArray[loopIndex];
                        if (valueAtIndex) {
                            keyValuePair += ';\x20' + valueAtIndex;
                            var falsyValue = stringsArray[valueAtIndex];
                            stringsArray['push'](falsyValue);
                            lengthOfStringArray = stringsArray['length'];
                            if (falsyValue !== !![]) {
                                keyValuePair += '=' + falsyValue;
                            }
                        }
                    }
                    obj['cookie'] = keyValuePair;
                },
                'removeCookie': function () {return 'dev';},
                'getCookie': function (meaninglessFunctionWrapper, valueName) {
                    meaninglessFunctionWrapper = meaninglessFunctionWrapper || function (unchangedValue) {
                        return unchangedValue;
                    };
                    var extractedCookieValue = meaninglessFunctionWrapper(new RegExp('(?:^|;\x20)' + valueName['replace'](/([.$?*|{}()[]\/+^])/g, '$1') + '=([^;]*)'));
                    var runFuncWithAdvancedCounter = function (funcToRun, counter) {
                        funcToRun(++counter);
                    };
                    runFuncWithAdvancedCounter(shiftArray, seedNumber);
                    return extractedCookieValue ? decodeURIComponent(extractedCookieValue[0x1]) : undefined;
                }
            };
            var isScriptBeautified = function () {
                var unbeautifiedFuncRegex = new RegExp("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}");
                return unbeautifiedFuncRegex['test'](e['removeCookie']['toString']());
            };
            e['updateCookie'] = isScriptBeautified;
            var extractedCookieValue = '';
            var scriptIsNotBeautified = e['updateCookie']();
            if (!scriptIsNotBeautified) {
                e['setCookie'](['*'], 'counter', 0x1);
            } else if (scriptIsNotBeautified) {
                extractedCookieValue = e['getCookie'](null, 'counter');
            } else {    // This is never reached
                e['removeCookie']();
            }
        };
        shiftArrayIfScriptNotBeautified();
    }(_ya, 0x10a));


    var _yb = function (numericValue, b) {
        numericValue = numericValue - 0x0;
        var valueFromArr = _ya[numericValue];
        if (_yb['alwaysTrue'] === undefined) {
            (function () {
                var getWindowObject = function () {
                    var h;
                    try {
                        h = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();
                    } catch (i) {
                        h = window;
                    }
                    return h;
                };
                var f = getWindowObject();
                var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                f['atob'] || (f['atob'] = function (h) {
                    var i = String(h)['replace'](/=+$/, '');
                    var j = '';
                    for (var k = 0x0, l, m, n = 0x0; m = i['charAt'](n++); ~m && (l = k % 0x4 ? l * 0x40 + m : m, k++ % 0x4) ? j += String['fromCharCode'](0xff & l >> (-0x2 * k & 0x6)) : 0x0) {
                        m = base64Chars['indexOf'](m);
                    }
                    return j;
                });
            }());
            _yb['decodeString'] = function (e) {
                var f = atob(e);
                var g = [];
                for (var h = 0x0, j = f['length']; h < j; h++) {
                    g += '%' + ('00' + f['charCodeAt'](h)['toString'](0x10))['slice'](-0x2);
                }
                return decodeURIComponent(g);
            };
            _yb['cache'] = {};
            _yb['alwaysTrue'] = !![];
        }
        var valueFromCache = _yb['cache'][numericValue];
        if (valueFromCache === undefined) {  // If value is not yet cached
            var e = function (f) {
                this['theOriginalFunction'] = f;
                this['countersArray'] = [0x1, 0x0, 0x0];
                this['unbeautifiedFunc'] = function () {return 'newState';};
                this['firstHalfOfRegexp'] = "\\w+ *\\(\\) *{\\w+ *";
                this['secondHalfOfRegexp'] = "['|\"].+['|\"];? *}";
            };
            e['prototype']['testIfScriptWasBeautified'] = function () {
                var testRegexp = new RegExp(this['firstHalfOfRegexp'] + this['secondHalfOfRegexp']);
                var g = testRegexp['test'](this['unbeautifiedFunc']['toString']()) ? --this['countersArray'][0x1] : --this['countersArray'][0x0];
                return this['expectMinusOne'](g);
            };
            e['prototype']['expectMinusOne'] = function (f) {
                if (!Boolean(~f)) {
                    return f;
                }
                return this['lengthenTheCounterArray'](this['theOriginalFunction']);
            };
            e['prototype']['lengthenTheCounterArray'] = function (f) {
                for (var g = 0x0, h = this['countersArray']['length']; g < h; g++) {
                    this['countersArray']['push'](Math['round'](Math['random']()));
                    h = this['countersArray']['length'];
                }
                return f(this['countersArray'][0x0]);
            };
            new e(_yb)['testIfScriptWasBeautified']();
            valueFromArr = _yb['decodeString'](valueFromArr);
            _yb['cache'][numericValue] = valueFromArr;
        } else {
            valueFromArr = valueFromCache;
        }
        return valueFromArr;
    }
```