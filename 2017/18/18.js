let m = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(a=>({op: a.split(' ')[0], d: a.split(' ').slice(1)}))

let regs = {}
let getreg = reg => (Number.isNaN(+reg)) ? regs[reg]||0 : +reg

let i = 0
let snd
for (;;) {
  let {op, d} = m[i]
  if (op == 'set') regs[d[0]] = getreg(d[1])
  if (op == 'add') regs[d[0]] += getreg(d[1])
  if (op == 'mul') regs[d[0]] *= getreg(d[1])
  if (op == 'mod') regs[d[0]] %= getreg(d[1])
  if (op == 'jgz' && getreg(d[0])>0) i += getreg(d[1])-1
  if (op == 'rcv' && getreg(d[0])>0) break
  if (op == 'snd') snd = getreg(d[0])
  i++
}
console.log(snd)


let progs = [
  {i: 0, regs: {p:0}, queue: [], blocked: false},
  {i: 0, regs: {p:1}, queue: [], blocked: false}
]
regs = progs[0].regs

let sends1 = 0

let ex = id => {
  regs = progs[id].regs
  let i = progs[id].i
  let op = m[i].op
  let d = m[i].d
  if (op == 'set') regs[d[0]] = getreg(d[1])
  if (op == 'add') regs[d[0]] += getreg(d[1])
  if (op == 'mul') regs[d[0]] *= getreg(d[1])
  if (op == 'mod') regs[d[0]] %= getreg(d[1])
  if (op == 'jgz' && getreg(d[0])>0) i += getreg(d[1])-1
  if (op == 'snd') {
    progs[id?0:1].queue.push(getreg(d[0]))
    progs[id?0:1].blocked = false
    if (id) sends1++
  }
  if (op == 'rcv') {
    if (progs[id].queue.length > 0) {
      regs[d[0]] = progs[id].queue.shift()
    } else {
      progs[id].blocked = true
      return
    }
  }
  progs[id].i = i+1
}

for (;;) {
  ex(0)
  ex(1)
  if (progs[0].blocked && progs[1].blocked) break
}

console.log(sends1)
