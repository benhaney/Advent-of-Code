const input = require('fs').readFileSync('input', 'utf8').split(',')

console.log(input.map(x => x.split('').reduce((a,b) => ((a + b.charCodeAt(0)) * 17) % 256, 0)).reduce((a,b) => a+b))

console.log(input.map(x => x.split(/[=-]/)).map(([x,y]) => [x, x.split('').reduce((a,b) => ((a + b.charCodeAt(0)) * 17) % 256, 0), +y]).reduce((a,b) => (Object.assign(a, {[b[1]]: Object.assign(a[b[1]]||{}, {[b[0]]: b[2]})}), a[b[1]][b[0]] ? a : (delete a[b[1]][b[0]], a)), []).map((x,i) => Object.entries(x).map(([_,y],j) => (i+1) * (j+1) * y)).flat().reduce((a,b) => a+b))
