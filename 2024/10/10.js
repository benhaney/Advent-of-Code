const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split('').map(y => +y))

console.log([f = (y,x,h) => (input[y] && input[y][x] === h) ? (h == 9 ? [`${y},${x}`] : ([[-1,0],[1,0],[0,-1],[0,1]].map(([dy,dx]) => f(y+dy,x+dx,h+1)).reduce((a,b) => a.concat(b)))) : []].map(f => input.flatMap((ln,y) => ln.map((h,x) => new Set(f(y,x,0)).size)).reduce((a,b) => a+b))[0])

console.log(input.flatMap((ln,y) => ln.map((h,x) => f(y,x,0).length)).reduce((a,b) => a+b))
