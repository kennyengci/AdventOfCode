import { readFileSync } from 'fs';
const file = readFileSync('day6input.txt', { encoding: 'utf-8' });
const lines = file.split('\n\n');
//testing
//lines.splice(3,lines.length-1)
// let total = 0
// lines.forEach(x => {
//     const answerSet = new Set<string>()
//     let cleanedString = x.replace(/(\r\n|\n|\r)/gm,'') //remove all line breaks
//     for (const letter of cleanedString) {
//         answerSet.add(letter)    
//     }
//     console.log(x)
//     console.log(cleanedString)
//     console.log(answerSet)
//     total += answerSet.size
// })
// console.log(total)
//Part two
let total = 0;
//each group
lines.forEach(x => {
    const answerSet = new Set();
    let cleanedString = x.replace(/(\r\n|\n|\r)/gm, ''); //remove all line breaks
    for (const letter of cleanedString) {
        answerSet.add(letter);
    }
    const eachPerson = x.split('\n');
    //console.log(eachPerson)
    //console.log(Array.from(answerSet))
    Array.from(answerSet).forEach(answer => {
        let cancelFlag = false;
        for (const person of eachPerson) {
            if (person.includes(answer) === false) {
                cancelFlag = true;
                //console.log('cancel')
            }
        }
        if (cancelFlag === false) {
            total++;
            //console.log(`${answer}`)
        }
    });
});
console.log(total);
