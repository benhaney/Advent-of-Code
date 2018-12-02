let m = require('fs').readFileSync('input', 'utf8').trim()

let knot = s => {
  s = s.split('').map(a=>a.charCodeAt(0)).concat([17,31,73,47,23])
  let skip = 0
  let dpos = 0
  let list = Array.from({length: 256}).map((x,i)=>i)
  Array.from({length: 64}).forEach(() => {
    for (let o of s) {
      list = list.concat(list.splice(0,o).reverse())
      list = list.concat(list.splice(0, skip % 256))
      dpos += ((skip % 256)+o)
      skip++
    }
  })
  list = list.splice(-(dpos%256)).concat(list)
  let list2 = []
  while (list.length) {
    list2.push(list.splice(0,16).reduce((a,b)=>a^b,0))
  }
  return list2.map(a=>a.toString(16).padStart(2,'0')).join('')
}

let disk_str = ''
let disk = []

for (let i = 0; i < 128; i++) {
  let k = knot(`${m}-${i}`).split('').map(a=>parseInt(a, 16).toString(2).padStart(4,'0')).join('')
  disk_str += k
  disk.push(k.split('').map(a=>(a=='1')?1:0))
}
console.log(disk_str.split('').filter(a=>a=='1').length)

let groups = 0

let group = (y,x) => {
  disk[y][x] = 0
  if (disk[y+1] && disk[y+1][x] == 1) { group(y+1,x) }
  if (disk[y-1] && disk[y-1][x] == 1) { group(y-1,x) }
  if (disk[y][x+1] == 1) { group(y,x+1) }
  if (disk[y][x-1] == 1) { group(y,x-1) }
}

for (let y in disk) {
  for (let x in disk[y]) {
    if (disk[y][x] == 1) {
      group(+y,+x)
      groups++
    }
  }
}
console.log(groups)
