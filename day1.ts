import { readFileSync } from 'fs';

const file = readFileSync('day1input.txt', {encoding: 'utf-8'})

const numbers = file.split('\n')

const resultSeek = 2020
const getAnswer = () => {
    for (let x = 0; x < numbers.length; x++) {
        let number1 = numbers[x];
        
        for (let y = 0; y < numbers.length; y++) {
            let number2 = numbers[y]
            if (number1 === number2){
                continue
            }
    
            let int1 = parseInt(number1)
            let int2 = parseInt(number2)
            if (int1 + int2 === resultSeek){
                console.log(int1, int2)
                console.log(int1 * int2)
                return
            }
        }
    }
}

const getPart2Answer = () => {
    for (let x = 0; x < numbers.length; x++) {
        let number1 = numbers[x];
        
        for (let y = 0; y < numbers.length; y++) {
            let number2 = numbers[y]

            if (number1 === number2){
                continue
            }

            for (let z = 0; z < numbers.length; z++) {
                const number3 = numbers[z];
                
                if (number2 === number3){
                    continue
                }
        
                let int1 = parseInt(number1)
                let int2 = parseInt(number2)
                let int3 = parseInt(number3)
                if (int1 + int2 + int3 === resultSeek){
                    console.log(int1, int2, int3)
                    console.log(int1 * int2 * int3)
                    return
                }
            }
        }
    }
}

getAnswer()
getPart2Answer()
console.log('test')