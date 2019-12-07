let input = require('fs').readFileSync('input', 'utf8').trim().split(',').map(x => parseInt(x))

const [HALT, WAIT] = [Symbol("halt"), Symbol("wait")]

let run = (m, _in = [], ip = [0]) => {
  let _out = [];
  let r = ([inc, f], r1, r2) => (i => (g = f(r1 ? m[i+1] : i+1, r2 ? m[i+2] : i+2, i+3), typeof g === 'symbol' ? g : (ip[0] += inc)))
  let parts = n => [ops[n % 100], n % 1000 < 100, n < 1000]
  let ops = {
    "1":  [4, (x,y,z) => m[m[z]] = m[x] + m[y]],
    "2":  [4, (x,y,z) => m[m[z]] = m[x] * m[y]],
    "3":  [2, (x)     => _in.length ? (m[x] = _in.splice(0,1)[0]) : WAIT],
    "4":  [2, (x)     => _out.push(m[x])],
    "5":  [0, (x,y)   => m[x] ? (ip[0] = m[y]) : (ip[0] += 3)],
    "6":  [0, (x,y)   => !m[x] ? (ip[0] = m[y]) : (ip[0] += 3)],
    "7":  [4, (x,y,z) => m[m[z]] = (m[x] < m[y]) ? 1 : 0],
    "8":  [4, (x,y,z) => m[m[z]] = (m[x] == m[y]) ? 1 : 0],
    "99": [0, ()      => HALT]
  }
  while (true) {
    let res = r(...parts(m[ip[0]]))(ip[0])
    if (typeof res == 'symbol') return [_out, res]
  }
}

let permutations = x => x.reduce(p=(a,b,c,d)=>a.concat(d.length>1&&d.slice(0,c).concat(d.slice(c+1)).reduce(p,[]).map(e=>[b].concat(e))||b),[])

console.log(Math.max(...permutations([0,1,2,3,4]).map(perm => perm.slice(0).reduce((a,b) => run(input.slice(0), [b, a])[0][0], 0))))

console.log(Math.max(...permutations([5,6,7,8,9]).map(perm => {
  let nodes = perm.map(phase => [input.slice(0), [phase], [0]])
  for (let [idx, out, res] = [0, [0],];; idx = (idx + 1) % nodes.length) {
    if (out.length) nodes[idx][1].push(out[0])
    ;[out, res] = run(...nodes[idx])
    if (res === HALT && idx == nodes.length - 1) return out[0]
  }
})))
