const input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split(': ')[1].split(' | ').map(y => y.split(' ').filter(z => z).map(z => +z))).map(([a,b]) => [new Set(a), b])

console.log(input.map(([w, h]) => Math.floor((1 << h.filter(x => w.has(x)).length) / 2)).reduce((a,b) => a + b))
console.log(input.map(([w, h]) => [1, h.filter(x => w.has(x)).length]).map(([c,w],i,a) => (a.slice(i+1, i+1+w).forEach(y => y[0] += c), [c,w])).reduce((a,[b]) => a+b, 0))
