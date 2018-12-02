let m = require('fs').readFileSync('input').toString().slice(0,-1).split('\n').map(a=>({op: a.split(' ')[0], d: a.split(' ').slice(1)}))

let regs = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 }
let getreg = reg => (Number.isNaN(+reg)) ? regs[reg]||0 : +reg

let muls = 0
for (let i = 0; i < m.length; i++) {
  let op = m[i].op
  let d = m[i].d
  if (op == 'set') regs[d[0]] = getreg(d[1])
  if (op == 'sub') regs[d[0]] -= getreg(d[1])
  if (op == 'mul') { regs[d[0]] *= getreg(d[1]); muls++}
  if (op == 'jnz' && getreg(d[0])!=0) i += getreg(d[1])-1
}
console.log(muls)


regs = { a: 1, b: 0, c: 0, f: 0, d: 0, e: 0, g: 0, h: 0 }

for (let i = 0; i != 9; i++) {
  let op = m[i].op
  let d = m[i].d
  if (op == 'set') regs[d[0]] = getreg(d[1])
  if (op == 'sub') regs[d[0]] -= getreg(d[1])
  if (op == 'mul') regs[d[0]] *= getreg(d[1])
  if (op == 'jnz' && getreg(d[0])!=0) i += getreg(d[1])-1
}

let comps = 0
for (let t = regs.b; t <= regs.c; t += 17) {
  for (let i = 2; i < Math.sqrt(t); i++) {
    if (!(t%i)) {comps++; break}
  }
}

console.log(comps)
