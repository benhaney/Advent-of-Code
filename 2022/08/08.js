let input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split('').map(y => +y))

let f = (e, y, x) => [e.slice(0,x).reverse(), e.slice(x+1), input.slice(0,y).map(b => b[x]).reverse(), input.slice(y+1).map(b => b[x])]
console.log(input.map((e, y) => e.filter((a, x) => f(e, y, x).some(m => Math.max(...m) < a))).flat().length)
console.log(Math.max(...input.map((e, y) => e.map((a, x) => f(e, y, x).map(m => (m.findIndex(mm => mm >= a) + 1) || m.length).reduce((q,p)=>q*p))).flat()))
