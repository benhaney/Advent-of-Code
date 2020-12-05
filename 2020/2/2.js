let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.match(/^(\d+)-(\d+) (.): (.*)$/)).map(x => [+x[1], +x[2], x[3], x[4]])

console.log(input.filter(([min, max, c, p]) => [(p.match(RegExp(c, 'g'))||[]).length].map(x => x >= min && x <= max)[0]).length)

console.log(input.filter(([m, n, c, p]) => (p[m-1] == c) + (p[n-1] == c) == 1).length)
