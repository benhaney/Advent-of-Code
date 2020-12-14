let input = require('fs').readFileSync('input', 'utf8').split('\n').filter(x => x).map(x => x.match(/^(mask = (?<mask>[01X]*))|(mem\[(?<addr>\d+)\] = (?<value>\d+))$/).groups)

console.log(Object.values(input.reduce((a,b)=>b.mask?[b.mask, a[1]]:[a[0], Object.assign(a[1], {[b.addr]: parseInt((+b.value).toString(2).padStart(36, 0).split('').map((x,i) => a[0][i]=='1'?1:(a[0][i]=='0'?0:x)).join(''), 2)})],['', {}])[1]).reduce((a,b)=>a+b))

console.log(Object.values(input.reduce((a,b)=>b.mask?[b.mask, a[1]]:[a[0], Object.assign(a[1], Object.fromEntries((+b.addr).toString(2).padStart(36, 0).split('').reduce((ac,n,i) => a[0][i]=='0'?ac.map(x => x.concat(n)):(a[0][i]=='1'?ac.map(x=>x.concat('1')):(ac.map(x=>x.concat('0')).concat(ac.map(x=>x.concat('1'))))), [[]]).map(x => [parseInt(x.join(''), 2), +b.value])))], ['',{}])[1]).reduce((a,b)=>a+b))
