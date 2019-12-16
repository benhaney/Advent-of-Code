let input = require('fs').readFileSync('input', 'utf8').trim().split(',').map(x => parseInt(x))

const [HALT, OUTPUT, INPUT] = [Symbol("halt"), Symbol("output"), Symbol("input")]

let run = (m, _in = [], ip = [0], rbase = [0]) => {
  let _out = [];
  let mode = (r, i) => r == 2 ? m[i]+rbase[0] : (r == 1 ? i : m[i])
  let r = ([inc, f], r1, r2, r3) => (i => (g = f(mode(r1, i+1), mode(r2, i+2), mode(r3, i+3)), typeof g == 'symbol' ? g : (ip[0] += inc)))
  let parts = n => [ops[n % 100], Math.floor((n % 1000) / 100), Math.floor((n % 10000) / 1000), Math.floor((n % 100000) / 10000)]
  let ops = {
    "1":  [4, (x,y,z) => m[z] = (m[x] || 0) + (m[y] || 0)],
    "2":  [4, (x,y,z) => m[z] = (m[x] || 0) * (m[y] || 0)],
    "3":  [2, (x)     => _in.length ? m[x] = _in.splice(0,1)[0] : INPUT],
    "4":  [2, (x)     => _out.push(m[x])],
    "5":  [0, (x,y)   => (m[x] || 0) ? (ip[0] = (m[y] || 0)) : (ip[0] += 3)],
    "6":  [0, (x,y)   => !(m[x] || 0) ? (ip[0] = (m[y] || 0)) : (ip[0] += 3)],
    "7":  [4, (x,y,z) => m[z] = ((m[x] || 0) < (m[y] || 0)) ? 1 : 0],
    "8":  [4, (x,y,z) => m[z] = ((m[x] || 0) == (m[y] || 0)) ? 1 : 0],
    "9":  [2, (x)     => rbase[0] += m[x]],
    "99": [0, ()      => HALT]
  }
  while (true) {
    let res = r(...parts(m[ip[0]]))(ip[0])
    if (typeof res == 'symbol') return [_out, res, ip[0], rbase[0]]
  }
}

let dirs = {'1': [0,-1], '2': [0,1], '3': [-1,0], '4': [1,0]}
let add = (d1, d2) => d1.map((x,i) => x + d2[i])

let ostate = []
let fill = (inp, level = 1, ip = 0, rbase = 0, m = {}, pos = [0,0]) => {
  Object.entries(dirs).forEach(([bin, d]) => {
    let inp2 = inp.slice()
    let [[o], res, ip2, rbase2] = run(inp2, [+bin], [ip], [rbase])
    let p = add(pos, d)
    if (m[p] && m[p][1] <= level) return
    m[p] = [['#','.','o'][o], level]
    if (o == 0) return
    if (o == 2) ostate = [inp2, ip2, rbase2]
    fill(inp2, level+1, ip2, rbase2, m, p)
  })
  return m
}

let [pos, [_, lv]] = Object.entries(fill(input.slice())).find(x => x[1][0] == 'o')
console.log(lv)
console.log(Math.max(...Object.values(fill(ostate[0], 1, ostate[1], ostate[2])).filter(x => x[0] == '.').map(x => x[1])))
