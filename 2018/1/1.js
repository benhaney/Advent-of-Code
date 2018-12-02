let input = require('fs').readFileSync("input").toString().split('\n').filter(x => x).map(x => parseInt(x))
// part 1
console.log(input.reduce((a,b) => a+b, 0))

// part 2
let n = new Set(), j = 0
for (;;) {
  for (let i of input) {
    if (n.has(j+i)) process.exit(console.log(j+i))
    n.add(j+=i)
  }
}
