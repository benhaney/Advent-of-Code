const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(/:? /g).map(y => +y)).map(([x, ...y]) => [x,y])

console.log([f = (cs, t, acc) => cs.length ? ((acc === undefined) ? f(cs.slice(1), t, cs[0]) : (f(cs.slice(1), t, acc * cs[0]) || f(cs.slice(1), t, acc + cs[0]))) : acc == t].map(f => input.filter(([t,cs]) => f(cs,t)).map(([t,_]) => t).reduce((a,b) => a+b))[0])

console.log([g = (cs, t, acc) => cs.length ? ((acc === undefined) ? g(cs.slice(1), t, cs[0]) : (acc > t ? false : (g(cs.slice(1), t, acc * cs[0]) || g(cs.slice(1), t, acc + cs[0]) + g(cs.slice(1), t, +`${acc}${cs[0]}`)))) : acc == t].map(g => input.filter(([t,cs]) => g(cs,t)).map(([t,_]) => t).reduce((a,b) => a+b))[0])
