let input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(' ')).map(([d,n]) => [d, +n])
 
let f = k => input.flatMap(([d, n]) => Array(n).fill({R:[1,0],L:[-1,0],U:[0,1],D:[0,-1]}[d])).reduce(([rs, s], b) => [(rs.forEach((r,i) => (rs[i] = (!i || Math.max(...[rs[i-1][0] - r[0], rs[i-1][1] - r[1]].map(Math.abs)) > 1) ? r.map((x,j) => x + (i?Math.sign(rs[i-1][j] - x):b[j])) : r)), rs), s.add(rs[rs.length-1].join())], [[...Array(k)].map(_ => [0,0]), new Set()])[1].size
 
console.log([2,10].map(f).join('\n'))
