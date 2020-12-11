let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x)

console.log([...(a = last => (cand = (g => g.map((r, y) => [...r].map((s, x) => s=='.'?'.':(n=(f = z => (g,y,x) => [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].map(([dd,dr])=>z(g,y,x,dd,dr)).filter(a => a == '#').length)((g,y,x,dd,dr)=>(g[y+dd]||[])[x+dr])(g,y,x),(s=='#'&&n>3)?'L':(s=='L'&&n==0?'#':s))).join('')))(last)).join() == last ? last : a(cand))(input).join('')].filter(x => x == '#').length)

console.log([...(a = last => (cand = (g => g.map((r, y) => [...r].map((s, x) => s=='.'?'.':(n=f(m=(g,y,x,dd,dr) => (c=(g[y+dd]||[])[x+dr])=='.'?m(g,y+dd,x+dr,dd,dr):c)(g,y,x),(s=='#'&&n>4)?'L':(s=='L'&&n==0?'#':s))).join('')))(last)).join() == last ? last : a(cand))(input).join('')].filter(x => x == '#').length)
