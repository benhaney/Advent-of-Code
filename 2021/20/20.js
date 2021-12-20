let [[alg], input] = require('fs').readFileSync('input', 'utf8').split('\n\n').map(x => x.split('\n').filter(y => y).map(y => y.split('')))

let en = (m, c) => [[m[0].map(x => c)].concat(m).concat([m[0].map(x => c)]).map(x => [c].concat(x).concat([c]))].map(m => m.map((row,y) => row.map((_,x) => alg[parseInt([[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-1,1],[0,1],[1,1]].map(([xo,yo])=>(((m[y+yo]||[])[x+xo])||c) == '#' ? '1' : '0').join(''),2)])))[0]

console.log(en(en(input, '.'), '#').flat().filter(x => x == '#').length)
console.log(Array(50).fill(0).reduce((a,_,i) => en(a, i%2?'#':'.'), input).flat().filter(x => x == '#').length)
