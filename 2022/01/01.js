let input = require('fs').readFileSync('input', 'utf8').split('\n\n').filter(x => x).map(x => x.split('\n').filter(y => y).map(y => +y))

console.log(Math.max(...(input.map(x => x.reduce((a,b) => a+b)))))
console.log(input.map(x => x.reduce((a,b) => a+b)).sort((a,b) => b-a).slice(0,3).reduce((a,b) => a+b))
