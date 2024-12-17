const input = require('fs').readFileSync('input', 'utf8').trim().split(' ').map(x => +x)

let split = s => [+s.slice(0, s.length / 2), +s.slice(s.length / 2)]
let memo = {}

let f = (n, k) => k ? (memo[`${n},${k}`] || (memo[`${n},${k}`] = n ? (`${n}`.length % 2 ? f(n * 2024, k-1) : split(`${n}`).map(x => f(x, k-1)).reduce((a,b) => a+b)) : f(1, k-1))) : 1

console.log(input.map(x => f(x, 25)).reduce((a,b) => a+b))
console.log(input.map(x => f(x, 75)).reduce((a,b) => a+b))
