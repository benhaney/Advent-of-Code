let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split(' -> ').map(y => y.split(',').map(z => +z)))

let points = ([[x1,y1],[x2,y2]]) => Array.from({length: Math.max(Math.abs(x1-x2), Math.abs(y1-y2))+1}).map((_,i) => [x1+Math.sign(x2-x1)*i, y1+Math.sign(y2-y1)*i])

console.log(Object.entries(input.filter(([[x1,y1], [x2,y2]]) => (x1==x2)||(y1==y2)).map(points).flat().reduce((a,b) => ((a[b] = (a[b] || 0) + 1), a), {})).filter(([_, x]) => x > 1).length)

console.log(Object.entries(input.map(points).flat().reduce((a,b) => ((a[b] = (a[b] || 0) + 1), a), {})).filter(([_, x]) => x > 1).length)
