const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(' ')).map(([x,y]) => [x, y.split(',').map(a => +a)])

let cache = {}, f = (s, cs) => (cache[s+cs] === undefined) ? (cache[s+cs] = ((s, cs) => (!s) ? (cs.length ? 0 : 1) : ((!cs.length) ? (s.includes('#') ? 0 : 1) : ((s.split('').filter(x => x == '#' || x == '?').length < cs.reduce((a,b) => a+b, 0)) ? 0 : ((s[0] == '.') ? f(s.slice(1), cs) : (((!(s.slice(0, cs[0]).includes('.') || s[cs[0]] == '#') ? f(s.slice(cs[0] + 1), cs.slice(1)) : 0) + ((s[0] == '?') ? f(s.slice(1), cs) : 0)))))))(s, cs)) : cache[s+cs]

console.log([input, input.map(([s, cs]) => [Array(5).fill(s).join('?'), Array(5).fill(cs).flat()])].map(x => x.map(([s, cs]) => f(s, cs)).reduce((a,b) => a+b)).join('\n'))
