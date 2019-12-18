let input = require('fs').readFileSync('input', 'utf8').trim().split('').map(x => +x)

let ps = input.map((_, i) => input.map((_, j) => [0,1,0,-1][Math.floor((j+1)/(i+1)) % 4]))
let phase = (input, c) => c ? phase(input.map((_,i) => Math.abs(input.reduce((a,b,j) => a + (b * ps[i][j]), 0)) % 10), c - 1) : input

console.log(phase(input, 100).join('').slice(0,8))

let end = Array.from(Array(1e4)).flatMap(_ => input.slice()).slice(-(input.length * 1e4 - (+input.slice(0,7).join(''))))
Array(100).fill(0).forEach(sum => {
  for (i = end.length; i; i--) end[i-1] = Math.abs(sum += end[i-1]) % 10
})
console.log(end.slice(0,8).join(''))
