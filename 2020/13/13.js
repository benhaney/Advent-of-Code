let input = [require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x)].map(([x, y]) => [+x, y.split(',').map(z => +z || z)])[0]

console.log(input[1].filter(x => x != 'x').map(x => [x - (input[0] % x), x]).sort(([a],[b]) => a-b)[0].reduce((a,b)=>a*b))

console.log(input[1].reduce((a,b,i) => b=='x'?a:([(f = t => ((t+i)%b)?f(t+a[1]):t)(a[0]), a[1]*b]), [0,1])[0])
