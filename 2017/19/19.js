let m = require('fs').readFileSync('input', 'utf8').split('\n'), p = {x: m[0].indexOf('|'), y: 0}, d = {x: 0, y: 1}, l = '', s = 0
while (m[p.y][p.x] != ' ') {
  if (m[p.y][p.x] == '+') d = (d.x) ? {x:0,y:(m[p.y+1][p.x] == '|')?1:-1} : {y:0,x:(m[p.y][p.x+1] == '-')?1:-1}
  if (!['-','|','+'].includes(m[p.y][p.x])) l += m[p.y][p.x];
  [p, s] = [{x: p.x+d.x, y: p.y+d.y}, s+1] }
console.log(`${l}\n${s}`)
