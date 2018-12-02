let m = require('fs').readFileSync('input', 'utf8').trim().split(',')

let dis = d => ((a,b) => (Math.abs(a)+Math.abs(b)+Math.abs(a+b))/2)((d.ne+d.se-d.nw-d.sw),(d.s+d.sw-d.n-d.ne))
let d = {'n':0,'ne':0,'se':0,'s':0,'sw':0,'nw':0}, max = 0
for (let o of m) { d[o]++; max = Math.max(max, dis(d)) }

console.log(dis(d))
console.log(max)
