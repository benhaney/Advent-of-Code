const input = require('fs').readFileSync('input', 'utf8').split('\n').map((a,y) => a.split(''))

let f = (y, x, dir, hist) => {
  // would recurse for every step but JS is bad at recursion and it'd blow the call stack. have a huge gross while loop with a million if statements instead
  while (true) {
    let key = [y,x,dir].join()
    if (hist.has(key)) break
    if (!input[y] || !input[y][x]) break
    hist.add(key)
    if (input[y][x] == '.' || (input[y][x] == '|' && dir[0]) || (input[y][x] == '-' && dir[1])) {
      ;[y, x] = [y+dir[0], x+dir[1]]
      continue
    }
    if (input[y][x] == '/') {
      dir = [-dir[1], -dir[0]]
      ;[y, x] = [y+dir[0], x+dir[1]]
      continue
    }
    if (input[y][x] == '\\') {
      dir = [dir[1], dir[0]]
      ;[y, x] = [y+dir[0], x+dir[1]]
      continue
    }
    if (input[y][x] == '|') {
      f(y-1, x, [-1, 0], hist)
      f(y+1, x, [1, 0], hist)
      break
    }
    if (input[y][x] == '-') {
      f(y, x-1, [0, -1], hist)
      f(y, x+1, [0, 1], hist)
      break
    }
  }
  return hist
}

console.log(new Set([...f(0, 0, [0,1], new Set())].map(x => x.split(',').slice(0,2).join())).size)

// Could speed this up by skipping starting points that were also exit points of previous attempts, but meh
console.log(Math.max(...[input.map((r,y) => [[y,0,[0,1]], [y,r.length-1,[0,-1]]]), input[0].map((_,x) => [[0,x,[1,0]], [input.length-1,x,[-1,0]]])].flat(2).map(([y,x,dir]) => new Set([...f(y, x, dir, new Set())].map(x => x.split(',').slice(0,2).join())).size)))
