let input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(' ').map(y => +y))

console.log(input.map(line => line.reduce((a,b,i) => a.concat([a[i].slice(0, a[i].length - 1).map((_, j) => a[i][j+1] - a[i][j])]), [line]).filter(x => x.some(y => y != 0))).map(x => x[0][x[0].length - 1] + x.slice(1).reduce((a,b) => a+b[b.length - 1], 0)).reduce((a,b) => a+b, 0))

console.log(input.map(line => line.reduce((a,b,i) => a.concat([a[i].slice(0, a[i].length - 1).map((_, j) => a[i][j+1] - a[i][j])]), [line]).filter(x => x.some(y => y != 0))).map(x => x.reduceRight((a,b) => b[0]-a, 0)).reduce((a,b) => a+b, 0))
