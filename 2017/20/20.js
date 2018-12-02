let m = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(l=>l.split(', ').reduce((a,b)=>Object.assign(a, {[b.split('=')[0]]: b.split('=')[1].slice(1,-1).split(',').map(n=>+n)}),{}))

let min = [0, Infinity]
for (let i in m) {
  let t = m[i].a.reduce((a,b)=>a+Math.abs(b),0)
  if (t < min[1]) min = [i, t]
}
console.log(min[0])

for (let i = 0; i < 40; i++) {
  for (let p in m) {
    if (!m[p]) continue
    m[p].v = m[p].v.map((a,i)=>a+m[p].a[i])
    m[p].p = m[p].p.map((a,i)=>a+m[p].v[i])
  }
  for (let p in m) {
    if (!m[p]) continue
    let col = false
    for (let pp in m) {
      if (pp == p || !m[pp]) continue
      if (m[p].p.reduce((a,b,c)=>a+Math.abs(b-m[pp].p[c]),0) == 0) {
        m[pp] = false
        col = true
      }
    }
    if (col) m[p] = false
  }
}

console.log(m.filter(a=>a).length)
