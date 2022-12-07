let input = require('fs').readFileSync('input', 'utf8').split('$ ').filter(x => x).map(x => x.split('\n').filter(y => y).map(z => z.split(' ')))

let dirs = (q = {}, [f = (d, name, dirs) => Number.isInteger(d) ? d : (dirs[name] = Object.entries(d).map(([x,y]) => f(y,name+'/'+x,dirs)).reduce((a,b)=>a+b,0))].map(f => f(input.reduce(({fs, cwd}, b) => b[0][0] == 'cd' ? (b[0][1] == '..' ? {fs, cwd: cwd.slice(0, cwd.length - 1)} : {fs, cwd: cwd.concat(b[0][1])}) : {fs: (cwd.slice(0, cwd.length-1).reduce((fs,dir) => fs[dir], fs)[cwd.slice(-1)[0]] = Object.fromEntries(b.slice(1).map(([s,name]) => [name, s == 'dir' ? [] : +s])), fs), cwd}, {fs: {}, cwd: []}).fs['/'], '/', q)), q)
console.log(Object.values(dirs).filter(x => x <= 100000).reduce((a,b)=>a+b))
console.log(Object.values(dirs).filter(x => dirs['/'] - x <= 40000000).sort((a,b) => a-b)[0])
