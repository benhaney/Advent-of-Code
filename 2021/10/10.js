let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split(''))

console.log(input.map(line => line.reduce((a,c) => Array.isArray(a) ? (['[','<','(','{'].includes(c) ? a.concat(c) : (({'[':']','(':')','<':'>','{':'}'}[a[a.length-1]] == c) ? a.slice(0, a.length-1) : c)) : a, [])).filter(x => !Array.isArray(x)).reduce((a,b) => a+({'>':25137, '}':1197,']':57,')':3}[b]), 0))

console.log([input.map(line => line.reduce((a,c) => Array.isArray(a) ? (['[','<','(','{'].includes(c) ? a.concat(c) : (({'[':']','(':')','<':'>','{':'}'}[a[a.length-1]] == c) ? a.slice(0, a.length-1) : c)) : a, [])).filter(x => Array.isArray(x)).map(x => x.reverse().reduce((a,b)=>a*5+({'(':1,'[':2,'{':3,'<':4}[b]),0)).sort((a,b)=>a-b)].map(a=>a[~~(a.length/2)])[0])
