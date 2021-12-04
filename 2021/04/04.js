let [nums, ...input] = require('fs').readFileSync('input', 'utf8').trim().split('\n\n').map(w => w.includes('\n') ? w.split('\n').map(y => y.split(' ').filter(z => z).map(z => +z)) : w.split(',').map(x => +x))

let check = board => board.some(row => row.reduce((a,b)=>a+b) == -5) || board.some((_,i) => board.reduce((a,b)=>a+b[i],0) == -5)
let pick = (bs, n) => bs.map(b => b.map(r => r.map(e => e == n ? -1 : e)))

console.log(nums.reduce(([bs, cc], n) => bs.length == 5 ? [bs,cc] : (bs.find(check) ? [bs.find(check), cc] : [pick(bs, n), n]), [input, -1]).reduce((a,b)=>a*(~~b?b:b.flat().filter(x => x != -1).reduce((a,b)=>a+b)),1))

console.log(nums.reduce(([bs, cc], n) => (bs.length == 1 ? (check(bs[0]) ? [bs, cc] : [pick(bs, n), n]) : [pick(bs, n).filter(x => !check(x)), n]), [input, -1]).reduce((a,b)=>a*(~~b?b:b[0].flat().filter(x => x != -1).reduce((a,b)=>a+b)),1))
