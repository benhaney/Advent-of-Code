let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').filter(x => x).map(x => x.split(' => '))

let m = Object.fromEntries(input.map(([i,o])=>[o.split(' ')[1],{amt:+o.split(' ')[0],ing:i.split(', ').map(x=>[x.split(' ')[0],x.split(' ')[1]])}]))

let raw = (k, c, ex = {}) => {
  if (k == 'ORE') return c
  if (ex[k]) [c, ex[k]] = [c, ex[k]].map(x => x - Math.min(ex[k], c))
  ex[k] = (ex[k] || 0) + m[k].amt * Math.ceil(c / m[k].amt) - c
  return m[k].ing.map(([c2, k2]) => raw(k2, c2 * Math.ceil(c / m[k].amt), ex)).reduce((a,b) => a+b)
}

console.log(raw('FUEL', 1))

let [lo, hi] = [0, 1e12]
while (true) {
  let i = lo + Math.floor((hi - lo) / 2)
  if (!((raw('FUEL', i) > 1e12) ? hi = i : ((raw('FUEL', i+1) < 1e12) ? lo = i : 0))) {
    console.log(i)
    break
  }
}
