let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => +x)

let p = 0, steps = 0
while (p >= 0 && p < input.length) {
  input[p] += 1
  p += input[p] - 1
  steps++
}
console.log(steps)


input = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(x => +x)

p = steps = 0
while (p >= 0 && p < input.length) {
  let x = input[p]
  input[p] += (x >= 3) ? -1 : 1
  p += x
  steps++
}
console.log(steps)
