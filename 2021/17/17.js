let input = [require('fs').readFileSync('input', 'utf8').match(/x=([-\d]+)\.\.([-\d]+), y=([-\d]+)\.\.([-\d]+)/).slice(1,5).map(x => +x)].map(x => ({x: [x[0], x[1]], y: [x[2], x[3]]}))[0]

let maxmaxy = -Infinity
let count = 0
for (let vxi = 0; vxi <= input.x[1]; vxi++) {
  for (let vyi = input.y[0]; vyi <= Math.abs(input.y[0]); vyi++) {
    let pos = [0,0]
    let vx = vxi, vy = vyi
    let maxy = 0
    while (pos[0] < input.x[1] && pos[1] > input.y[0]) {
      pos[0] += vx
      pos[1] += vy
      maxy = Math.max(pos[1], maxy)
      vx -= Math.sign(vx)
      vy -= 1
      if (pos[0] >= input.x[0] && pos[0] <= input.x[1] && pos[1] >= input.y[0] && pos[1] <= input.y[1]) {
        maxmaxy = Math.max(maxy, maxmaxy)
        count++
        break
      }
    }
  }
}
console.log(maxmaxy)
console.log(count)
