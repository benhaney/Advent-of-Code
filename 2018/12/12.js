let input = require('fs').readFileSync('input', 'utf8').trim().split('\n')
let state = Array(400).fill('.').concat(input[0].split(': ')[1].split(''), Array(400).fill('.'))
let map = input.slice(2).map(x => x.split(' => ')).reduce((a,b)=>Object.assign(a, {[b[0]]:b[1]}), {})

for (let j = 0; j < 199; j++) {
  state = ['.','.'].concat(state).concat(['.','.']).map((x,i,r) => map[r.slice(i-2,i+3).join('')]).filter(x => x)
  if (j == 19) console.log(state.map((x,i) => x == '#' ? i - 400 : 0).reduce((a,b)=>a+b))
}
let diff = state.map((x,i) => x == '#' ? i - 400 : 0).reduce((a,b)=>a+b)
state = ['.','.'].concat(state).concat(['.','.']).map((x,i,r) => map[r.slice(i-2,i+3).join('')]).filter(x => x)
let now = state.map((x,i) => x == '#' ? i - 400 : 0).reduce((a,b)=>a+b)
diff = now - diff
console.log(now + diff*(50000000000-200))
