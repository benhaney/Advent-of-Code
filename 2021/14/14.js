let [input, rules] = [require('fs').readFileSync('input', 'utf8').split('\n\n')].map(([a,b]) => [a.split(''), Object.fromEntries(b.split('\n').filter(x => x).map(x => x.split(' -> ')))])[0]

let f = n => [Object.entries(Array(n).fill(0).reduce(a => Object.entries(a.flatMap(([k,c]) => rules[k] ? [[k[0]+rules[k], c], [rules[k]+k[1], c]] : [[k,c]]).reduce((a,[k,c]) => Object.assign(a, {[k]: (a[k]||0)+c}), {})), input.map((x,i) => x + input[i+1]).slice(0,input.length-1).map(x => [x, 1])).flatMap(([k,c]) => [[k[0], c], [k[1], c]]).reduce((a,[k,c]) => Object.assign(a, {[k]: (a[k]||0)+c}), {})).sort(([,a], [,b]) => a-b)].map(x => [x[x.length-1][1], x[0][1]])[0].map(x => Math.round(x/2)).reduce((a,b)=>a-b)

console.log(`${f(10)}\n${f(40)}`)
