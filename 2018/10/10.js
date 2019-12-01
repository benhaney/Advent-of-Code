let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => x.match(/position=<([0-9- ]+), ([0-9- ]+)> velocity=<([0-9- ]+), ([0-9- ]+)>/).slice(1,5).map(x => +x)).map(x => ({p:[x[0],x[1]],v:[x[2],x[3]]}))

let getarea = n => {
  let x = [Infinity, -Infinity], y = [Infinity, -Infinity]
  for (let m of n) {
    x[0] = Math.min(x[0], m.p[0])
    x[1] = Math.max(x[1], m.p[0])
    y[0] = Math.min(y[0], m.p[1])
    y[1] = Math.max(y[1], m.p[1])
  }
  return (x[1]-x[0])*(y[1]-y[0])
}

let smol = Infinity

for (var time = 0; time < Infinity; time++) {
  let a = input.map(x => ({p:[x.p[0]+x.v[0], x.p[1]+x.v[1]], v:x.v}))
  let s = getarea(a)
  if (s > smol) break
  smol = s
  input = a
}

let x = [Infinity, -Infinity], y = [Infinity, -Infinity]
for (let m of input) {
  x[0] = Math.min(x[0], m.p[0])
  x[1] = Math.max(x[1], m.p[0])
  y[0] = Math.min(y[0], m.p[1])
  y[1] = Math.max(y[1], m.p[1])
}
let grid = Array(y[1]-y[0]+1).fill(0).map(() => Array(x[1]-x[0]+1).fill(' '))
for (let m of input) {
  grid[m.p[1]-y[0]][m.p[0]-x[0]] = '#'
}

console.log(grid.map(x => x.join('')).join('\n'))
console.log(time)
