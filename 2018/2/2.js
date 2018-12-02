let input = require('fs').readFileSync('input', 'utf8').trim().split('\n')

console.log([2,3].map(x=>input.filter(w=>Object.values(w.split('').reduce((a,b)=>({...a,[b]: (a[b]||0)+1}),{})).includes(x)).length).reduce((a,b)=>a*b,1))

input[0].split('').map((x,i)=>({i,f:new Set()})).forEach(x=>input.map(w => w.slice(0,x.i)+w.slice(x.i+1)).forEach(p=>(x.f.has(p)||!x.f.add(p))&&process.exit(console.log(p))))
