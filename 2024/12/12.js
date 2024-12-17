const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(''))

let dirs = [[-1,0],[0,-1],[1,0],[0,1]]
let [mem, mem2] = [new Set(), new Set()]

console.log([f = (y, x) => mem.has(`${y},${x}`) ? [0, 0] : (mem.add(`${y},${x}`), dirs.map(([dy, dx]) => input[y+dy] && input[y+dy][x+dx] === input[y][x] ? f(y+dy, x+dx) : [0, 1]).reduce((a,b) => [a[0]+b[0], a[1]+b[1]], [1,0]))].map(f => input.flatMap((r,y) => r.map((_,x) => f(y,x))).reduce((a,[b,c]) => a+(b*c), 0))[0])

console.log([f = (y, x) => mem2.has(`${y},${x}`) ? [0, 0] : (mem2.add(`${y},${x}`), dirs.map(([dy, dx]) => input[y+dy] && input[y+dy][x+dx] === input[y][x] ? f(y+dy, x+dx) : [0, dy ? (input[y][x-1] == input[y][x] && (!input[y+dy] || input[y+dy][x-1] != input[y][x]) ? 0 : 1) : (input[y-1] && input[y-1][x] == input[y][x] && input[y-1][x+dx] != input[y][x] ? 0 : 1)]).reduce((a,b) => [a[0]+b[0], a[1]+b[1]], [1,0]))].map(f => input.flatMap((r,y) => r.map((_,x) => f(y,x))).reduce((a,[b,c]) => a+(b*c), 0))[0])
