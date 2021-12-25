let input = require('fs').readFileSync('input', 'utf8')

let len = input.indexOf('\n')
let round = (len+1)*(input.split('\n').length-1)
let f = s => s.split('').reduce((ac,c,i,a) => ac+(c=='.'&&(a[i-1]=='>'||((a[i-1]=='\n'||a[i-1]===undefined)&&a[i+len-1]=='>'))?'>':(c=='>'&&(a[i+1]=='.'||((a[i+1]=='\n'||a[i+1]===undefined)&&a[i-len+1]=='.'))?'.':c)), '').split('').reduce((ac,c,i,a) => ac+(c=='.'&&(a[i-len-1]=='v'||a[i+round]=='v')?'v':(c=='v'&&(a[i+len+1]=='.'||a[i-round]=='.')?'.':c)), '')

let c
for (c = 1, curr = input; curr != (curr = f(curr)); c++);
console.log(c)
