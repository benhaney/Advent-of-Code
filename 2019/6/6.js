let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split(')'))

console.log([input.reduce((a,x) => Object.assign(a, {[x[0]]: (a[x[0]] || []).concat(x[1])}), {})].map(m => [r = (x, n) => m[x] ? n + m[x].reduce((a,b) => a + r(b, n+1), 0) : n].map(r => r("COM", 0))[0])[0])

console.log([Object.fromEntries(input.map(x => [x[1], x[0]]))].map(mr => [p = a => a.concat(mr[a.slice(-1)[0]] ? p([mr[a.slice(-1)[0]]]) : [])].map(p => [['SAN', 'YOU'].map(x => p([x]).slice(1))].map(([san, you]) => (san.findIndex(x => you.includes(x)) + you.findIndex(x => san.includes(x))))[0])[0])[0])
