let s = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => x.split(' '))

console.log(s.filter(a=>a.every(b=>a.filter(c=>c==b).length==1)).length)

console.log(s.map(a=>a.map(b=>b.split('').sort().join(''))).filter(a=>a.every(b=>a.filter(c=>c==b).length==1)).length)
