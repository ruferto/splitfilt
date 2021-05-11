# SplitFilt

Utility for split the content of a textfile given a filepath, with the posibility of filter splitted items given a string (or array of strings).

# Methods

- **splitText**(filepath [, options]) Separator by default is carriage return.
- **splitPhrases**(filepath [, options]) Separator is always a dot, trim every 'phrase' and preserve dot.

- **splitTextAsync**(filepath [, options]) Same than splitText, but returns a promise.
- **splitPhrasesAsync**(filepath [, options]) Same than splitPhrases, but returns a promise.

All of them will return an array.

# Options

An object with properties (all of them optionals):

- **separator**: String or regular expression to split the text. By default, a carriage return in _splitText_ and a dot in _splitPhrases_.
- **containing**: Single string or an array of strings to filter the splitted items.
- **insensitive**: Boolean value to determine if filter must be case insensitive or not (true by default).

# Examples:

```
const splitfilt = require('splitfilt');

const filePath = '/texts/someFile.txt';
const options = {
  containing: ['something', 'other'],
  separator: ' - ',
  insensitive: false,
};

splitfilt.splitTextAsync(filePath, options)
.then(console.log);

const phrasesWithHello = splitfilt.splitPhrases('/texts/someFile.txt', {
  containing: 'Hello',
  insensitive: false
  });
```
