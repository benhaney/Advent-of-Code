const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(''))

const [[start, end], dirs, key, m, b] = [[c => [input.findIndex(x => x.includes(c))].map(y => y*1000+input[y].findIndex(z => z == c))[0]].map(g => [g('S'), g('E')])[0], [1,1000,-1,-1000], (r,d) => r + '' + (r == end ? 0 : d), {}, new Set()]

console.log([f = (r,d,s,t = Infinity) => ((s > t) || (input[Math.floor(r/1000)][r%1000] == '#') || (m[key(r,d)] < s) || (m[key(r,(d+5)%4)] < s - 1000) || (m[key(r,(d+3)%4)] < s - 1000)) ? false : ((m[key(r,d)] = s), ((r == end) ? true : (([f(r+dirs[d], d, s+1), f(r, (d+5)%4, s+1000), f(r, (d+3)%4, s+1000)].some(x => x)) && (b.add(r), true))))].map(f => (f(start, 0, 0), p1 = Math.min(...Object.entries(m).filter(([p,s]) => p == end + '0').map(([_,x]) => x))))[0])

console.log((b.clear(), f(start, 0, 0, p1), b.size+1))
