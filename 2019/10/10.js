let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').filter(x => x).map(x => x.split('').map(y => y == '#'))

let m = new Map(input.flatMap((r, y) => r.map((cell, x) => [[x,y], cell])).filter(([_, t]) => t))
m = new Map([...m].map(([a, _]) => [a, [...new Set([...m].map(([b, _]) => Math.atan2(a[0]-b[0], b[1]-a[1])))].length]))

let [a, val] = [...m].reduce((a,b) => b[1]>a[1]?b:a, [[], 0])

console.log(val)

console.log([...new Map([...m].map(([b, _]) => [Math.atan2(a[0]-b[0], b[1]-a[1]), b]))].sort((a,b) => a[0]-b[0])[198][1])
