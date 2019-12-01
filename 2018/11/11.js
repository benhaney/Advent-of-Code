let input = +require('fs').readFileSync('input', 'utf8').trim()

let m = [...Array(300)].map((_,y) => [...Array(300)].map((_,x) => Math.floor(((((x+11)*(y+1)+input)*(x+11))%1000)/100)-5))

let max = [-Infinity, [0,0]]
m.forEach((row, y) => {
  row.forEach((v, x) => {
    if (y > 300-3 || x > 300-3) return
    let a = [].concat(...m.slice(y,y+3).map(q => q.slice(x,x+3))).reduce((a,b)=>a+b,0)
    if (a > max[0]) max = [a, [x+1,y+1]]
  })
})

console.log(max[1].join(','))

max = [-Infinity, [0,0,0]]
for (let i of [...Array(298)].map((_,x) => x+2)) {
  m.forEach((row, y) => {
    row.forEach((v, x) => {
      if (y > 300-i || x > 300-i) return
      let a = [].concat(...m.slice(y,y+i).map(q => q.slice(x,x+i))).reduce((a,b)=>a+b,0)
      if (a > max[0]) max = [a, [x+1,y+1,i]]
    })
  })
}

console.log(max[1].join(','))
