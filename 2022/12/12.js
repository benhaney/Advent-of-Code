let input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split('').map(y => y.charCodeAt(0)-97))
let find_2d = n => [input.findIndex(x => x.includes(n))].map(y => [y, input[y].findIndex(x => x == n)])[0]
let [[sy,sx], [ey,ex]] = [find_2d(-14), find_2d(-28)]
;[input[sy][sx], input[ey][ex]] = [0, 25]

let f = (g, [py,px], prev = Infinity, d = 0) => (py < 0 || px < 0 || py >= g.length || px >= g[0].length || g[py][px].c <= d || g[py][px].p > prev + 1) ? 0 : (g[py][px].c = d, [[py-1, px], [py+1, px], [py, px-1], [py, px+1]].map(xy => f(g, xy, g[py][px].p, d + 1)), g)
console.log(f(input.map(x => x.map(y => ({p: y, c: Infinity}))), [sy,sx])[ey][ex].c)
console.log(Math.min(...f(input.map(x => x.map(y => ({p: 25 - y, c: Infinity}))), [ey,ex]).flat().filter(x => x.p == 25).map(x => x.c)))
