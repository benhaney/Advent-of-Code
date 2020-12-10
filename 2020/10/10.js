let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => +x).sort((a,b) => a-b)

console.log([input.concat(Math.max(...input)+3).reduce(([a1,l,a3],b) => b-l==1?[a1+1,b,a3]:(b-l==3?[a1,b,a3+1]:[a1,b,a3]), [0,0,0])].map(([a,_,b]) => a*b)[0])

console.log((memo = {}, (f = i => input.filter(x => x > i && x <= i + 3).map(x => memo[x] = (memo[x] || f(x) || 1)).reduce((a,b) => a+b, 0))(0)))
