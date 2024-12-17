const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(''))

console.log([f = (y,x,d,r = 'XMAS'.split('')) => r.length ? (input[y] && input[y][x] == r[0] ? f(y+d[0], x+d[1],d,r.slice(1)) : false) : true].map(f => input.map((l,y) => l.map((c,x) => c == 'X' ? [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].filter(d => f(y,x,d)).length : 0)).flat().reduce((a,b)=>a+b))[0])

console.log(input.map((l,y) => l.map((c,x) => c == 'A' && input[y-1] && input[y+1] && /^(MSMS|SMSM|MMSS|SSMM)$/.test(input[y-1][x-1]+input[y-1][x+1]+input[y+1][x-1]+input[y+1][x+1]))).flat().filter(x => x).length)
