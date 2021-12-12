import { readFileSync } from 'fs';
const file = readFileSync('day5input.txt', { encoding: 'utf-8' });
const lines = file.split('\n');
let highestSeat = 0;
const allSeatIds = [];
lines.forEach(x => {
    const rowCode = x.substr(0, 7);
    const seatCode = x.substring(7, 10);
    const row = rowCodeParser(rowCode);
    const seat = seatCodeParser(seatCode);
    const seatId = (row - 1) * 8 + (seat - 1);
    allSeatIds.push(seatId);
    //console.log(`row:${row} seat:${seat} seatId:${seatId}`)
    if (seatId > highestSeat) {
        highestSeat = seatId;
    }
});
allSeatIds.sort((a, b) => a - b);
allSeatIds.forEach((x, i) => {
    if (allSeatIds[i - 1]) {
        const prevSeatId = allSeatIds[i - 1];
        const currentSeatId = allSeatIds[i];
        if (currentSeatId - prevSeatId > 1)
            console.log(`previousSeat:${prevSeatId}, currentSeat:${currentSeatId}`);
    }
});
//console.log(`${allSeatIds.sort((a,b) => a-b)}`)
//console.log(`highestSeat:${highestSeat}`)
//e.g. 'FBBFFFB'
function rowCodeParser(input) {
    let front = 1;
    let back = 128;
    for (let index = 0; index <= input.length; index++) {
        const element = input[index];
        if (element === 'F') {
            back = back - Math.ceil((back - front) / 2);
        }
        if (element === 'B') {
            front = front + Math.ceil((back - front) / 2);
        }
    }
    return front;
}
//e.g. 'LRR'
function seatCodeParser(input) {
    let left = 1;
    let right = 8;
    for (let index = 0; index <= input.length; index++) {
        const element = input[index];
        if (element === 'L') {
            right = right - Math.ceil((right - left) / 2);
        }
        if (element === 'R') {
            left = left + Math.ceil((right - left) / 2);
        }
    }
    return left;
}
