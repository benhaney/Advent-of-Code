let input = Object.assign(...require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => x.split(' -> ')).map(x => ({[x[0].split(' ')[0]]: {w: +x[0].split(' ')[1].slice(1,-1), p: x[1]?x[1].split(', '):[]}})))

let s = new Set(Object.keys(input))
for (let x of [].concat(...Object.values(input).map(a => a.p))) s.delete(x)
let start = s.values().next().value
console.log(start)

let build = name => ({w: input[name].w, p: input[name].p.map(x => build(x))})
let weight = pr => {
  pr.p.forEach(weight)
  pr.sum = pr.w + pr.p.reduce((a,b)=>a+b.sum, 0)
}
let tree = build(start)
weight(tree)
let look = (pr, target) => {
  let sums = pr.p.map(x => x.sum).reduce((a,b)=>({...a, [b]:(a[b]||0)+1}),{})
  if (Object.keys(sums).length == 1) return target - (+Object.keys(sums)[0] * Object.values(sums)[0])
  let sorted = Object.entries(sums).sort((a,b)=>a[1]-b[1])
  return look(pr.p.filter(x => x.sum == [sorted[0][0]])[0], +sorted[1][0])
}

console.log(look(tree, tree.sum))
