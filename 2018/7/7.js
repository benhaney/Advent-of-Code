let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => x.match(/^Step ([A-Z]) must be finished before step ([A-Z]) can begin.$/).slice(1,3))

let deps = [].concat(...input).reduce((a,b)=>Object.assign(a,{[b]:[]}),{})
input.forEach(x => deps[x[1]].push(x[0]))
let steps = Object.keys(deps).sort()
let comp = {}
let cont = true
while (cont) {
  cont = false
  for (let i of steps) {
    if (!(i in comp) && !deps[i].some(x => !(x in comp))) {
      comp[i] = cont = true
      break
    }
  }
}
console.log(Object.keys(comp).join(''))

comp = {}
steps = steps.reduce((a,b)=>Object.assign(a,{[b]:(b.charCodeAt(0)-4)}), {})
let workers = [...Array(5)]
for (var i = -1; Object.keys(comp).length < Object.keys(steps).length; i++) {
  for (let w in workers) {
    if (workers[w] && !steps[workers[w]]) comp[workers[w]] = !(workers[w] = undefined)
    if (!workers[w]) workers[w] = Object.keys(steps).find(x => !(x in comp) && !workers.includes(x) && !deps[x].some(y => !(y in comp)))
    if (workers[w]) steps[workers[w]] -= 1
  }
}
console.log(i)
