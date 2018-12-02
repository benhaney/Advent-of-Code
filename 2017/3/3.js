let s = +require('fs').readFileSync('input', 'utf8')

console.log(Math.ceil(Math.sqrt(s))-(Math.ceil(Math.sqrt(s))**2-s)-1)

let a = {'0 0': 1}
let c = Array.from({length: 10}).reduce((a,b,c)=>a.concat(Array.from({length: c}).map(()=>[c%2?1:-1,0]).concat(Array.from({length: c}).map(()=>[0,c%2?-1:1]))),[])
let d = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]]
c.reduce((c,b)=>{let n=c.split(' ').map((x,y)=>+x+b[y]);a[n.join(' ')]=d.reduce((l,m)=>l+(a[m.map((o,e)=>o+n[e]).join(' ')]||0),0);return n.join(' ')},'0 0')
console.log(Object.values(a).filter(x=>x>s)[0])
