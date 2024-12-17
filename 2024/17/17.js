const [regs, p] = [require('fs').readFileSync('input', 'utf8').split('\n\n')].map(([x,y]) => [x.match(/[0-9]+/g).map(z => +z), y.match(/[0-9,]+/g)[0].split(',').map(z => +z)])[0]

let exec = (r, p) => {
  r = r.map(x => BigInt(x))
  let combo = n => BigInt(n < 4 ? n : r[n-4])
  let out = []
  let i = 0
  while (true) {
    if (p[i] === undefined) break
    [
      n => r[0] = r[0] >> combo(n),
      n => r[1] = r[1] ^ BigInt(n),
      n => r[1] = combo(n) % 8n,
      n => i = r[0] ? n - 2 : i,
      n => r[1] = r[1] ^ r[2],
      n => out.push(Number(combo(n) % 8n)),
      n => r[1] = r[0] >> combo(n),
      n => r[2] = r[0] >> combo(n)
    ][p[i]](p[i+1])
    i += 2
  }
  return out
}

console.log(exec(regs, p).join())

console.log([f = (n, j) => Array(8).fill().map((_,i) => BigInt(i)).reduce((a,i) => a || ((exec([n+i,0n,0n], p).join() == p.slice(j).join()) ? (j ? f((n+i) << 3n, j-1) : n+i) : false), false)].map(f => Number(f(0n, p.length - 1)))[0])
