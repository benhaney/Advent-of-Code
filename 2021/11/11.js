let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split('').map(y => +y))

let shine = (a,y,x) => ((a[y][x] = [0, true]) && [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(([yo,xo])=>((a[y+yo]||[])[x+xo]||[])[0]++))

let a = input.map(r => r.map(x => [x, false])), p2 = false, c = 0

for (let i = 0; i < 100 || !p2; i++) {
  a = a.map(r => r.map(([x,s]) => [x+1, false]))
  while (a.flat().some(([x,s]) => x > 9 && !s)) {
    for (let y = 0; y < a.length; y++) {
      for (let x = 0; x < a[y].length; x++) {
        if (a[y][x][0] > 9 && !a[y][x][1]) {
          shine(a,y,x)
          c++
        }
      }
    }
  }
  a = a.map(r => r.map(([x,s]) => [s?0:x, s]))
  if (a.flat().every(([_,s])=>s)) p2 = i+1
  if (i == 100) console.log(c)
}

console.log(p2)
