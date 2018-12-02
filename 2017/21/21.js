let n = require('fs').readFileSync('in21').toString().slice(0,-1).split('\n').map(a=>a.split(' => '))
let m = {}

let rotate = a => a[0].map((x,i)=>a.map(x=>x[i])).reverse()
let flip = a => a.reverse()
let flop = a => a.map(b=>b.reverse())

for (let o of n) {
  m[o[0]] = o[1]
  m[rotate(o[0].split('/').map(a=>a.split(''))).map(a=>a.join('')).join('/')] = o[1]
  m[rotate(rotate(o[0].split('/').map(a=>a.split('')))).map(a=>a.join('')).join('/')] = o[1]
  m[rotate(rotate(rotate(o[0].split('/').map(a=>a.split(''))))).map(a=>a.join('')).join('/')] = o[1]
  m[rotate(flip(o[0].split('/').map(a=>a.split('')))).map(a=>a.join('')).join('/')] = o[1]
  m[rotate(flop(o[0].split('/').map(a=>a.split('')))).map(a=>a.join('')).join('/')] = o[1]
  m[flip(o[0].split('/').map(a=>a.split(''))).map(a=>a.join('')).join('/')] = o[1]
  m[flop(o[0].split('/').map(a=>a.split(''))).map(a=>a.join('')).join('/')] = o[1]
  m[flop(flip(o[0].split('/').map(a=>a.split('')))).map(a=>a.join('')).join('/')] = o[1]
}

for (let zz of [5, 18]) {
  let x = '.#./..#/###'.split('/').map(a=>a.split(''))
  for (let q = 0; q < zz; q++) {
    let tt = (x.length%2) ? 3 : 2
    let secs = []
    let size = x.length/tt
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        secs.push(x.slice(i*tt, i*tt+tt).map(y=>y.slice(j*tt, j*tt+tt)))
      }
    }
    secs = secs.map(sec=>m[sec.map(a=>a.join('')).join('/')].split('/').map(a=>a.split(''))).reverse()
    let rows = Array.from({length: size*(tt+1)}).map(()=>[])
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let sec = secs.pop()
        for (let k = 0; k < tt+1; k++) {
          rows[k+(i*(tt+1))] = rows[k+(i*(tt+1))].concat(sec[k])
        }
      }
    }
    x = rows
  }
  console.log(x.map(a=>a.join('')).join('').split('').filter(a=>a=='#').length)
}
