let input = require('fs').readFileSync('input', 'utf8').trim().split(',').map(x => parseInt(x))

const [HALT, WAIT] = [Symbol("halt"), Symbol("wait")]

let run = (m, _in = [], ip = [0]) => {
  let _out = [];
  let rbase = 0
  let mode = (r, i) => r == 2 ? m[i]+rbase : (r == 1 ? i : m[i])
  let r = ([inc, f], r1, r2, r3) => (i => (g = f(mode(r1, i+1), mode(r2, i+2), mode(r3, i+3)), typeof g === 'symbol' ? g : (ip[0] += inc)))
  let parts = n => [ops[n % 100], Math.floor((n % 1000) / 100), Math.floor((n % 10000) / 1000), Math.floor((n % 100000) / 10000)]
  let ops = {
    "1":  [4, (x,y,z) => m[z] = (m[x] || 0) + (m[y] || 0)],
    "2":  [4, (x,y,z) => m[z] = (m[x] || 0) * (m[y] || 0)],
    "3":  [2, (x)     => _in.length ? (m[x] = _in.splice(0,1)[0]) : WAIT],
    "4":  [2, (x)     => _out.push(m[x])],
    "5":  [0, (x,y)   => (m[x] || 0) ? (ip[0] = (m[y] || 0)) : (ip[0] += 3)],
    "6":  [0, (x,y)   => !(m[x] || 0) ? (ip[0] = (m[y] || 0)) : (ip[0] += 3)],
    "7":  [4, (x,y,z) => m[z] = ((m[x] || 0) < (m[y] || 0)) ? 1 : 0],
    "8":  [4, (x,y,z) => m[z] = ((m[x] || 0) == (m[y] || 0)) ? 1 : 0],
    "9":  [2, (x)     => rbase += m[x]],
    "99": [0, ()      => HALT]
  }
  while (true) {
    let res = r(...parts(m[ip[0]]))(ip[0])
    if (typeof res == 'symbol') return [_out, res]
  }
}

console.log(run(input.slice(0), [1])[0][0])
console.log(run(input.slice(0), [2])[0][0])
