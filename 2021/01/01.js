let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => +x)

let f = n => input.reduce((c, x, i, a) => c + ~~(x < a[i+n]), 0)

console.log(f(1) + '\n' + f(3))
