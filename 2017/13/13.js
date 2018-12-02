let m = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(a=>a.split(': ').map(b=>+b))

// Part 1
console.log(m.reduce((a,b)=>a+((b[0]%(2*((b[1]-1)))?0:(b[0]*b[1]))),0))

// Part 2
let offset = 0
while (!m.every(b=>(b[0]+offset)%(2*(b[1]-1)))) offset++
console.log(offset)
