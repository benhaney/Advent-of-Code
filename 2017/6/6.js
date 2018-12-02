let s = require('fs').readFileSync('input', 'utf8').trim().split('\t').map(x => +x)
let seen = new Map()
let cycles = 0

for (;;) {
  let pos = s.indexOf(Math.max(...s))
  let blocks = s[pos]
  s[pos] = 0
  while (blocks) {
    pos = (pos + 1)%s.length
    s[pos]++
    blocks--
  }
  if (seen.get(s.join()) !== undefined) break
  seen.set(s.join(), cycles)
  cycles++
}

// Part 1
console.log(cycles+1)
// Part 2
console.log(seen.size - seen.get(s.join()))
