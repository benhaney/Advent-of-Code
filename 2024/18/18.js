const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(',').map(y => +y)).map(([x,y]) => x*100+y)

console.log([g = l => [[new Set(input.slice(0,l)), new Map()]].map(([s,m]) => [f = (p,n) => (!((p < 0 || p >= 71*100 || (p%100) > 70) || (s.has(p)) || (m.has(7070) && m.get(7070) < n) || (m.has(p) && m.get(p) <= n))) && (m.set(p, n), [100,1,-100,-1].forEach(d => f(p+d, n+1)))].map(f => (f(0,0), m.get(7070)))[0])[0]].map(g => g(1024))[0])

console.log([input.reduce((a,b) => (a[1]-a[0]<=1) ? a : [a[0]+Math.floor((a[1]-a[0])/2)].map(len => [g(len)].map(x => [x?len:a[0],x?a[1]:len])[0])[0], [1024, input.length])[0]].map(x => [~~(input[x]/100), input[x]%100].join())[0])
