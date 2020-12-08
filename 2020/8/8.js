let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split(' ')).map(([i,c]) => [i, +c])

console.log((step = (ip, acc, s, inp) => s.has(ip) ? acc : ({acc: x => step(ip+1, acc+x, s, inp), jmp: x => step(ip+x, acc, s, inp), nop: x => step(ip+1, acc, s, inp), undefined: x => [acc]})[s.add(ip),(inp[ip]??[])[0]]((inp[ip]??[])[1]))(0, 0, new Set(), input))

console.log((f = i => Array.isArray(x = step(0, 0, new Set(), [...input.slice(0,i), [({nop:'jmp',jmp:'nop'})[input[i][0]]||input[i][0], input[i][1]], ...input.slice(i+1)])) ? x[0] : f(i+1))(0))
