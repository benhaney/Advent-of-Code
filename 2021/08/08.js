let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split(' | ').map(y => y.split(' ').map(z => z.split('').sort().join(''))))

console.log(input.flatMap(([_, out]) => out).filter(x => [2,4,3,7].includes(x.length)).length)

let inter = (a,b) => b.split('').filter(x => a.split('').includes(x)).length

console.log(input.map(([s, right]) => [Object.fromEntries(Object.entries(Array(10).fill(0).reduce((a,b,i) => Object.assign(a, [() => ({[1]: s.find(x => x.length == 2)}), () => ({[7]: s.find(x => x.length == 3)}), () => ({[4]: s.find(x => x.length == 4)}), () => ({[8]: s.find(x => x.length == 7)}), () => ({[3]: s.find(x => x.length == 5 && inter(x, a[1]) == 2)}), () => ({[2]: s.find(x => x.length == 5 && inter(x, a[4]) == 2)}), () => ({[5]: s.find(x => x.length == 5 && inter(x, a[2]) == 3)}), () => ({[9]: s.find(x => x.length == 6 && inter(x, a[4]) == 4)}), () => ({[0]: s.find(x => x.length == 6 && inter(x, a[5]) == 4)}), () => ({[6]: s.find(x => x.length == 6 && inter(x, a[7]) == 2)})][i]()), {})).map(([v,k]) => [k,+v]))].map(m => +right.map(x => m[x]).join(''))[0]).reduce((a,b)=>a+b))
