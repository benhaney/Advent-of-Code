let input = require('fs').readFileSync('input', 'utf8').split('\n\n').map(x => Object.fromEntries(x.split(/[\n ]/g).map(y => y.split(':'))))
let rules = {
  byr: x => x && x >= 1920 && x <= 2002,
  iyr: x => x && x >= 2010 && x <= 2020,
  eyr: x => x && x >= 2020 && x <= 2030,
  hgt: x => x && [x.match(/(\d+)(..)/)||[,-1]].every(([_,h,u]) => (u=='in'&&+h>=59&&+h<=76)||(u=='cm')&&+h>=150&&+h<=193),
  hcl: x => x && /^#[0-9a-f]{6}$/.test(x),
  ecl: x => x && ['amb','blu','brn','gry','grn','hzl','oth'].includes(x),
  pid: x => x && /^\d{9}$/.test(x),
}

console.log(input.filter(x => Object.keys(rules).every(y => x[y])).length)

console.log(input.filter(x => Object.entries(rules).every(([k,v]) => v(x[k]))).length)
