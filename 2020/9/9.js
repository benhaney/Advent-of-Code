let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => +x)

console.log(inv = input.slice(25).find((x, i) => !input.slice(i, i+25).flatMap((y,j,a) => a.map(z => z+y)).includes(x)))

console.log([(f = (i,j) => (sum = input.slice(i,j).reduce((a,b)=>a+b,0)) == inv ? input.slice(i,j) : (sum > inv ? f(i+1,j) : f(i,j+1)))(0,0)].map(x => Math.max(...x) + Math.min(...x))[0])
