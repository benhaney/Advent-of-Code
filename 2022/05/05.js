let [stacks, steps] = [require('fs').readFileSync('input', 'utf8').split('\n\n')].map(([i1,i2]) => [i1.split('\n').map(x => x.match(/[\[\]A-Z]{3}|    /g)).filter(x => x).reverse().reduce((a,b) => b.map((c,i) => (a[i]||[]).concat(c[1])), []).map(x => x.filter(y => y != ' ')), i2.split('\n').map(x => x.match(/\d+/g).map(y => +y))])[0]

console.log(steps.flatMap(([a,b,c]) => new Array(a).fill([b,c])).reduce((a,[x,y]) => (a[y-1].push(a[x-1].pop()), a), stacks.map(x => [...x])).map(x => x[x.length-1]).join(''))
console.log(steps.reduce((a,[c,x,y]) => (a[y-1].push(...a[x-1].splice(-c)), a), stacks).map(x => x[x.length-1]).join(''))
