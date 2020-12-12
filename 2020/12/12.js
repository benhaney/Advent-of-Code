let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => [x[0], +x.slice(1)])

console.log(input.reduce(([x,y,r], [c,n]) => ({N:()=>[x,y+n,r],E:()=>[x+n,y,r],S:()=>[x,y-n,r],W:()=>[x-n,y,r],L:()=>[x,y,r-n],R:()=>[x,y,r+n],F:()=>[x-n*(cos=q=>Math.cos(q*Math.PI/180))(r),y-n*(sin=q=>Math.sin(q*Math.PI/180))(r),r]})[c](), [0,0,90]).slice(0,2).map(x => Math.round(Math.abs(x))).reduce((a,b)=>a+b))

console.log(input.reduce(([x,y,wx,wy], [c,n]) => ({N:()=>[x,y,wx,wy+n],E:()=>[x,y,wx+n,wy],S:()=>[x,y,wx,wy-n],W:()=>[x,y,wx-n,wy],L:()=>[x,y,wx*cos(n)-wy*sin(n),wy*cos(n)+wx*sin(n)],R:()=>[x,y,wx*cos(-n)-wy*sin(-n),wy*cos(-n)+wx*sin(-n)],F:()=>[x+wx*n,y+wy*n,wx,wy]})[c](), [0,0,10,1]).slice(0,2).map(x => Math.round(Math.abs(x))).reduce((a,b)=>a+b))
