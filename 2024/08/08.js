const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(''))
const ms = input.map((l,i) => l.map((c,j) => c == '.' ? null : [c, [i,j]]).filter(x => x)).flat().reduce((a,[c,b]) => Object.assign(a, {[c]: (a[c]||[]).concat([b])}), {})

let good = ([y,x]) => y >= 0 && x >= 0 && y < input.length && x < input[0].length

let ans1 = ([y1, x1], [y2, x2]) => [y2 + (y2 - y1), x2 + (x2 - x1)]

console.log(new Set(Object.values(ms).map(xs => xs.map(x => xs.filter(y => y != x).map(y => ans1(x,y))).flat()).flat().filter(good).map(([y,x]) => `${y},${x}`)).size)

let ans2 = ([y1, x1], [y2, x2]) => {
  let base = [y1, x1]
  while (good(base)) {
    base[0] -= y2 - y1
    base[1] -= x2 - x1
  }
  let ans = []
  while (true) {
    base[0] += y2 - y1
    base[1] += x2 - x1
    if (!good(base)) break
    ans.push([base[0], base[1]])
  }
  return ans
}

console.log(new Set(Object.values(ms).map(xs => xs.map((x,i) => xs.slice(i+1).map(y => ans2(x,y)).flat()).flat()).flat().map(([y,x]) => `${y},${x}`)).size)
