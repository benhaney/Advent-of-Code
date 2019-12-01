let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => parseInt(x))

let f = n => Math.max(0, Math.floor(n / 3) - 2)
console.log(input.map(f).reduce((a,b) => a + b))

let g = n => f(n) + (f(n) && g(f(n)))
console.log(input.map(g).reduce((a,b) => a + b))
