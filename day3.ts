import { readFileSync } from 'fs';

const file = readFileSync('day3input.txt', {encoding: 'utf-8'})
const lines = file.split('\n')

//starting positiion
let x = 0
let y = 0

let height: number = lines.length - 1 //0 index
const width: number = lines[0].length - 1
let trees: number = 0
while (y < height) {
    //Movement algo
    x += 7
    y += 1

    //reset x if required
    if (x > width) {
        x = x - width - 1 //account for re-zeroing
    }

    //where am i?
    let pos = lines[y][x]

    //tree hit
    if (pos === '#'){
        trees++
    }

    //console.log(`(${x},${y}) trees:${trees}`)
}

console.log(trees)

//65
//237
//59
//61
//38