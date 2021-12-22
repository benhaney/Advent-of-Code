let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.match(/^(\S+) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/).slice(1,8)).map(([t,x1,x2,y1,y2,z1,z2])=>({v:t=='on'?1:0,x:[+x1,+x2],y:[+y1,+y2],z:[+z1,+z2]}))

let count = cs => cs.reduce((prevs, b) => prevs.flatMap(a => [{v:a.v?0:1,x:[Math.max(a.x[0],b.x[0]), Math.min(a.x[1], b.x[1])],y:[Math.max(a.y[0],b.y[0]), Math.min(a.y[1], b.y[1])],z:[Math.max(a.z[0],b.z[0]), Math.min(a.z[1], b.z[1])]}].map(is => (is.x[0] > is.x[1] || is.y[0] > is.y[1] || is.z[0] > is.z[1]) ? a : [a, is])[0]).concat(b.v ? b : []), []).reduce((a,b) => a+((b.v?1:-1)*((b.x[1]-b.x[0]+1)*(b.y[1]-b.y[0]+1)*(b.z[1]-b.z[0]+1))), 0)

console.log(count(input.filter(c => [c.x,c.y,c.z].flat().map(Math.abs).every(x => x <= 50))))
console.log(count(input))
