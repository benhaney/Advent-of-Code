const [ts, ds] = [require('fs').readFileSync('input', 'utf8').split('\n\n')].map(([ts, ds]) => [new Set(ts.split(', ')), ds.split('\n')])[0]

let f = d => [[new Map(), [...new Set([...ts].map(x => x.length))]]].map(([m, ls]) => g = d => (m.has(d)) ? m.get(d) : m.set(d, d == '' ? 1 : ls.map(l => (d.length >= l && ts.has(d.slice(0,l))) ? g(d.slice(l)) : 0).reduce((a,b) => a+b, 0)).get(d))[0](d)

console.log(ds.map(f).filter(x => x).length)
console.log(ds.map(f).reduce((a,b) => a + b, 0))
