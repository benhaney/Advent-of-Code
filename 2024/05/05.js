const [rs, ps] = [require('fs').readFileSync('input', 'utf8').split('\n\n')].map(([a,b]) => [a.split('\n').map(x => x.split('|').map(y => +y)).reduce((a,[b,c]) => Object.assign(a, {[c]: (a[c] || new Set()).add(b)}), {}), b.split('\n').map(x => x.split(',').map(y => +y))])[0]

console.log(ps.filter(p => p.every((x,i) => !p.slice(i+1).some(y => rs[x] && rs[x].has(y)))).map(x => x[Math.floor(x.length/2)]).reduce((a,b) => a+b))

console.log(ps.filter(p => p.some((x,i) => p.slice(i+1).some(y => rs[x] && rs[x].has(y)))).map(p => p.sort((a,b) => rs[a] && rs[a].has(b) ? 1 : (rs[b] && rs[b].has(a) ? -1 : 0))).map(x => x[Math.floor(x.length/2)]).reduce((a,b) => a+b))
