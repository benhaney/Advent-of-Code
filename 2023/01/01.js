const input = require('fs').readFileSync('input', 'utf8').split('\n')

console.log(input.map(x => x.match(/[0-9]/g)||'0').map(x => x[0] + x[x.length - 1]).reduce((a,b) => a + (+b), 0))

let digits = ['zero','one','two','three','four','five','six','seven','eight','nine',0,1,2,3,4,5,6,7,8,9]
console.log(input.map(x => digits.map((y,i) => [[isNaN(y)?i:y, x.indexOf(y)],[isNaN(y)?i:y, x.lastIndexOf(y)]]).flat().filter(([_,a])=>a>=0).sort(([,a],[,b])=>a-b)).map(x => x[0][0] + '' + x[x.length - 1][0]).reduce((a,b) => a + (+b), 0))
