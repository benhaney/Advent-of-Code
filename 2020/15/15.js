let input = require('fs').readFileSync('input', 'utf8').split(',').map(x => +x)

console.log((f=n=>[...Array(n-1)].reduce(([l,o],b,i)=>[i-(o.get(t=input[i]??l)??i),o.set(t,i)],[, new Map()])[0])(2020))

console.log(f(30000000))
