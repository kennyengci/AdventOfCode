import { readFileSync } from 'fs';

const file = readFileSync('day4input.txt', {encoding: 'utf-8'})
const lines = file.split('\n\n')

let validPassportCount = 0
lines.forEach(x => {
    //clean
    const fields = x.split(/\s+/)

    //build ojbect
    let output = {} as Passport
    fields.forEach(keyValue => {
        const newRecord = keyValue.trim().split(':')
        output = {[newRecord[0]]:newRecord[1], ...output}
    })

    //validate key value pairs
    const requiredFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid']

    let isValid = true
    requiredFields.forEach(x => {
        if (isValid === false){
            return
        }

        if (!output[x]){
            isValid = false
            return
        }

        if (x === 'byr'){
            let value = parseInt(output[x])
            if (isNaN(value) || !(value >= 1920 && value <= 2002)){
                isValid = false
                return
            }
        }

        if (x === 'iyr'){
            let value = parseInt(output[x])
            if (isNaN(value) || !(value >= 2010 && value <= 2020)){
                isValid = false
                return
            }
        }

        if (x === 'eyr'){
            let value = parseInt(output[x])
            if (isNaN(value) || !(value >= 2020 && value <= 2030)){
                isValid = false
                return
            }
        }

        if (x === 'hgt'){
            let value = output[x]
            //e.g. 193cm
            if (value.includes('cm')){
                let heightString = value.substr(0,value.indexOf('cm'))
                let height = parseInt(heightString)

                if (isNaN(height) || !(height >= 150 && height <= 193)){
                    isValid = false
                    return
                }
            }
            else if (value.includes('in')){
                let heightString = value.substr(0,value.indexOf('in'))
                let height = parseInt(heightString)

                if (isNaN(height) || !(height >= 59 && height <= 76)){
                    isValid = false
                    return
                }
            }
            else {
                isValid = false
                return
            }
        }

        if (x === 'hcl'){
            let value = output[x]
            let hexPosition = value.search(/#[a-zA-Z0-9]{6}/)
            if (hexPosition < 0 || value.length !== 7){
                isValid = false
                return
            }
        }

        if (x === 'ecl'){
            let value = output[x]
            let search = value.search(/amb|blu|brn|gry|grn|hzl|oth/)
            if (search < 0){
                isValid = false
                return
            }
        }

        if (x === 'pid'){
            let value = output[x]
            let search = value.search(/[0-9]{9}/)
            if (search < 0 || value.length !== 9){
                isValid = false
                return
            }
        }
    })

    if (isValid === true){
        validPassportCount ++
        console.log(output)
    }
})

console.log(validPassportCount)

interface Passport {
    [key: string] : string
}

type PassportField = 'byr' | 'iyr' | 'eyr' | 'hgt' | 'hcl' | 'ecl' | 'pid' | 'cid'