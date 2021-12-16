let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split('').map(y => +y))

let f = inp => {
  let u = new Set()
  let nu = new Set()
  let grid = inp.map(r => r.map(x => [x,Infinity]))
  grid[0][0][1] = 0

  let pos = [0,0]
  while (pos.join(',') != (grid[0].length-1)+','+(grid.length-1)) {
    let current = grid[pos[1]][pos[0]]
    for ([xo,yo] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      if (!grid[pos[1]+yo] || !grid[pos[1]+yo][pos[0]+xo] || u.has((pos[0]+xo)+','+(pos[1]+yo))) continue
      let t = grid[pos[1]+yo][pos[0]+xo]
      t[1] = Math.min(t[1], current[1] + t[0])
      nu.add((pos[0]+xo)+','+(pos[1]+yo))
    }
    u.add(pos.join(','))
    nu.delete(pos.join(','))
    pos = [...nu].map(x => x.split(',').map(y => +y)).reduce((a, [x,y]) => a[1] < grid[y][x][1] ? a : [[x,y],grid[y][x][1]], [[-1,-1],Infinity])[0]
  }

  return grid[grid.length-1][grid[0].length-1][1]
}

console.log(f(input))

console.log(f([0,1,2,3,4].map(n => input.map(r => [0,1,2,3,4].map(n => r.map(x => (((x-1)+n)%9)+1)).flat()).map(r => r.map(x => (((x-1)+n)%9+1)))).flat()))
