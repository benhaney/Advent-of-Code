const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(''))

console.log([[input.map((x,i) => x.includes('#') ? -1 : i), input[0].map((_,i) => input.some(r => r[i] == '#') ? -1 : i)].map(a => a.filter(x => x > -1))].map(([ys, xs]) => input.map((a,y) => a.map((b,x) => b == '#' ? [y,x] : [-1]).filter(x => x[0] > -1)).flat().map((g1,i,a) => a.slice(i+1).map(g2 => (Math.abs(g2[0] - g1[0]) + Math.abs(g2[1] - g1[1]) + ys.filter(y => y > Math.min(g1[0], g2[0]) && y < Math.max(g1[0], g2[0])).length + xs.filter(x => x > Math.min(g1[1], g2[1]) && x < Math.max(g1[1], g2[1])).length))).flat().reduce((a,b) => a + b))[0])

console.log([[input.map((x,i) => x.includes('#') ? -1 : i), input[0].map((_,i) => input.some(r => r[i] == '#') ? -1 : i)].map(a => a.filter(x => x > -1))].map(([ys, xs]) => input.map((a,y) => a.map((b,x) => b == '#' ? [y,x] : [-1]).filter(x => x[0] > -1)).flat().map((g1,i,a) => a.slice(i+1).map(g2 => (Math.abs(g2[0] - g1[0]) + Math.abs(g2[1] - g1[1]) + (ys.filter(y => y > Math.min(g1[0], g2[0]) && y < Math.max(g1[0], g2[0])).length * 999999) + (xs.filter(x => x > Math.min(g1[1], g2[1]) && x < Math.max(g1[1], g2[1])).length * 999999)))).flat().reduce((a,b) => a + b))[0])