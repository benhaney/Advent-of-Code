let input = require('fs').readFileSync('input', 'utf8').split(',').filter(x => x).map(x => parseInt(x))

let run = (m, n, v) => {
  [m[1], m[2]] = [n, v]
  let fs = {"1":(a,b)=>a+b, "2":(a,b)=>a*b}
  for (let i = 0; i < m.length; i += 4) {
    if (fs[m[i]]) m[m[i+3]] = fs[m[i]](m[m[i+1]], m[m[i+2]]); else return m[0]
  }
}

console.log(run(input.slice(0), 12, 2))

for (let x = 0; x < 100; x++) {
  for (let y = 0; y < 100; y++) {
    if (run(input.slice(0), x, y) == 19690720) process.exit(console.log(100 * x + y))
  }
}
