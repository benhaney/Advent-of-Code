let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split('').map(y => +y))

let f = (k, b) => parseInt(k.reduce((acc, x) => acc.map((y, i) => y + x[i])).map(x => x >= k.length / 2 ? b : b^1).join(''), 2)

console.log([1,0].map(b => f(input, b)).reduce((a,b)=>a*b))

console.log([1,0].map(b => parseInt(input[0].reduce((k, _, i) => k.length == 1 ? k : [!!(f(k, b) & (1 << (k[0].length-i-1)))].map(c => k.filter(x => x[i] == c))[0], input)[0].join(''), 2)).reduce((a,b)=>a*b))
