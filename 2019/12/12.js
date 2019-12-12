let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').filter(x => x).map(x => x.match(/-?[0-9]+/g).map(y => parseInt(y)))

let poss = input.map(x => x.slice())
let vels = input.map(x => x.map(_ => 0))

for (let q = 1; q <= 1000; q++){
  vels = poss.map((pos, i) => pos.map((part, j) => vels[i][j] + poss.reduce((a,b) => a+Math.sign(b[j] - part), 0)))
  poss = poss.map((pos, i) => pos.map((part, j) => part + vels[i][j]))
}

console.log(poss.map((pos, i) => (pos.reduce((a,b) => a+Math.abs(b), 0)) * (vels[i].reduce((a,b) => a+Math.abs(b), 0))).reduce((a,b) => a+b))

poss = input.map(x => x.slice())
vels = input.map(x => x.map(_ => 0))
let xyz = [0,0,0]
for (let q = 1;; q++) {
  vels = poss.map((pos, i) => pos.map((part, j) => vels[i][j] + poss.reduce((a,b) => a+Math.sign(b[j] - part), 0)))
  poss = poss.map((pos, i) => pos.map((part, j) => part + vels[i][j]))
  xyz.forEach((_, i) => {
    if (!xyz[1] && vels.every(vel => vel[i] == 0) && poss.every((pos, j) => pos[i] == input[j][i])) xyz[i] = q
  })
  if (xyz.every(a => a)) break
}

let gcd = (a, b) => !b ? a : gcd(b, a % b)
let lcm = (a, b) => (a * b) / gcd(a, b)
console.log(lcm(lcm(xyz[0], xyz[1]), xyz[2]))
