let input = require('fs').readFileSync('input', 'utf8').trim().split('-').map(x => +x)

console.log([...Array(input[1]-input[0])].map((_,i) => input[0] + i).filter(i => !((''+i).split('').some((n,k,j) => n < j[k-1])) && ((''+i).split('').some((n,k,j) => n == j[k-1]))).length)

console.log([...Array(input[1]-input[0])].map((_,i) => input[0] + i).filter(i => !((''+i).split('').some((n,k,j) => n < j[k-1])) && ((''+i).split('').some((n,k,j) => n == j[k-1] && n != j[k-2] && n != j[k+1]))).length)
