const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.match(/^Game (\d+): (.*)$/).slice(1,3)).map(([i,x]) => [+i, x.split('; ').map(y => Object.fromEntries(y.split(', ').map(z => z.split(' ')).map(([n,c]) => [c, +n])))])

console.log(input.filter(([, game]) => game.every(r => (r.red||0) <= 12 && (r.green||0) <= 13 && (r.blue||0) <= 14)).reduce((a,b) => a + b[0], 0))

console.log(input.map(([_,g]) => [g.map(x => x.red||0), g.map(x => x.green||0), g.map(x => x.blue||0)].map(x => Math.max(...x)).reduce((a,b) => a*b)).reduce((a,b) => a+b))
