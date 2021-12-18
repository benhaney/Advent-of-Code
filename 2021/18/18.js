let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x)

let explodable = (num, depth = 0) => Array.isArray(num) ? ((depth > 3) ? ['', num, ''] : [explodable(num[0], depth+1)].map(ll => ll ? ['['+ll[0], ll[1], ll[2]+','+JSON.stringify(num[1])+']'] : [explodable(num[1], depth+1)].map(rr => rr ? ['['+JSON.stringify(num[0])+','+rr[0], rr[1], rr[2]+']'] : false)[0])[0]) : false
let rev = x => x.split('').reverse().join('')
let explode = num => [explodable(JSON.parse(num))].map(p => p ? rev(rev(p[0]).replace(/\d+/, x => rev(''+((+rev(x))+p[1][0])))) + 0 + p[2].replace(/\d+/, x => (+x)+p[1][1]) : num)[0]
let split = num => num.replace(/\d{2,}/, x => `[${Math.floor(x/2)},${Math.ceil(x/2)}]`)
let reduce = num => [explode(num)].map(nume => nume != num ? reduce(nume) : [split(num)].map(nums => nums != num ? reduce(nums) : num)[0])[0]
let add = (left, right) => reduce(`[${left},${right}]`)
let mag = x => Array.isArray(x) ? 3*mag(x[0])+2*mag(x[1]) : x

console.log(mag(JSON.parse(input.reduce((a,b) => add(a,b)))))
console.log(input.reduce((a,b) => Math.max(a, Math.max(...input.map(x => mag(JSON.parse(add(b, x)))))), 0))
