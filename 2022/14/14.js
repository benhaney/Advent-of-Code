let input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(' -> ').map(y => y.split(',').map(z => +z)))

let explode = (a, b) => (a[0] == b[0]) ? [...Array(Math.abs(b[1]-a[1])+1)].map((_,i) => [a[0], a[1]+(i*Math.sign(b[1]-a[1]))]) : [...Array(Math.abs(b[0]-a[0])+1)].map((_,i) => [a[0]+(i*Math.sign(b[0]-a[0])), a[1]])
let rock = new Set(input.flatMap(line => line.flatMap((x,i) => i ? explode(line[i-1], x) : [])).map(x => x.join()))
let maxy = Math.max(...[...rock].map(x => +x.split(',')[1]))
let i = 0
while (true) {
  let s = [500, 0]
  while (true) {
    if (s[1] > maxy) break
    if (!rock.has(`${s[0]},${s[1]+1}`)) { s[1] += 1; continue }
    if (!rock.has(`${s[0]-1},${s[1]+1}`)) { s = [s[0]-1, s[1]+1]; continue }
    if (!rock.has(`${s[0]+1},${s[1]+1}`)) { s = [s[0]+1, s[1]+1]; continue }
    rock.add(s.join())
    break
  }
  if (s[1] > maxy) break
  i++
}
console.log(i)

rock = new Set(input.flatMap(line => line.flatMap((x,i) => i ? explode(line[i-1], x) : [])).map(x => x.join()))
i = 0
while (true) {
  let s = [500, 0]
  while (true) {
    if (s[1] > maxy) { rock.add(s.join()); break }
    if (!rock.has(`${s[0]},${s[1]+1}`)) { s[1] += 1; continue }
    if (!rock.has(`${s[0]-1},${s[1]+1}`)) { s = [s[0]-1, s[1]+1]; continue }
    if (!rock.has(`${s[0]+1},${s[1]+1}`)) { s = [s[0]+1, s[1]+1]; continue }
    rock.add(s.join())
    break
  }
  i++
  if (s[0] == 500 && s[1] == 0) break
}
console.log(i)
