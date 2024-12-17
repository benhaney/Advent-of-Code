const input = require('fs').readFileSync('input', 'utf8').replaceAll('\n', '')

console.log(input.match(/mul\([0-9]+,[0-9]+\)/g).map(x => x.match(/[0-9]+/g).map(y => +y)).reduce((a,[b,c]) => a+(b*c), 0))

console.log(input.replace(/don't\(\).*?(do\(\)|$)/g, ' ').match(/mul\([0-9]+,[0-9]+\)/g).map(x => x.match(/[0-9]+/g).map(y => +y)).reduce((a,[b,c]) => a+(b*c), 0))
