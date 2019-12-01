let [input1, input2] = require('fs').readFileSync('input', 'utf8').split('\n\n\n\n').map(i => i.trim())
input1 = input1.split('\n\n').map(x => x.split('\n').map(y => y.match(/([0-9]+),? ([0-9]+),? ([0-9]+),? ([0-9]+)/).slice(1,5).map(z => +z)))
input2 = input2.split('\n').map(x => x.split(' ').map(y => +y))

let ops = {
  addr: (rs, i1, i2) => rs[i1] + rs[i2],
  addi: (rs, i1, i2) => rs[i1] + i2,
  mulr: (rs, i1, i2) => rs[i1] * rs[i2],
  muli: (rs, i1, i2) => rs[i1] * i2,
  banr: (rs, i1, i2) => rs[i1] & rs[i2],
  bani: (rs, i1, i2) => rs[i1] & i2,
  borr: (rs, i1, i2) => rs[i1] | rs[i2],
  bori: (rs, i1, i2) => rs[i1] | i2,
  setr: (rs, i1)     => rs[i1],
  seti: (rs, i1)     => i1,
  gtir: (rs, i1, i2) => +(i1 > rs[i2]),
  gtri: (rs, i1, i2) => +(rs[i1] > i2),
  gtrr: (rs, i1, i2) => +(rs[i1] > rs[i2]),
  eqir: (rs, i1, i2) => +(i1 == rs[i2]),
  eqri: (rs, i1, i2) => +(rs[i1] == i2),
  eqrr: (rs, i1, i2) => +(rs[i1] == rs[i2])
}

let codes = [...Array(16)].map(() => Object.keys(ops))

console.log(input1.filter(x => Object.values(ops).filter(op => op(x[0], x[1][1], x[1][2]) == x[2][x[1][3]]).length >= 3).length)

input1.forEach(x => {
  let cands = Object.entries(ops).filter(op => op[1](x[0], x[1][1], x[1][2]) == x[2][x[1][3]]).map(op => op[0])
  codes[x[1][0]] = codes[x[1][0]].filter(code => cands.includes(code))
})
codes.forEach(() => codes.forEach((cands, i) => {
  if (cands.length == 1) codes = codes.map((xs,ii) => xs.filter(x => x != cands[0] || i == ii))
}))
codes = codes.map(x => x[0])

let regs = [0,0,0,0]
input2.forEach(x => {
  regs[x[3]] = ops[codes[x[0]]](regs, x[1], x[2])
})
console.log(regs[0])
