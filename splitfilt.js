'use strict';
var fs = require('fs');

const splitfilt = {
  splitText: function (textFilePath, options) {
    const {
      containing = '',
      insensitive = true,
      separator = /[\r\n]/,
    } = options
      ? options
      : { containing: '', insensitive: true, separator: /[\r\n]/ };

    let text = fs.readFileSync(textFilePath).toString();

    text = text.split(separator);

    const lowerIfRequired = insensitive ? (a) => a.toLowerCase() : (a) => a;
    let splittedText = [];
    if (containing != '') {
      if (Array.isArray(containing)) {
        splittedText = text.map((a) => a);
        containing.forEach((term) => {
          const aux = [];
          splittedText.forEach((item) => {
            if (lowerIfRequired(item).indexOf(lowerIfRequired(term)) != -1)
              aux.push(item);
          });

          splittedText = aux.map((item) => item);
        });
      } else {
        text.forEach((item) => {
          if (
            lowerIfRequired(item).indexOf(lowerIfRequired(containing)) != -1
          ) {
            splittedText.push(item);
          }
        });
      }
    } else {
      text.forEach((item) => {
        if (item != '') splittedText.push(item);
      });
    }
    return splittedText;
  },

  splitTextAsync: function (textFilePath, options) {
    const {
      containing = '',
      insensitive = true,
      separator = /[\r\n]/,
    } = options
      ? options
      : { containing: '', insensitive: true, separator: /[\r\n]/ };
    return new Promise((resolve, reject) => {
      try {
        resolve(
          this.splitText(textFilePath, {
            containing,
            insensitive,
            separator,
          })
        );
      } catch (err) {
        reject(err);
      }
    });
  },

  splitPhrases: function (textFilePath, options) {
    const { containing = '', insensitive = true } = options
      ? options
      : { containing: '', insensitive: true };
    return this.splitText(textFilePath, {
      containing,
      insensitive,
      separator: '.',
    }).map((item) => item.trim() + '.');
  },

  splitPhrasesAsync: async function (textFilePath, options) {
    const { containing = '', insensitive = true } = options
      ? options
      : { containing: '', insensitive: true };
    return new Promise((resolve, reject) => {
      try {
        resolve(
          this.splitPhrases(textFilePath, {
            containing,
            insensitive,
            seperator: '.',
          })
        );
      } catch (err) {
        reject(err);
      }
    });
  },
};
module.exports = splitfilt;
