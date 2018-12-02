let m = require('fs').readFileSync('input', 'utf8').trim().split('\n').map(a=>a.split('')).reverse()
let g = {}
m.map((row, i)=>row.map((cell, j)=>g[`${j},${i}`]=cell))

let grid = {...g}
let pos = [Math.floor(m[0].length/2), Math.floor(m.length/2)]
let dir = [0, 1]
let inf = 0

for (let z = 0; z < 10000; z++) {
  let pj = pos.join()
  if (grid[pj]===undefined || grid[pj] === '.') {
    dir = dir.reverse()
    if (dir[0] != 0) dir = dir.map(a=>-a)
    grid[pj] = '#'
    inf++
  } else if (grid[pj] === '#') {
    dir = dir.reverse()
    if (dir[1] != 0) dir = dir.map(a=>-a)
    grid[pj] = '.'
  }
  pos = pos.map((a,i)=>a+dir[i])
}

console.log(inf)


grid = {...g}
pos = [Math.floor(m[0].length/2), Math.floor(m.length/2)]
dir = [0, 1]
inf = 0

for (let z = 0; z < 10000000; z++) {
  let pj = pos.join()
  if (grid[pj]===undefined || grid[pj] === '.') {
    dir = dir.reverse()
    if (dir[0] != 0) dir = dir.map(a=>-a)
    grid[pj] = 'W'
  } else if (grid[pj] === '#') {
    dir = dir.reverse()
    if (dir[1] != 0) dir = dir.map(a=>-a)
    grid[pj] = 'F'
  } else if (grid[pj] === 'F') {
    dir = dir.map(a=>-a)
    grid[pj] = '.'
  } else if (grid[pj] === 'W') {
    grid[pj] = '#'
    inf++
  }
  pos = pos.map((a,i)=>a+dir[i])
}

console.log(inf)
