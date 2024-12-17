const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(''))

let key = (y,x) => (y << 16) + x
let ds = [[-1,0],[0,1],[1,0],[0,-1]]
let next = (y, x, d) => [y+ds[d][0], x+ds[d][1]]
let obs = new Set()

let f = (y, x, d, inp, inner = false) => {
  let t = {[key(y,x)]: 1 << d}
  while (true) {
    let [ny, nx] = next(y,x,d)
    if (!(inp[ny] && inp[ny][nx])) return [false, t]
    if (inp[ny][nx] == '#') {
      d = (d+1)%4
      continue
    } else if (!inner && !t[key(ny,nx)] && !obs.has(key(ny,nx))) {
      if (f(y,x,d,inp.map((a,i) => a.map((b,j) => (i==ny && j==nx) ? '#' : b)), true)[0]) obs.add(key(ny,nx))
    }
    ;[y,x] = next(y,x,d)
    if (inner && ((t[key(y,x)] >> d) & 1)) return [true, t]
    t[key(y,x)] = (t[key(y,x)] || 0) | (1 << d)
  }
}

console.log(Object.keys(f(input.findIndex(x => x.includes('^')), input.find(x => x.includes('^')).findIndex(x => x == '^'), 0, input)[1]).length)
console.log(obs.size)
