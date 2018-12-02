let m = require('fs').readFileSync('input', 'utf8').trim().split(',').map(a=>[a[0], a.slice(1).split('/')])
let a = 'abcdefghijklmnop'.split('')
let limit = 1e9
for (let i = 0; i < limit; i++) {
  for (let o of m) {
    if (o[0] == 's') {
      a = a.splice(-o[1]).concat(a)
    }
    if (o[0] == 'x') {
      let tmp = a[o[1][0]]
      a[o[1][0]] = a[o[1][1]]
      a[o[1][1]] = tmp
    }
    if (o[0] == 'p') {
      let n = a.indexOf(o[1][0])
      let m = a.indexOf(o[1][1])
      let tmp = a[n]
      a[n] = a[m]
      a[m] = tmp
    }
  }
  if (limit != 1e9 && i == 1) console.log(a.join(''))
  if (limit == 1e9 && a.join('') == 'abcdefghijklmnop') {
    limit = 1e9%(i+1)+1
    i = 0
  }
}

console.log(a.join(''))
