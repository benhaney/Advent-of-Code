let input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(',').map(y => y.split('-').map(z => +z)))

console.log(input.filter(([[a1,a2],[b1,b2]])=>a1<=b1&&a2>=b2||a1>=b1&&a2<=b2).length)
console.log(input.filter(([[a1,a2],[b1,b2]])=>a1<=b1&&a2>=b1||a1<=b2&&a2>=b2||a1>=b1&&a2<=b2).length)
