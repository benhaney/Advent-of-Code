const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.match(/[-0-9]+/g)).map(([px,py,vx,vy]) => [[+px,+py],[+vx,+vy]])

const [w,h] = [101,103]

console.log(input.map(([p,v]) => [(p[0]+(v[0]+w)*100)%w,(p[1]+(v[1]+h)*100)%h]).filter(([x,y]) => x != ~~(w/2) && y != ~~(h/2)).map(([x,y]) => (x < w/2 ? 2 : 0)+(y < h/2 ? 1 : 0)).reduce((a,b) => (a[b]++,a), [0,0,0,0]).reduce((a,b) => a*b, 1))

for (let i = 0;; i++) {
  let s = new Set(input.map(([p,v]) => [(p[0]+(v[0]+w)*i)%w,(p[1]+(v[1]+h)*i)%h]).map(([x,y]) => (x << 16) + y))
  for (let j = 0; s.size; j++) {
    s.forEach(x => { if (!s.has(x-1)) s.delete(x) })
    if (j > 10) process.exit(console.log(i))
  }
}
