const input = require('fs').readFileSync('input', 'utf8').split('\n\n').map(x => x.split('\n').map(y => y.match(/\d+/g).map(z => +z)))

// system of eqs: px=ax*a+bx*b; py=ay*a+by*b
// px=ax*a+bx*b -> px-(ax*a)=bx*b -> b=(px-ax*a)/bx
// py=ay*a+by*b -> py=ay*a+by*((px-ax*a)/bx) -> a=(bx*py-by*px)/(ay*bx-ax*by) if ax*by != ay*bx and bx != 0
// use: a=(bx*py-by*px)/(ay*bx-ax*by) and b=(px-ax*a)/bx

console.log(input.map(([[ax,ay],[bx,by],[px,py]]) => [(bx*py-by*px)/(ay*bx-ax*by)].map(a => [a, (px-ax*a)/bx])[0]).filter(([a,b]) => a % 1 == 0 && b % 1 == 0).reduce((c, [a,b]) => c+(3*a+b), 0))

// damn floating point rounding
console.log(input.map(([a,b,[px,py]]) => [a,b,[px+1e13,py+1e13]]).map(([[ax,ay],[bx,by],[px,py]]) => [(bx*py-by*px)/(ay*bx-ax*by)].map(a => [a, (px-ax*a)/bx])[0]).filter(([a,b]) => Math.abs(a-Math.round(a) + b-Math.round(b)) < 1e-4).reduce((c, [a,b]) => c+(3*Math.round(a)+Math.round(b)), 0))
