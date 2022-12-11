let input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(' ').map((y,i) => i?+y:y)).flatMap(x => x[0] == 'addx' ? [['noop'], x] : [x])

let f = (g, c) => input.reduce(([x,t], [ins, arg], i) => [(ins == 'addx') ? x + arg : x, g(i,t,x)], [1, c])[1]
console.log(f((i,t,x) => ((i+1) % 40 == 20) ? t+(x*(i+1)) : t, 0))
console.log(f((i,t,x) => t + ([x-1,x,x+1].includes(i%40) ? '#' : ' '), '').match(/.{40}/g).join('\n'))
