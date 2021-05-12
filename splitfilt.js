'use strict';
var fs = require('fs');

const splitfilt = {
  splitText: function (textFilePath, options) {
    const {
      containing = '',
      insensitive = true,
      separator = /[\r\n]/,
      keepsSeparator = false,
    } = options
      ? options
      : {
          containing: '',
          insensitive: true,
          separator: /[\r\n]/,
          keepsSeparator: false,
        };

    let text = fs.readFileSync(textFilePath).toString();

    const isRegex = !(typeof separator == 'string');
    let separator2 = separator;
    if (keepsSeparator) {
      if (!isRegex && separator.match(/(?=[\.\|\$\*\?\+\^\(\)\[\]\{\}])/)) {
        let separatorAux = separator.replace(
          /(?=[\.\|\$\*\?\+\^\(\)\[\]\{\}])/,
          '\\$&'
        );
        separator2 = new RegExp('(?<=' + separatorAux + ')');
      }
    }
    text = text.split(separator2);

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
      keepsSeparator = false,
    } = options
      ? options
      : {
          containing: '',
          insensitive: true,
          separator: /[\r\n]/,
          keepsSeparator: false,
        };
    return new Promise((resolve, reject) => {
      try {
        resolve(this.splitText(textFilePath, options));
      } catch (err) {
        reject(err);
      }
    });
  },

  splitPhrases: function (textFilePath, options) {
    const {
      containing = '',
      insensitive = true,
      keepsSeparator = false,
    } = options
      ? options
      : { containing: '', insensitive: true, keepsSeparator: false };
    return this.splitText(textFilePath, {
      containing,
      insensitive,
      separator: '.',
      keepsSeparator,
    }).map((item) => item.trim());
  },

  splitPhrasesAsync: async function (textFilePath, options) {
    const {
      containing = '',
      insensitive = true,
      keepsSeparator = false,
    } = options
      ? options
      : { containing: '', insensitive: true, keepsSeparator: false };
    return new Promise((resolve, reject) => {
      try {
        resolve(
          this.splitPhrases(textFilePath, {
            containing,
            insensitive,
            seperator: '.',
            keepsSeparator,
          })
        );
      } catch (err) {
        reject(err);
      }
    });
  },
};
module.exports = splitfilt;
