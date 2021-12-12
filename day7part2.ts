import { readFileSync } from 'fs';

const file = readFileSync('day7input.txt', {encoding: 'utf-8'})
const lines = file.split('\n')

//Parse bags
const bagMap = new Map<string, string[]>()
lines.forEach(line => {
    const bagsPos = line.indexOf('bags')
    const bagName = line.substring(0, bagsPos).trim()
    const bagContents = line
        .substring(bagsPos+5+8)
        .split(',')
        .map(s => s.replace(/bags|bag/,'').replace('.','').trim())
    
    bagMap.set(bagName, bagContents)
})

//Build initial list of bags
const desiredBag = 'shiny gold'
const answerSet: BagDetail[] = []
let answerIdCounter = 0
const answers = bagMap.get(desiredBag)!.map(bagContent => {
    if (!bagContent.includes('no other')){
        const numberOfBags = bagContent.substr(0, bagContent.indexOf(' '))
        const bagName = bagContent.substr(bagContent.indexOf(' ')+1)
        const bagDetail = {id: answerIdCounter, name: bagName, count: parseInt(numberOfBags)} as BagDetail
        answerIdCounter++
        answerSet.push(bagDetail)
    }
})

//check answer set recursively, initialise variables
const answersToCheck = answerSet.map(b => ({answerSetId:b.id, name:b.name}) as BagToCheckDetail)
while (answersToCheck.length > 0) {
    const bagToSearch = answersToCheck.pop()//appease the compiler
    const nextBagContent = bagMap.get(bagToSearch!.name)

    //If we need to process the bag
    if (nextBagContent && nextBagContent[0] && !nextBagContent[0].includes('no other')){
        //number of parent bags (to apply multiplier to children)
        //need to find the parent we popped off...
        const parentCount = answerSet.find(bagDetail => bagDetail.id === bagToSearch?.answerSetId)?.count ?? 0

        //find child bags
        nextBagContent.forEach(bagContent => {
            const numberOfBags = bagContent.substr(0, bagContent.indexOf(' '))
            const bagName = bagContent.substr(bagContent.indexOf(' ')+1)
            const bagDetail = {
                id: answerIdCounter,
                name: bagName, 
                count: parseInt(numberOfBags) * parentCount
            } as BagDetail

            answerSet.push(bagDetail)
            answersToCheck.push({answerSetId:answerIdCounter, name:bagName})
            answerIdCounter++
        })
    }

    //console.log(bagToSearch, nextBagContent)
}

console.log(answerSet)

//Sum all bags in answerSet
const totalBags = answerSet.reduce((acc, curr) => acc + curr.count, 0)

console.log(totalBags)

interface BagToCheckDetail {
    answerSetId: number,
    name: string
}

interface BagDetail {
    id: number,
    name: string,
    count: number
}