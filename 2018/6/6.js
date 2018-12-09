let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => x.split(', ').map(y => +y))

let bounds = [0,1].map(z => [0,input.length-1].map(y => input.map(x => x[z]).sort((a,b)=>a-b)[y]))

let m = [...Array(bounds[0][1]-bounds[0][0])].map(() => Array(bounds[1][1]-bounds[1][0]).fill(false))
let j = input.map((x,i) => [i,[x[0]-bounds[0][0],x[1]-bounds[1][0]]])
let dist = (p1,p2) => Math.abs(p1[0]-p2[0])+Math.abs(p1[1]-p2[1])
let mark = c => {
  let r = j.sort((a,b)=>dist(a[1],c)-dist(b[1],c)).slice(0,2)
  if (dist(r[0][1],c) == dist(r[1][1],c)) return '.'
  return r[0][0]
}
for (let y in m) {
  for (let x in m[y]) {
    m[y][x] = mark([+y,+x])
  }
}

let areas = {}
;[].concat(...m).forEach(x => areas[x] = (areas[x]||0)+1)
for (let y in m) {
  for (let x in m[y]) {
    if (bounds[0].includes(y) || bounds[1].includes(x)) areas[m[y][x]] = 0
  }
}
console.log(Object.values(areas).sort((a,b)=>b-a)[0])

let calc = c => j.reduce((a,b)=>a+dist(b[1], c), 0)
for (let y in m) {
  for (let x in m[y]) {
    m[y][x] = calc([+y,+x])
  }
}
console.log([].concat(...m).filter(x => x < 10000).length)
