let input = require('fs').readFileSync('input', 'utf8').match(/[0-9]+/g).map(x => +x)

for (let mult of [1,100]) {
  let scores = Array(input[0]).fill(0)
  let c = {v:0}
  c.n = c.p = c
  for (let i = 1; i <= input[1]*mult; i++) {
    if (i % 23) {
      let node = {v:i, p:c.n, n:c.n.n}
      c = c.n.n = c.n.n.p = node
    } else {
      scores[(i-1)%input[0]] += i + c.p.p.p.p.p.p.p.v
      c.p.p.p.p.p.p.p.p.n = c.p.p.p.p.p.p
      c.p.p.p.p.p.p.p = c.p.p.p.p.p.p.p.p
      c = c.p.p.p.p.p.p
    }
  }
  console.log(Math.max(...scores))
}
