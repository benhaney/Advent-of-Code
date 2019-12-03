let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split(',').filter(y => y).map(z => [z[0], +(z.slice(1))]))

console.log([[Infinity, Infinity]].map(o => ([{'L': [-1, 0], 'R': [1, 0], 'U': [0, 1], 'D': [0, -1]}].map(dirs =>[{}].map(grid => [((pos, n) => grid[pos] = grid[pos] || n), ((pos, n) => o = grid[pos] ? [Math.min(o[0], pos.map(Math.abs).reduce((a,b)=>a+b)), Math.min(o[1], grid[pos] + n)] : o)].forEach((w, i) => [0].map(n => [[0,0]].map(pos => input[i].forEach(com => Array.from({length: com[1]}).forEach(() => w(pos = [pos[0] + dirs[com[0]][0], pos[1] + dirs[com[0]][1]], ++n)))))))), o))[0].join('\n'))

