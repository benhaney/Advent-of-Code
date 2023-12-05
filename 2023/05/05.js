const [seeds, maps] = [require('fs').readFileSync('input', 'utf8').split('\n\n')].map(([seeds, ...maps]) => [seeds.split(' ').slice(1).map(x => +x), maps.map(x => x.split('\n')).map(([_name, ...ranges]) => ranges.map(range => range.split(' ').map(x => +x)).map(([d,s,l]) => [s,s+l-1,d-s]).sort(([a],[b]) => a - b))])[0]

console.log(Math.min(...seeds.map(seed => maps.reduce((a, b) => a + (b.find(x => a >= x[0] && a <= x[1]) || [0,0,0])[2], seed))))

console.log(Math.min(...maps.map(map => map.map((rule, i, a) => [rule, [rule[1]+1, (a[i+1]||[0])[0]-1, 0]]).flat().concat([[0,map[0][0]-1,0], [map[map.length-1][1]+1, Infinity, 0]]).filter(([x,y]) => y >= x).sort(([a],[b]) => a - b)).reduce((from, map) => from.map(([ra, rb]) => map.map(([ma, mb, op]) => ((ra >= ma && ra <= mb) || (rb >= ma && rb <= mb)) ? [Math.max(ra, ma)+op, Math.min(rb, mb)+op] : null)).flat().filter(x => x), seeds.map((x,i,a) => i % 2 ? null : [x, x+a[i+1]-1]).filter(x => x)).map(([x]) => x)))
