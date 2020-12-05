let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => [x.slice(0,7), x.slice(7)].map(y => parseInt(y.replace(/[FL]/g, 0).replace(/[BR]/g, 1), 2)))

console.log(Math.max(...input.map(x => x[0] * 8 + x[1])))

console.log(input.map(x => x[0] * 8 + x[1]).sort((a,b) => a-b).find((a,b,c) => b && a > c[b-1] + 1) - 1)
