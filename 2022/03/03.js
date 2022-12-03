let input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => [x.slice(0,x.length/2),x.slice(x.length/2)].map(y => y.split('')))

console.log(input.map(([x,y])=>([new Set(x)].map(s => y.find(z => s.has(z)))[0])).map(x => x.charCodeAt(0)-(x<'a'?38:96)).reduce((a,b)=>a+b))
console.log([input.map(([x,y]) => x.concat(y))].map(inp => [...new Array(inp.length/3)].map(_ => inp.splice(0,3)))[0].map(g => [...g.reduce((a,b) => new Set(b.filter(x => a.has(x))), new Set(g[0]))].map(x => x.charCodeAt(0)-(x<'a'?38:96))[0]).reduce((a,b)=>a+b))
