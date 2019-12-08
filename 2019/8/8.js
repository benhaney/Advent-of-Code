let input = require('fs').readFileSync('input', 'utf8').trim().split('').map(x => +x)

let chunk = (a, n) => Array.from(Array(Math.ceil(a.length/n)), (_,i) => a.slice(i*n, i*n+n))

console.log([1,2].reduce((t,c) => t * chunk(input, 25*6).sort((a,b) => [a,b].map(x => x.reduce((a,b) => a+(b==0?1:0), 0)).reduce((x,y) => x-y))[0].reduce((a,b) => a+(b==c?1:0), 0), 1))

console.log(chunk(input.slice(0,25*6).map((_,i) => chunk(input, 25*6).map(layer => layer[i]).find(x => x != 2) || 2), 25).map(x => x.join('')).join('\n').replace(/2/g, ' '))
