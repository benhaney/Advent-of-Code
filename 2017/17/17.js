let m = +require('fs').readFileSync('input', 'utf8')

let a = [0]
let pos = 0
for (let i = 1; i <= 2017; i++) {
  pos = (pos+m+1)%a.length
  a = a.slice(0,pos).concat([i]).concat(a.slice(pos))
}
console.log(a[pos+1])

let b = 0
pos = 0
for (let i = 0; i < 5e7; i++) {
  pos = (pos+m+1)%(i+1)
  b = pos ? b : i+1
}
console.log(b)
