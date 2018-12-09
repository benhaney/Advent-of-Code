let input = require('fs').readFileSync('input', 'utf8').trim().split(' ').map(x => +x)

let msum = 0
let nfy = ptr => {
  let ch = input[ptr]
  let md = input[ptr+1]
  let node = {c: [], m: [], len: 0}
  ptr += 2
  for (let i = 0; i < ch; i++) {
    let child = nfy(ptr)
    node.c.push(child)
    ptr = child.len
  }
  for (let i = 0; i < md; i++) {
    node.m.push(input[ptr])
    msum += input[ptr]
    ptr++
  }
  node.len = ptr
  return node
}
let tree = nfy(0)
console.log(msum)

let count = tree => {
  if (!tree.c.length) return tree.m.reduce((a,b)=>a+b)
  return tree.m.reduce((a,b)=>a+((tree.c.length>=b)?count(tree.c[b-1]):0),0)
}
console.log(count(tree))
