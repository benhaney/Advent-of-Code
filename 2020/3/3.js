let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split(''))
let trees = (r, d) => Array.from({length: Math.ceil(input.length/d)}).filter((_,i) => input[d*i][(r*i)%input[0].length] == '#').length

console.log(trees(3, 1))

console.log([[1,1],[3,1],[5,1],[7,1],[1,2]].map(([r,d]) => trees(r,d)).reduce((a,b) => a*b))
