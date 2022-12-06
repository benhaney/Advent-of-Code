let input = require('fs').readFileSync('input', 'utf8').split('')

console.log([4,14].map(n => input.findIndex((_,i,a) => new Set(a.slice(i+1-n,i+1)).size == n)+1).join('\n'))
