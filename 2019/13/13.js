let input = require('fs').readFileSync('input', 'utf8').trim().split(',').map(x => parseInt(x))

const [HALT, OUTPUT, INPUT] = [Symbol("halt"), Symbol("output"), Symbol("input")]

let run = (m, _in = [], ip = [0], rbase = [0]) => {
  let _out = [];
  let mode = (r, i) => r == 2 ? m[i]+rbase[0] : (r == 1 ? i : m[i])
  let r = ([inc, f], r1, r2, r3) => (i => (g = f(mode(r1, i+1), mode(r2, i+2), mode(r3, i+3)), (ip[0] += inc), g))
  let parts = n => [ops[n % 100], Math.floor((n % 1000) / 100), Math.floor((n % 10000) / 1000), Math.floor((n % 100000) / 10000)]
  let ops = {
    "1":  [4, (x,y,z) => m[z] = (m[x] || 0) + (m[y] || 0)],
    "2":  [4, (x,y,z) => m[z] = (m[x] || 0) * (m[y] || 0)],
    "3":  [2, (x)     => m[x] = _in[0]],
    "4":  [2, (x)     => (_out.push(m[x]), OUTPUT)],
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

let game = inp => {
  let [m, score, ballx, paddlex, ip, rbase, buf] = [{}, 0, 0, 0, [0], [0], []]
  while (true) {
    let [[o], res] = run(inp, [Math.sign(ballx - paddlex)], ip, rbase)
    if (res == OUTPUT) buf.push(o)
    if (buf.length > 2) {
      let [x,y,t] = buf.splice(0,3)
      if (x == -1 && y == 0) score = t
      else m[[x,y]] = t
      if (t == 3) paddlex = x
      if (t == 4) ballx = x
    }
    if (res == HALT) break
  }
  return [m, score]
}

console.log(Object.values(game(input.slice())[0]).filter(x => x == 2).length)

console.log(game([2].concat(input.slice(1)))[1])
