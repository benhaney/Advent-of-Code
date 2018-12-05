let input = require('fs').readFileSync('input', 'utf8').trim().split('\n').sort().map(x => x.replace(/[\]\[:#]/g, '').split(' ').slice(1))

let sleeps = {}, guard = '', fall = 0
input.forEach(i => {({
  "Guard": i=>guard=i[2],
  "falls": i=>fall=(+i[0]),
  "wakes": i=>sleeps[guard] = (sleeps[guard]||Array(60).fill(0)).map((x,j)=>x+(j>=fall&&j<(+i[0])?1:0))
}[i[1]])(i)})

let g = +Object.entries(sleeps).map(x => [x[0], x[1].reduce((a,b)=>a+b)]).sort((a,b)=>b[1]-a[1])[0][0]
console.log(+Object.entries(sleeps[g]).sort((a,b)=>b[1]-a[1])[0][0] * g)

console.log(Object.entries(sleeps).reduce((a,x)=>x[1].reduce((a,y,i)=>((y>a[2])?[+x[0],i,y]:a),a),[0,0,0]).slice(0,2).reduce((a,b)=>a*b))
