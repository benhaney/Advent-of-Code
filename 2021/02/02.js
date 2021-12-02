let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split(' ')).map(([x, y]) => [x[0], +y])

console.log(input.reduce(([h,d], [i,x]) => ({d: _ => [h,d+x], u: _ => [h,d-x], f: _ => [h+x,d]}[i]()), [0,0,0]).reduce((a,b)=>a*b))

console.log(input.reduce(([h,d,a], [i,x]) => ({d: _ => [h,d,a+x], u: _ => [h,d,a-x], f: _ => [h+x,d+(a*x),a]}[i]()), [0,0,0]).slice(0,2).reduce((a,b)=>a*b))
