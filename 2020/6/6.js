let input = require('fs').readFileSync('input', 'utf8').split('\n\n').filter(x => x).map(x => x.split('\n').filter(x => x).map(y => new Set(y.match(/[a-z]/g))))

console.log(input.map(x => x.reduce((a,b) => new Set([...a, ...b])).size).reduce((a,b) => a+b))

console.log(input.map(x => x.reduce((a,b) => new Set([...a].filter(y => b.has(y)))).size).reduce((a,b) => a+b))
