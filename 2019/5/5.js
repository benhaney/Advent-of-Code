let input = require('fs').readFileSync('input', 'utf8').trim().split(',').map(x => parseInt(x))

let run = (m, _in) => {
  let [_out, ip] = [[], 0];
  let r = ([inc, f], r1, r2) => (f ? (i => (f(r1 ? m[i+1] : i+1, r2 ? m[i+2] : i+2, i+3), ip += inc)) : (() => false))
  let parts = n => [ops[n % 100], n % 1000 < 100, n < 1000]
  let ops = {
    "1": [4, (x,y,z) => m[m[z]] = m[x] + m[y]],
    "2": [4, (x,y,z) => m[m[z]] = m[x] * m[y]],
    "3": [2, (x)     => m[x] = _in],
    "4": [2, (x)     => _out.push(m[x])],
    "5": [0, (x,y)   => m[x] ? (ip = m[y]) : (ip += 3)],
    "6": [0, (x,y)   => !m[x] ? (ip = m[y]) : (ip += 3)],
    "7": [4, (x,y,z) => m[m[z]] = (m[x] < m[y]) ? 1 : 0],
    "8": [4, (x,y,z) => m[m[z]] = (m[x] == m[y]) ? 1 : 0],
    "99": [0, false]
  }
  while (true) if (r(...parts(m[ip]))(ip) === false) break
  return _out
}

console.log(run(input.slice(0), 1).slice(-1)[0])
console.log(run(input.slice(0), 5)[0])
