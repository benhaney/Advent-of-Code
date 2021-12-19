let [found, ...rem] = require('fs').readFileSync('input', 'utf8').split('\n\n').map(x => x.split('\n').filter(y => y).slice(1).map(z => z.split(',').map(q => +q)))

let rots = [...new Set('RTTTRTTTRTTTRTRRTTTRTTTRTTT'.split('').map(a => (([[xs,x],[ys,y],[zs,z]]) => (a == 'R' ? [[xs,x],[zs,z],[-ys,y]] : [[-ys,y],[xs,x],[zs,z]]))).reduce((a,b) => [b(a[0])].concat(a), [[[1,0],[1,1],[1,2]]]).map(JSON.stringify))].map(JSON.parse)

offs = [[0,0,0]]

let try_join = m => {
  for (let [[as,a],[bs,b],[cs,c]] of rots) {
    let m_rot = m.map(x => [as*x[a],bs*x[b],cs*x[c]])
    let offset = Object.entries(m_rot.reduce((os, b2) => found.reduce((os, b1) => [b2.map((x,i)=>b1[i]-x).join()].map(o => Object.assign(os, {[o]: (os[o]||0) + 1}))[0], os), {})).filter(([_,v])=>v>=12)[0]
    if (offset) {
      offs.unshift(offset[0].split(',').map(x => +x))
      found = [...new Set(found.concat(m_rot.map(x => x.map((y,i) => y+offs[0][i]))).map(JSON.stringify))].map(JSON.parse)
      return true
    }
  }
}

while (rem.length) rem = rem.filter(x => !try_join(x))

console.log(found.length)

console.log(Math.max(...offs.map(o1 => offs.map(o2 => o1.map((x,i)=>Math.abs(x-o2[i])).reduce((a,b)=>a+b))).flat()))
