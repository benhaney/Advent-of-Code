// Needs increased stack size (eg --stack-size=10000)
const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(''))

let upsize = grid => grid.map(line => line.map(cell => (({F:"    ## # ",7:"   ##  # ",J:" # ##    ",L:" #  ##   ","-":"   ###   ","|":" #  #  # ",S:"#########"})[cell])||"         ")).map(line => [0,3,6].map(x => line.map(c => c.slice(x, x+3)).join(''))).flat().map(x => x.split(''))

let downsize = grid => grid.filter((_,i) => i % 3 == 1).map(x => x.filter((_,i) => i % 3 == 1))

let floodfill = (grid, y, x, from, to) => {
  if (!grid[y] || !grid[y][x] || grid[y][x] != from) return
  grid[y][x] = to
  floodfill(grid, y-1, x, from, to)
  floodfill(grid, y+1, x, from, to)
  floodfill(grid, y, x-1, from, to)
  floodfill(grid, y, x+1, from, to)
  return grid
}

let start = input.map((row,y) => row.includes('S') ? [y, row.findIndex(c => c == 'S')] : []).flat()

// upsize grid. floodfill starting from S to replace all pipes in loop with 'X'. downsize. count 'X's for length of loop. divide by 2 for furthest point in loop
console.log(downsize(floodfill(upsize(input), start[0] * 3 + 1, start[1] * 3 + 1, '#', 'X')).flat().filter(x => x == "X").length / 2)
// upsize grid. floodfill pipes that are part of loop. eliminate all other pipes. floodfill exterior of loop with garbage. downsize. count empty tiles (non-empty tiles are now either part of the loop or outsize the loop, so all empty tiles are interior)
console.log(downsize(floodfill(floodfill(upsize(input), start[0] * 3 + 1, start[1] * 3 + 1, '#', 'X').map(x => x.map(y => y == 'X' ? 'X' : ' ')), 0, 0, ' ', 'O')).flat().filter(x => x == ' ').length)
