const input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x)

let parts = input.map((a, y) => a.split('').map((b,x) => [b,x]).filter(([b,x]) => !/[0-9\.]/.test(b)).map(([b,x]) => [[y,x], b])).flat()
let nums = input.map((a, y) => [...a.matchAll(/\d+/g)].map(b => [[y, b.index], b[0]])).flat()
let adj = ([py, px], [ny, nx], nlen) => Math.abs(py-ny) <= 1 && (Math.abs(px-nx) <= 1 || Math.abs(px-(nx+nlen-1)) <= 1)

console.log(nums.filter(([nc, num]) => parts.some(([pc, p]) => adj(pc, nc, num.length))).reduce((a, [_,n]) => a + (+n), 0))
console.log(parts.filter(([_, p]) => p == '*').map(([pc]) => nums.filter(([nc, num]) => adj(pc, nc, num.length))).filter(x => x.length > 1).map(gnums => gnums.reduce((a, [_, n]) => a * (+n), 1)).reduce((a,b)=>a+b))
