// manually constructed from challenge input, which was not intended to be machine-parsed
let m = [
  [[1,1, 1],[0,4,-1]],
  [[1,2,-1],[0,0, 1]],
  [[1,3,-1],[0,2, 1]],
  [[1,4,-1],[0,5,-1]],
  [[1,0,-1],[1,2,-1]],
  [[1,4,-1],[1,0, 1]]
]
let state = 0
let tape = Array.from({length:15000})
let pos = 10000
// loop bound also extracted from challenge input
for (let i = 0; i < 12208951; i++) {
  let q = m[state][tape[pos]||0]
  tape[pos] = q[0]
  state = q[1]
  pos += q[2]
}
console.log(Object.values(tape).filter(a=>a==1).length)
