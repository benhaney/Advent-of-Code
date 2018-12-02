let s = require('fs').readFileSync('input', 'utf8').trim().split('')

console.log(s.filter((a,b,c)=>a==c[(+b+1)%s.length]).reduce((a,b)=>a+(+b),0))

console.log(s.filter((a,b,c)=>a==c[(+b+(s.length/2))%s.length]).reduce((a,b)=>a+(+b),0))
