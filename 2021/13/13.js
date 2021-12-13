let [points, input] = require('fs').readFileSync('input', 'utf8').split('\n\n').map(x => x.split('\n').filter(y => y).map(z => z.match(/[xy\d]+/g).map(q => isNaN(+q) ? q : +q)))

let fold = (points, dir, line) => [...(new Set(points.map(p => p[dir] > line ? [dir ? p[0] : p[0] - (p[0] - line) * 2, dir ? p[1] - (p[1] - line) * 2 : p[1]] : p).map(([x,y])=>x+','+y)))].map(x => x.split(',').map(y => +y))

console.log(fold(points, input[0][0] == 'x' ? 0 : 1, input[0][1]).length)

let code = input.reduce((a, [c, n]) => fold(a, c == 'x' ? 0 : 1, n), points)
console.log(code.reduce((grid, [x,y]) => (grid[y][x] = '#', grid), Array(Math.max(...code.map(([_,y])=>y))+1).fill(0).map(_ => Array(Math.max(...code.map(([x])=>x))+1).fill(' '))).map(x => x.join('')).join('\n'))
