let input = require('fs').readFileSync('input', 'utf8').split('\n\n').map(x => x.split('\n')).map(x => ({items: x[1].match(/\d+/g).map(y => +y), op: old => eval(x[2].match(/= (.*)/)[1]), div: +x[3].match(/\d+$/)[0], true: +x[4].match(/\d+$/)[0], false: +x[5].match(/\d+$/)[0], c1: 0, c2: 0}))

let f = (nn, gg) => [input.map(x => ({...JSON.parse(JSON.stringify(x)), op: x.op}))].map(inp => ([...Array(nn)].forEach(_ => inp.forEach(m => m.items.splice(0).forEach(item => ([gg(m.op(item))].map(n => inp[m[n % m.div == 0]].items.push(n)), m.c1++)))),inp))[0].map(x => x.c1).sort((a,b) => b-a).slice(0,2).reduce((a,b) => a*b)
console.log([f(20, x => Math.floor(x / 3)), f(10000, [input.map(x => x.div).reduce((a,b) => a*b)].map(x => g => g % x)[0])].join('\n'))
