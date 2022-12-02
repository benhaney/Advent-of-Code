let input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(' ')).map(x => x.map(y => y.charCodeAt(0))).map(([x,y]) => [x-65, y-88])

console.log(input.map(([x,y]) => y+1+(x==y?3:(y==(x+1)%3?6:0))).reduce((a,b) => a+b))
console.log(input.map(([x,y]) => y*3+1+(!y?(x+2)%3:(y==2?(x+1)%3:x))).reduce((a,b) => a+b))
