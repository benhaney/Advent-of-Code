let input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.match(/-?\d+/g)).map(([sx,sy,bx,by]) => [[+sx,+sy],[+bx,+by]])

console.log([input.map(([[sx,sy], [bx,by]]) => [Math.abs(sx-bx)+Math.abs(sy-by)].map(md => [Math.abs(2000000 - sy)].map(dy => dy <= md ? [sx-(md-dy), sx+(md-dy)] : [])[0])[0]).filter(x => x.length).sort(([a], [b]) => a-b).reduce((a,b) => (!a.length || b[0] > a[a.length-1][1]+1) ? a.concat([b]) : (a[a.length-1][1] = Math.max(a[a.length-1][1], b[1]), a), [])].map(ranges => ranges.map(([a,b]) => b-a).reduce((a,b) => a+b)+1-[...new Set(input.filter(([[], [,by]]) => by == 2000000).map(([[], [bx]]) => bx))].filter(x => ranges.some(([a,b]) => x >= a && x <= b)).length)[0])

for (let i = 0; i <= 4000000; i++) {
  let ranges = input.map(([[sx,sy], [bx,by]]) => [Math.abs(sx-bx)+Math.abs(sy-by)].map(md => [Math.abs(i - sy)].map(dy => dy <= md ? [sx-(md-dy), sx+(md-dy)] : [])[0])[0]).filter(x => x.length).sort(([a], [b]) => a-b).reduce((a,b) => (!a.length || b[0] > a[a.length-1][1]+1) ? a.concat([b]) : (a[a.length-1][1] = Math.max(a[a.length-1][1], b[1]), a), [])
  if (ranges.length > 1) return console.log((ranges[0][1]+1)*4000000+i)
}
