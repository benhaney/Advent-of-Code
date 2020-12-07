let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.match(/^(?<bag>.*?) bags contain (?<x>\d.*)?/).groups).map(x => [x.bag, (x.x||'').split(', ').filter(y => y).map(y => y.match(/^(?<c>\d+) (?<b>.*) bags?.?/).groups).map(y => [+y.c, y.b])])

console.log([input.flatMap(([p, cs]) => cs.map(([_, c]) => [c, p])).reduce((a,[k,v]) => Object.assign(a, {[k]: (a[k]||[]).concat(v)}), {})].map(d => new Set((f = b => (d[b]||[]).map(c => [c, f(c)]).flat(2))('shiny gold')).size)[0])

console.log([Object.fromEntries(input)].map(d => (f = b => d[b] = Array.isArray(d[b]) ? d[b].reduce((a, [c, ba]) => a + c * (1 + f(ba)), 0) : d[b])('shiny gold'))[0])
