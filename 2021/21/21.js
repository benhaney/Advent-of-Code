let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => +x.match(/\d+$/)[0])

console.log([Array(1000).fill(0).reduce(([p,d,t]) => p[0][1] >= 1000 || p[1][1] >= 1000 ? [p,d,t] : [p.map(([pp,s],i)=>i==t?[(pp+d*3+6)%10,s+(pp+d*3+6)%10+1]:[pp,s]),d+3,t?0:1],[input.map(x => [x-1,0]), 0, 0]).slice(0,2)].map(([x,y])=>Math.min(...x.map(z => z[1]))*y)[0])

let c = {}, f = (p,s,d) => c[[p,s,d].join()] || (c[[p,s,d].join()] = [3,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8,9].reduce((w, r) => [[(p[d]+r)%10, s[d] + (p[d]+r)%10+1]].map(([pp, ss]) => (ss >= 21) ? d?[w[0],w[1]+1]:[w[0]+1,w[1]] : f(d?[p[0],pp]:[pp,p[1]], d?[s[0],ss]:[ss,s[1]], d?0:1).map((x,i)=>x+w[i]))[0], [0,0]))

console.log(Math.max(...f(input.map(x => x-1),[0,0],0)))
