const [seq, rules] = [require('fs').readFileSync('input', 'utf8').split('\n\n')].map(([seq, rules]) => [seq.split('').map(x => x == 'L' ? 0 : 1), Object.fromEntries(rules.split('\n').map(rule => rule.match(/[A-Z0-9]{3}/g)).map(([x,y,z]) => [x, [y,z]]))])[0]

let ptr = 'AAA'
for (var i = 0; ptr != 'ZZZ'; i++) ptr = rules[ptr][seq[i % seq.length]]
console.log(i)

let ptrs = Object.keys(rules).filter(x => x.endsWith('A')).map(ptr => {
  for (var i = 0; !ptr.endsWith('Z'); i++) ptr = rules[ptr][seq[i % seq.length]]
  return i
})
console.log([(f = (a,b) => b ? f(b,a%b) : a)].map(gcd => ptrs.reduce((a,b) => (b*a)/gcd(b,a)))[0])
