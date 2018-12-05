let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => x.split(/[# @,:x]/).filter(y => y).map(y => +y))

let cands = input.reduce((a,b)=>Object.assign(a, {[b[0]]: true}), {})
let counts = [...Array(1000)].map(() => Array(1000).fill(0))
let occs = [...Array(1000)].map(() => Array(1000).fill(false))
input.forEach(i => {
  for (let x = i[1]; x < i[1]+i[3]; x++) {
    for (let y = i[2]; y < i[2]+i[4]; y++) {
      if (counts[x][y]) cands[i[0]] = cands[occs[x][y]] = false
      counts[x][y] += 1
      occs[x][y] = i[0]
    }
  }
})
console.log(counts.map(x => x.filter(y => y > 1).length).reduce((a,b)=>a+b))
console.log(Object.entries(cands).filter(x => x[1])[0][0])
