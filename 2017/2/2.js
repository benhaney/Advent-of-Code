let s = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(line => line.split('\t').filter(w => w).map(w => +w))

console.log(s.map(a=>a.sort((a,b)=>a-b)).map(a=>+a[a.length-1]-a[0]).reduce((a,b)=>a+b,0))

console.log(s.map(w=>w.map((a,i,x)=>x.map(b=>(b==a||b%a)?0:b/a).reduce((a,b)=>a+b,0)).reduce((a,b)=>a+b,0)).reduce((a,b)=>a+b,0))
