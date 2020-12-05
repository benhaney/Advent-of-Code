let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => +x)

console.log(input.flatMap((x,i) => input.slice((+i)+1).map(y => [x,y]).filter(([x,y]) => x+y == 2020)).map(([x,y]) => x*y)[0])

console.log(input.flatMap((x,i) => input.slice((+i)+1).flatMap((y,j,a) => a.slice((+j)+1).map(z => [x,y,z]).filter(([x,y,z]) => x+y+z == 2020))).map(([x,y,z]) => x*y*z)[0])
