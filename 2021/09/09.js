let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split('').map(y => +y))

let g = (y,x) => (input[y]??[])[x] ?? Infinity
let w = (y,x) => g(y,x) < g(y-1,x) && g(y,x) < g(y+1,x) && g(y,x) < g(y,x-1) && g(y,x) < g(y,x+1)
let b = (y,x,s = new Set()) => g(y,x) == Infinity || g(y,x) == 9 || s.has(y+','+x) ? 0 : (s.add(y+','+x), 1 + b(y-1,x,s) + b(y+1,x,s) + b(y,x-1,s) + b(y,x+1,s))

console.log(input.flatMap((row, y) => row.filter((n, x) => w(y,x))).reduce((a,b)=>a+b+1,0))

console.log(input.flatMap((row, y) => row.map((n, x) => w(y,x) ? b(y,x) : 0)).sort((x,y)=>y-x).slice(0,3).reduce((x,y)=>x*y))
