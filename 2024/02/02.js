const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(' ').map(y => +y))

console.log(input.filter(x => [x.map((y,i) => y-x[i-1]).slice(1)].map(x => x.every(y => Math.abs(y) < 4 && Math.abs(y) > 0) && new Set(x.map(Math.sign)).size == 1)[0]).length)

console.log(input.filter(x => [x.concat(null).map((_,i) => [x.slice(0,i).concat(x.slice(i+1))].map(x =>x.map((y,i) => y-x[i-1]).slice(1))[0])].map(xs => xs.some(x => x.every(y => Math.abs(y) < 4 && Math.abs(y) > 0) && new Set(x.map(Math.sign)).size == 1))[0]).length)
