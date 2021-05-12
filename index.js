'use strict';

const splitfilt = require('./splitfilt.js');

const filePath = '/Users/Andres/Desktop/Cosas/algo2.txt';
const options = {
  // containing: ['covid'],
  insensitive: true,
  separator: '[a]',
  keepsSeparator: true,
};

console.log(splitfilt.splitText(filePath, options));
// splitfilt
//   .splitTextAsync(filePath, options)
//   .then((e) => {
//     console.log(e);
//     console.log(e.length);
//   })
//   .catch((e) => console.log(e));

// console.log(splitfilt.splitText(filePath, options));
// const string = 'hola. c*lo';
// const regExp2 = new RegExp('([.|*])');
// const res = string.replace(regExp2, '\\$&');
// // const res = string.split(regExp2);
// console.log(res);
