let m = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(a=>a.split('/').map(b=>+b))

let max = {l:0, s:0, a:0}

let comp = (a, b) => {
  max.a = Math.max(max.a, a.reduce((x,y)=>x+y,0))
  if (a.length == max.l) {
    max.s = Math.max(max.s, a.reduce((x,y)=>x+y,0))
  } else if (a.length > max.l) {
    max.s = a.reduce((x,y)=>x+y,0)
    max.l = a.length
  }
  for (let i in b) {
    if (b[i][0] == a.slice(-1)[0]) {
      comp(a.concat(b[i]), b.slice(0,i).concat(b.slice((+i)+1)))
    } else if (b[i][1] == a.slice(-1)[0]) {
      comp(a.concat(b[i].reverse()), b.slice(0,i).concat(b.slice((+i)+1)))
    }
  }
}

comp([0], m)

console.log(max.a)
console.log(max.s)
