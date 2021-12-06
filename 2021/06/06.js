let input = require('fs').readFileSync('input', 'utf8').split(',').filter(x => x).map(x => +x)

let f = n => Array.from({length: n}).reduce(([a,b,c,d,e,f,g,h,i]) => [b,c,d,e,f,g,h+a,i,a], input.reduce((a, b) => (a[b]++, a), [0,0,0,0,0,0,0,0,0])).reduce((a,b)=>a+b)

console.log(`${f(80)}\n${f(256)}`)
