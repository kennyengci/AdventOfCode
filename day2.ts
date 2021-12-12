import { readFileSync } from 'fs';

const file = readFileSync('day2input.txt', {encoding: 'utf-8'})

const lines = file.split('\n')

//part 1
// let validPasswords: number = 0
// lines.forEach(line => {
//     let splitLine = line.split(':')
//     let policy = splitLine[0]
//     let policyReq = policy.split(' ')[0]
//     let policyLetter = policy.split(' ')[1]
//     let password = splitLine[1].trim()

//     let min: number = parseInt(policyReq.split('-')[0])
//     let max: number = parseInt(policyReq.split('-')[1])

//     let count = 0
//     password.split('').forEach(x => {
//         if (x === policyLetter){
//             count++
//         }
//     })

//     if (count >= min && count <= max){
//         validPasswords++
//     }
// })

// console.log(validPasswords)

//part2
let validPasswords: number = 0
lines.forEach(line => {
    let splitLine = line.split(':')
    let policy = splitLine[0]
    let policyReq = policy.split(' ')[0]
    let policyLetter = policy.split(' ')[1]
    let password = splitLine[1].trim()

    let pos1: number = parseInt(policyReq.split('-')[0])
    let pos2: number = parseInt(policyReq.split('-')[1])

    let count = 0
    let splitPassword = password.split('')
    //Minus 1 as policy assumes 1 as starting index
    let pos1IsValid = splitPassword[pos1-1] === policyLetter
    let pos2IsValid = splitPassword[pos2-1] === policyLetter

    if ((pos1IsValid && !pos2IsValid) || (!pos1IsValid && pos2IsValid)){
        validPasswords++
    }
})

console.log(validPasswords)