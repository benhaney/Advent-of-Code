let m = require('fs').readFileSync('input', 'utf8').split(',').map(x => +x)

let list = Array.from({length: 256}).map((x,i)=>i)
let skip = 0, dpos = 0

for (let o of m) {
  list = list.concat(list.splice(0,o).reverse())
  list = list.concat(list.splice(0,skip%256))
  dpos += ((skip%256)+o)
  skip++
}
list = list.splice(-(dpos%256)).concat(list)
console.log(list[0]*list[1])


let m2 = m.join().split('').map(a=>a.charCodeAt(0)).concat([17,31,73,47,23])
list = Array.from({length: 256}).map((x,i)=>i)
skip = dpos = 0

Array.from({length: 64}).forEach(() => {
  for (let o of m2) {
    list = list.concat(list.splice(0,o).reverse())
    list = list.concat(list.splice(0,skip%256))
    dpos += ((skip%256)+o)
    skip++
  }
})

list = list.splice(-(dpos%256)).concat(list)
let list2 = []
while (list.length) {
  list2.push(list.splice(0,16).reduce((a,b)=>a^b,0))
}
console.log(list2.map(a=>a.toString(16).padStart(2,'0')).join(''))
