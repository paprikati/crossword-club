export default function getCrosswordNumbers(binaryGrid) {
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
