let input = require('fs').readFileSync('input', 'utf8').trim()

let letters = 'abcdefghijklmnopqrstuvwxyz'
let red = new RegExp(letters.split('').map(c=>`${c}${c.toUpperCase()}|${c.toUpperCase()}${c}`).join('|'), 'g')

let ll = Infinity
while (input.length != ll) {
  ll = input.length
  input = input.replace(red, '')
}
console.log(ll)

let shortest = Infinity
for (let i of letters) {
  let re = new RegExp(`${i}|${i.toUpperCase()}`,'g')
  let i2 = input.replace(re, '')
  let lll = Infinity
  while (i2.length != lll) {
    lll = i2.length
    i2 = i2.replace(red, '')
  }
  shortest = Math.min(shortest, i2.length)
}
console.log(shortest)
