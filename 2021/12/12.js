let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.split('-'))
let m = input.reduce((a,[b1,b2])=>Object.assign(a, {[b1]: (a[b1]||[]).concat(b2), [b2]: (a[b2]||[]).concat(b1)}), {})

let v = (k, s, t) => k == 'end' ? 1 : (s[k.toLowerCase()] ? (t && k!='start' ? m[k].reduce((a,b) => a + v(b, {[k]:1, ...s}), 0) : 0) : m[k].reduce((a,b) => a + v(b, {[k]:1, ...s}, t), 0))

console.log(`${v('start', {})}\n${v('start', {}, true)}`)
