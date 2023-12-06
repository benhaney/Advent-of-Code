const input = require('fs').readFileSync('input', 'utf8').split('\n').map(x => x.split(/\s+/).slice(1))

// dist = (time-x)*x where x = hold time
// hold time min =  ceil(0.5 * (time - sqrt(time^2 - 4*dist)))
// hold time max = floor(0.5 * (time + sqrt(time^2 - 4*dist)))

console.log(input.map((x,i,a) => x.map((y,j) => [+y,+(a[i+1]||[])[j]]))[0].map(([t,d]) => [Math.ceil(0.5*(t-Math.sqrt((t**2)-(4*d)))+1e-10), Math.floor(0.5*(t+Math.sqrt((t**2)-(4*d)))-1e-10)]).map(([x,y]) => y-x+1).reduce((a,b) => a*b))

console.log([input.map(x => +x.join(''))].map(([t,d]) => [Math.ceil(0.5*(t-Math.sqrt((t**2)-(4*d)))+1e-10), Math.floor(0.5*(t+Math.sqrt((t**2)-(4*d)))-1e-10)]).map(([x,y]) => y-x+1)[0])
