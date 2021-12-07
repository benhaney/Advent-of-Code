let input = require('fs').readFileSync('input', 'utf8').split(',').filter(x => x).map(x => +x)

let f = g => Array(Math.max(...input)).fill(0).reduce((a,_,i) => Math.min(a, input.reduce((a,b)=>a+g(Math.abs(i-b)),0)), Infinity)

console.log(f(n => n))
console.log(f(n => n*(n+1)/2))
