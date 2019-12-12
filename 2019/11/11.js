let input = require('fs').readFileSync('input', 'utf8').trim().split(',').map(x => parseInt(x))

const [HALT, WAIT] = [Symbol("halt"), Symbol("wait")]

let run = (m, _in = [], ip = [0], rbase = [0]) => {
  let _out = [];
  let mode = (r, i) => r == 2 ? m[i]+rbase[0] : (r == 1 ? i : m[i])
  let r = ([inc, f], r1, r2, r3) => (i => (g = f(mode(r1, i+1), mode(r2, i+2), mode(r3, i+3)), (ip[0] += inc), g))
  let parts = n => [ops[n % 100], Math.floor((n % 1000) / 100), Math.floor((n % 10000) / 1000), Math.floor((n % 100000) / 10000)]
  let ops = {
    "1":  [4, (x,y,z) => m[z] = (m[x] || 0) + (m[y] || 0)],
    "2":  [4, (x,y,z) => m[z] = (m[x] || 0) * (m[y] || 0)],
    "3":  [2, (x)     => m[x] = _in[0]],
    "4":  [2, (x)     => (_out.push(m[x]), WAIT)],
    "5":  [0, (x,y)   => (m[x] || 0) ? (ip[0] = (m[y] || 0)) : (ip[0] += 3)],
    "6":  [0, (x,y)   => !(m[x] || 0) ? (ip[0] = (m[y] || 0)) : (ip[0] += 3)],
    "7":  [4, (x,y,z) => m[z] = ((m[x] || 0) < (m[y] || 0)) ? 1 : 0],
    "8":  [4, (x,y,z) => m[z] = ((m[x] || 0) == (m[y] || 0)) ? 1 : 0],
    "9":  [2, (x)     => rbase[0] += m[x]],
    "99": [0, ()      => HALT]
  }
  while (true) {
    let res = r(...parts(m[ip[0]]))(ip[0])
    if (typeof res == 'symbol') return [_out, res]
  }
}

let robot = (inp, m) => {
  let [pos, dir, ip, rbase] = [[0,0], [0,-1], [0], [0]]
  while (true) {
    [[c], _] = run(inp, [m[pos] || 0], ip, rbase)
    ;[[r], res] = run(inp, [m[pos] || 0], ip, rbase)
    if (res == HALT) break
    m[pos] = c
    dir = r ? [-dir[1], dir[0]] : [dir[1], -dir[0]]
    pos = [pos[0] + dir[0], pos[1] + dir[1]]
  }
  return m
}

console.log(Object.values(robot(input.slice(), {})).length)

let o = []
Object.entries(robot(input.slice(), {'0,0':1})).forEach(([p, v]) => {
  let pos = p.split(',').map(x => parseInt(x))
  if (!o[pos[1]]) o[pos[1]] = []
  o[pos[1]][pos[0]] = v
})
console.log(o.map(row => [...row].map(x => x ? "#" : " ").join('')).join('\n'))
