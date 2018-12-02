let m = require('fs').readFileSync('input', 'utf8').trim().split('\n').reduce((a,b)=>Object.assign(a, {[b.split(' <-> ')[0]]: b.split(' <-> ')[1].split(', ')}),{})
let groups = 0

// Part 1
let con = {'0': true}
let prevsize = 0
while (prevsize != Object.keys(con).length) {
  prevsize = Object.keys(con).length
  for (let key in m) {
    if (!con[key]) continue
    for (let num of m[key]) {
      con[num] = true
    }
  }
}
console.log(Object.keys(con).length)

// Part 2
con = {'0': true}
while (Object.keys(m).length > 0) {
  prevsize = 0
  while (prevsize != Object.keys(con).length) {
    prevsize = Object.keys(con).length
    for (let key in m) {
      if (!con[key]) continue
      for (let num of m[key]) {
        con[num] = true
      }
      delete m[key]
    }
  }
  groups++
  con = {[Object.keys(m)[0]]: true}
}
console.log(groups)
