const input = require('fs').readFileSync('input', 'utf8').split('\n\n').map(x => x.split('\n').map(y => y.split('').map(z => z == '#' ? 1 : 0)))

console.log(input.map(grid => [grid.map(x => parseInt(x.join(''), 2)), grid[0].map((_,i) => parseInt(grid.map(x => x[i]).join(''), 2))].map(x => x.findIndex((_,i) => i != 0 && x.slice(0, i).every((y,j) => y == (x[(i*2)-1-j]||y))))).map(([x,y]) => x == -1 ? y : x * 100).reduce((a,b) => a+b))

console.log(input.map(grid =>[grid.map(x => parseInt(x.join(''), 2)),grid[0].map((_,i) => parseInt(grid.map(x => x[i]).join(''), 2))].map(x => x.findIndex((_,i) => i != 0 && x.slice(0,i).reverse().map((y, j) => x[i+j] === undefined ? 0 : (y ^ x[i+j]).toString(2).split('').filter(z => z == '1').length).reduce((a,b) => a + b) == 1))).map(([x,y]) => x == -1 ? y : x * 100).reduce((a,b) => a+b))
