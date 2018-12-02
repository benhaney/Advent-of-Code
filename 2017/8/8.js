let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(a=>a.split(' '))

let ops = {
  '==': (a,b) => a==b,
  '!=': (a,b) => a!=b,
  '<':  (a,b) => a<b,
  '>':  (a,b) => a>b,
  '<=': (a,b) => a<=b,
  '>=': (a,b) => a>=b
}

console.log(Math.max(...Object.values(input.reduce((a,b)=>Object.assign(a,{[b[0]]:(a[b[0]]||0)+((ops[b[5]](a[b[4]]||0,+b[6]))?(+b[2]*(b[1]=='inc'?1:-1)):0)}),{}))))

console.log(input.reduce((a,b)=>({r:Object.assign(a.r,{[b[0]]:(a.r[b[0]]||0)+((ops[b[5]](a.r[b[4]]||0,+b[6]))?(+b[2]*(b[1]=='inc'?1:-1)):0)}),m:Math.max(a.m,a.r[b[0]])}),{r:{},m:-Infinity}).m)
