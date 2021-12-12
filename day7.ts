import { readFileSync } from 'fs';

const file = readFileSync('day7input.txt', {encoding: 'utf-8'})
const lines = file.split('\n')

//testing
//lines.splice(10,lines.length-1)

//Parse bags
const bagMap = new Map<string, string[]>()
lines.forEach(line => {
    const bagsPos = line.indexOf('bags')
    const bagName = line.substring(0, bagsPos).trim()
    const bagContents = line.substring(bagsPos+5+8).split(',') //bags contain
    
    bagMap.set(bagName, bagContents)
})

const answerSet = new Set<string>()

//check bags for desired bag type
const desiredBag = 'shiny gold bag'
Array.from(bagMap).forEach(bag => {
    let hasTargetBag = false
    bag[1].forEach(content => {
        const containsBag = content.indexOf(desiredBag)
        if (containsBag > 0) {
            hasTargetBag = true
        }
    })

    if (hasTargetBag) {
        answerSet.add(bag[0])
    }
})

//check answer set recursively
const answersChecked = [] as string[]
const answersToCheck = Array.from(answerSet)
while (answersToCheck.length > 0) {
    const bagToSearch = answersToCheck.pop() ?? '' //appease the compiler
    Array.from(bagMap).forEach(bag => {
        let hasTargetBag = false
        bag[1].forEach(content => {
            const containsBag = content.indexOf(bagToSearch)
            if (containsBag > 0) {
                hasTargetBag = true
            }
        })
    
        if (hasTargetBag && !answerSet.has(bag[0])) {
            answerSet.add(bag[0])
            answersToCheck.push(bag[0])
        }
    })

    answersChecked.push(bagToSearch)
}

console.log(answerSet)
console.log(answerSet.size)
