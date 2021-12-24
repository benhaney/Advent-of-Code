let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split(' '))

let ds = [5,4,15].map(n => input.filter((r,i) => i%18==n).map(([,,x])=>+x))
let f = (n,b1,b2) => ds[1].reduce(([st,rls],b,i)=>b==26?[st.slice(1),rls.concat([[i,st[0][1],st[0][0]+ds[0][i]]])]:[[[ds[2][i],i]].concat(st),rls], [[],[]])[1].flatMap(([d1,d2,o])=>o>0?[[d1,n+b1*o],[d2,n-b2*o]]:[[d2,n-b1*o],[d1,n+b2*o]]).sort(([a],[b])=>a-b).map(([,x])=>x).join('')
console.log(f(9,0,1))
console.log(f(1,1,0))
