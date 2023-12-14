const input = require('fs').readFileSync('input', 'utf8')

let [rotcw, rotccw] = [(x,j,a,i) => a[a.length - j - 1][i], (x,j,a,i) => x[x.length - 1 - i]].map(f => r => [r.split('\n').map(x => x.split(''))].map(a => a[0].map((_,i) => a.map((x,j,a) => f(x,j,a,i)).join('')).join('\n'))[0])

let roll = (r, d = false) => {
  while (!d) r = (d = true, r.replaceAll(/(\.+)O/g, (_,x) => (d = false, `O${x}`)))
  return r
}

console.log(roll(rotccw(input)).split('\n').map(x => x.split('').map((y, i) => y == 'O' ? x.length - i : 0)).flat().reduce((a,b) => a+b))


let [last, set] = [rotccw(input), {}]
for (let i = 0; i < 1e9; i++) {
  last = [1,2,3,4].reduce(a => rotcw(roll(a)), last)
  if (set[last]) i += Math.floor((1e9-i) / (i-set[last])) * (i-set[last])
  set[last] = i
}

console.log(last.split('\n').map(x => x.split('').map((y, i) => y == 'O' ? x.length - i : 0)).flat().reduce((a,b) => a+b))
