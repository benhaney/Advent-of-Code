let s = require('fs').readFileSync('input', 'utf8').trim().split('')

for (let i in s) if (s[i-1] == '!') s[i] = s[i-1] = ''
s = s.join('').split('')

let g = false, garb = 0, l = 0, sum = 0

s.map(a=>{
  if (g) a=='>'?g=false:garb++
  if (g) return
  if (a=='<') g=true
  if (a=='{') sum += ++l
  if (a=='}') l--
})

console.log(sum)
console.log(garb)
