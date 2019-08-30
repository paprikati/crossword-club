export function getBinaryGrid(halfgrid, numberOfCols) {
    let doubleLength = halfgrid.length * 2;
    numberOfCols = numberOfCols || doubleLength - 1;

    let fullgrid = completeGrid(halfgrid, numberOfCols);
    return fillBinaryGrid(fullgrid, numberOfCols);
}

export function completeGrid(halfgrid, numberOfCols) {
    // this will be the second half of the grid
    let stack = [];
    halfgrid.forEach((row, rowIndex) => {
        if (rowIndex + 1 !== halfgrid.length) {
            stack.push(invertRow(row, numberOfCols));
        }
    });
    stack.reverse();
    return halfgrid.concat(stack);
}

function invertRow(row, numberOfCols) {
    let ret = [];
    row.forEach(blackIndex => {
        ret.push(numberOfCols - 1 - blackIndex);
    });
    return ret;
}

export function fillBinaryGrid(grid, numberOfCols) {
    return grid.map(row => {
        let ret = [];
        for (let i = 0; i < numberOfCols; i++) {
            ret.push(row.includes(i) ? 0 : 1);
        }
        return ret;
    });
}

// displayGrid(grids.G4, 15);

// let testGrid = completeGrid(grids.G4, 15);
// let binaryGrid = fillBinaryGrid(testGrid, 15);

// getCrosswordNumbers(binaryGrid);

export function getCrosswordNumbers(binaryGrid) {
    let currentNumber = 1;
    let numberGrid = [];
    let clues = [];
    binaryGrid.forEach((row, rowIndex) => {
        numberGrid[rowIndex] = [];
        row.forEach((cell, colIndex) => {
            // if the cell is 0, cant be the start of anything so set it to 0 in the number grid.
            if (!cell) {
                numberGrid[rowIndex][colIndex] = 0;
                return;
            }

            const [startOfAcross, acrossLength] = getAcrossInfo(row, colIndex);

            if (startOfAcross) {
                clues.push({
                    number: currentNumber,
                    length: acrossLength,
                    position: [rowIndex, colIndex],
                    isAcross: true,
                    punctuation: getPunctuation(acrossLength)
                });
            }
            const [startOfDown, downLength] = getDownInfo(binaryGrid, rowIndex, colIndex);

            if (startOfDown) {
                clues.push({
                    number: currentNumber,
                    length: downLength,
                    position: [rowIndex, colIndex],
                    isAcross: false,
                    punctuation: getPunctuation(downLength)
                });
            }

            if (startOfAcross || startOfDown) {
                // add to across clues and down clues somewhere
                numberGrid[rowIndex][colIndex] = currentNumber;
                currentNumber++;
            } else {
                numberGrid[rowIndex][colIndex] = 0;
            }
        });
    });
    return {numberGrid, clues};
}

function getPunctuation(length) {
    let arr = new Array(length - 1);
    return arr.fill('');
}

function getAcrossInfo(row, colIndex) {
    let lengthOfClue = 0;

    let isFirstCol = colIndex === 0;
    let isLastCol = colIndex === row.length - 1;

    let cellBeforeIsZero = !isFirstCol && row[colIndex - 1] === 0;

    let nextCellIsOne = !isLastCol && row[colIndex + 1] === 1;

    // if its the first cell in the row OR the cell before is 0 AND the next cell is 1
    let isStartOfAcross = nextCellIsOne && (isFirstCol || cellBeforeIsZero);

    if (isStartOfAcross) {
        lengthOfClue++;
        for (let i = colIndex + 1; i < row.length; i++) {
            if (row[i]) {
                lengthOfClue++;
            } else {
                break;
            }
        }
    }
    return [isStartOfAcross, lengthOfClue];
}

function getDownInfo(binaryGrid, rowIndex, colIndex) {
    let lengthOfClue = 0;

    let isFirstRow = rowIndex === 0;
    let isLastRow = rowIndex === binaryGrid.length - 1;

    // Deal with Down clues
    let cellAboveIsZero = !isFirstRow && binaryGrid[rowIndex - 1][colIndex] === 0;

    let cellBelowIsOne = !isLastRow && binaryGrid[rowIndex + 1][colIndex] === 1;

    let isStartOfDown = cellBelowIsOne && (isFirstRow || cellAboveIsZero);

    if (isStartOfDown) {
        lengthOfClue++;
        for (let i = rowIndex + 1; i < binaryGrid.length; i++) {
            if (binaryGrid[i][colIndex]) {
                lengthOfClue++;
            } else {
                break;
            }
        }
    }
    return [isStartOfDown, lengthOfClue];
}

export function getEmptyValues(gridLength) {
    let row = new Array(gridLength);
    row.fill('', 0, gridLength);

    let output = [];
    for (let i = 0; i < gridLength; i++) {
        output.push([...row]);
    }
    return output;
}
export function getClueValue(values, clue) {
    let ret = [];

    let x = clue.position[0];
    let y = clue.position[1];

    for (let i = 0; i < clue.length; i++) {
        ret.push(values[x][y]);
        if (clue.isAcross) {
            y++;
        } else {
            x++;
        }
    }
    return ret;
}

// TODO: add punctuation
export function getDisplayValue(values, clue) {
    let ret = [];

    let x = clue.position[0];
    let y = clue.position[1];

    for (let i = 0; i < clue.length; i++) {
        let thisChar = values[x][y];
        if (thisChar === '') {
            ret.push('?');
        } else {
            ret.push(thisChar);
        }
        if (clue.punctuation[i] === '_') {
            ret.push(' ');
        } else if (clue.punctuation[i] === '-') {
            ret.push('-');
        }
        if (clue.isAcross) {
            y++;
        } else {
            x++;
        }
    }
    return ret.join('');
}

export function updateValues(currentValues, clue, value) {
    console.log('calling update values');
    let newVals = currentValues;

    let x = clue.position[0];
    let y = clue.position[1];

    for (let i = 0; i < clue.length; i++) {
        newVals[x][y] = value[i];
        if (clue.isAcross) {
            y++;
        } else {
            x++;
        }
    }
    return newVals;
}
// function displayGrid(halfGrid, numberOfCols) {
//     let fullGrid = completeGrid(halfGrid, numberOfCols);

//     // make it into a grid
//     let display = fullGrid
//         .map(row => {
//             let ret = [];
//             for (let i = 0; i < 15; i++) {
//                 ret.push(row.includes(i) ? block : ' ');
//             }
//             return ret.join(' ');
//         })
//         .join('\n');

//     console.log(display);
// }

export function punctuationArrToDisplay(arr) {
    let output = [];
    let partLength = 1;

    arr.forEach((item, i) => {
        if (item === '') {
            partLength++;
        } else {
            output.push(partLength);
            partLength = 1;
            let toPush = item === '_' ? ', ' : '-';
            output.push(toPush);
        }
    });

    output.push(partLength);
    return output.join('');
}

// wrap in try catch incase it cant parse
export function punctuationDisplayToArr(display) {
    let output = [];

    // split into words
    let words = display.split(',');

    words.forEach((word, wordIndex) => {
        let parts = word.split('-');

        parts.forEach((part, partIndex) => {
            let partLength = parseInt(part);
            // 1 indexed so you dont get extra blanks
            for (let i = 1; i < partLength; i++) {
                output.push('');
            }
            // check if theres another part
            if (parts[partIndex + 1]) {
                output.push('-');
            }
        });

        // check if theres another word
        if (words[wordIndex + 1]) {
            output.push('_');
        }
    });
    return output;
}
