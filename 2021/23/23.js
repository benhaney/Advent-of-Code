let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).slice(1,-1).map(x => x.split(''))

let ss = {A:1,B:10,C:100,D:1000}
let pp = {A:3,B:5,C:7,D:9}

let f = gg => {
  let cache = {}
  let ff = (g, s) => {
    let key = g.flat().join('')
    if (cache[key]) return cache[key] + s
    let ats = [Infinity]
    if ([3,5,7,9].every(x => [1,2,3,4].every(y => !g[y] || pp[g[y][x]] == x))) return s
    for (let x of [3,5,7,9]) {
      let y = [1,2,3,4].find(y => g[y] && g[y][x] != '.')
      if (!y) continue
      if (g.slice(y).every(gl => pp[gl[x]] == x)) continue
      for (let x2 of [1,2,4,6,8,10,11]) {
        if (g[0].slice(Math.min(x,x2), Math.max(x,x2)+1).some(c => c != '.')) continue
        let gg = g.map(z => z.slice())
        gg[0][x2] = gg[y][x]
        gg[y][x] = '.'
        ats.push(ff(gg, s + (ss[gg[0][x2]] * (Math.abs(x2-x)+y))))
      }
    }
    for (let x of [1,2,4,6,8,10,11]) {
      if (g[0][x] == '.') continue
      let x2 = pp[g[0][x]]
      if (!g.slice(1).every(gl => gl[x2] == '.' || gl[x2] == g[0][x])) continue
      let t = g[0][x]
      g[0][x] = '.'
      let bad = (g[0].slice(Math.min(x,x2), Math.max(x,x2)+1).some(c => c != '.'))
      g[0][x] = t
      if (bad) continue
      let gg = g.map(z => z.slice())
      let y = [4,3,2,1].find(y => g[y] && g[y][x2] == '.')
      gg[y][x2] = gg[0][x]
      gg[0][x] = '.'
      ats.push(ff(gg, s + (ss[gg[y][x2]] * (Math.abs(x2-x)+y))))
    }

    let best = Math.min(...ats)
    cache[key] = best - s
    return best
  }
  return ff(gg.map(z => z.slice()), 0)
}

console.log(f(input))
console.log(f(input.slice(0,2).concat(['  #D#C#B#A#  '.split(''),'  #D#B#A#C#  '.split(''), input[2]])))
