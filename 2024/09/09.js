const input = require('fs').readFileSync('input', 'utf8').split('').map(x => +x)

let pop = (a,i) => {
  let x = null
  while (x === null && a.length > i+1) x = a.pop()
  return x
}

console.log(input.flatMap((x,i) => i % 2 ? Array(x).fill(null) : Array(x).fill(i >> 1)).map((x,i,a) => x === null ? pop(a,i) : x).reduce((a,b,i) => a+(b*i), 0))

let pop2 = (a, t) => {
  let end = a.findLastIndex(x => x == t)
  let start = a.findIndex(x => x == t)
  return [start, end - start + 1]
}

let find_gap = (buf, size) => buf.findIndex((x, i) => buf.slice(i, i+size).every(y => y === null))

let move = (buf, src, dst, len) => {
  for (let i = 0; i < len; i++) {
    buf[dst+i] = buf[src+i]
    buf[src+i] = null
  }
}

let buf = input.flatMap((x,i) => i % 2 ? Array(x).fill(null) : Array(x).fill(i >> 1))
for (let i = buf[buf.length-1]; i > 0; i--) {
  let [src, len] = pop2(buf, i)
  let dst = find_gap(buf, len)
  if (dst >= 0 && dst < src) move(buf, src, dst, len)
}
console.log(buf.reduce((a,b,i) => a+(b*i), 0))
