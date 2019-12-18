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

let [s] = run(input.slice())
s = s.map(c => String.fromCharCode(c)).join('').split('\n').filter(x => x).map(x => x.split(''))
console.log(s.flatMap((line,y,a) => line.map((c,x) => ([c,line[x-1],line[x+1],(a[y-1]||[])[x],(a[y+1]||[])[x]].every(r => r == '#')) ? x * y : false).filter(z => z)).reduce((a,b)=>a+b))

let buf = []
let dirs = '^>v<'.split('')
let [[dir, pos]] = s.flatMap((row, y) => row.map((c, x) => dirs.includes(c) ? [c,[x,y]] : false)).filter(x => x)

// Bleh
let left = dir => dirs[(dirs.indexOf(dir) + 3) % 4]
let right = dir => dirs[(dirs.indexOf(dir) + 1) % 4]
let ontrack = (pos, dir) => ({
  '>': () => s[pos[1]][pos[0]+1] == '#',
  '<': () => s[pos[1]][pos[0]-1] == '#',
  '^': () => (s[pos[1]-1]||[])[pos[0]] == '#',
  'v': () => (s[pos[1]+1]||[])[pos[0]] == '#'
})[dir]()

while (true) {
  // BLEH
  if (ontrack(pos, dir)) {
    buf.push(1)
    pos = ({
      '>':()=>[pos[0]+1,pos[1]],
      '<':()=>[pos[0]-1,pos[1]],
      '^':()=>[pos[0],pos[1]-1],
      'v':()=>[pos[0],pos[1]+1],
    })[dir]()
  } else if (ontrack(pos, left(dir))) {
    buf.push('L')
    dir = left(dir)
  } else if (ontrack(pos, right(dir))) {
    buf.push('R')
    dir = right(dir)
  } else {
    break
  }
}

buf = buf.join('').replace(/1/g, '-').split(/\b/g).map(x => ['L','R'].includes(x) ? x : ''+x.length)
let piece = buf => {
  // BLEHHHHHHHHH
  for (let i = 1; i < 11; i++) {
    let bi = buf.slice(0,i)
    let buf2 = buf.join().replace(new RegExp(bi.join(), 'g'), '').split(',').filter(x => x)
    for (let j = 1; j < 11; j++) {
      let bj = buf2.slice(0,j)
      let buf3 = buf2.join().replace(new RegExp(bj.join(), 'g'), '').split(',').filter(x => x)
      for (let k = 1; k < 11; k++) {
        let bk = buf3.slice(0,k)
        let buf4 = buf3.join().replace(new RegExp(bk.join(), 'g'), '').split(',').filter(x => x)
        if (buf4.length == 0) return [bi,bj,bk]
      }
    }
  }
}

let subs = piece(buf)

let main = []
while (buf.length) {
  for (let i in subs) {
    if (buf.join().startsWith(subs[i].join())) {
      main.push(i)
      buf = buf.slice(subs[i].length)
    }
  }
}

main = main.map(x => ['A','B','C'][+x])

let prog = [main, ...subs].map(x => x.join()).join('\n')+'\nn\n'

let [out] = run([2].concat(input.slice(1)), prog.split('').map(c => c.charCodeAt(0)))

console.log(out[out.length - 1])
