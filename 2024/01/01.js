const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split('   ').map(y => +y)).reduce(([a,b],[x,y]) => [a.concat(x), b.concat(y)], [[], []]).map(x => x.sort((a,b) => a-b))

console.log(input[0].reduce((a,b,c) => a+Math.abs(b-input[1][c]), 0))

console.log(input[0].reduce((a, b) => [a[0] + (b * (a[1][b]||0)), a[1]], [0, input[1].reduce((a,b) => Object.assign(a, {[b]: (a[b]||0)+1}), {})])[0])
