function getBinaryGrid(halfgrid, numberOfCols) {
    let doubleLength = halfgrid.length * 2;
    numberOfCols = numberOfCols || doubleLength - 1;

    let fullgrid = completeGrid(halfgrid, numberOfCols);
    return fillBinaryGrid(fullgrid, numberOfCols);
}

function completeGrid(halfgrid, numberOfCols) {
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

function fillBinaryGrid(grid, numberOfCols) {
    return grid.map(row => {
        let ret = [];
        for (let i = 0; i < numberOfCols; i++) {
            ret.push(row.includes(i) ? 0 : 1);
        }
        return ret;
    });
}

function completeBinaryGrid(halfbinarygrid) {
    // this will be the second half of the grid
    let stack = [];
    halfbinarygrid.forEach((row, rowIndex) => {
        if (rowIndex + 1 !== halfbinarygrid.length) {
            stack.push([...row].reverse());
        }
    });
    stack.reverse();
    return halfbinarygrid.concat(stack);
}

function convertBinaryToStored(binarygrid) {
    let ret = [];
    let toSlice = Math.ceil(binarygrid.length / 2);
    binarygrid.slice(0, toSlice).forEach(row => {
        let toPush = [];
        row.forEach((cell, cellIndex) => {
            if (!cell) {
                toPush.push(cellIndex);
            }
        });
        ret.push(toPush);
    });
    return ret;
}

function getBase(width, styleLetter) {
    // TRUE = even, FALSE = odd
    const styleLookup = {
        A: {
            rows: false,
            blacks: false
        },
        B: {
            rows: true,
            blacks: true
        },
        C: {
            rows: false,
            blacks: true
        },
        D: {
            rows: true,
            blacks: false
        }
    };

    let style = styleLookup[styleLetter];

    let grid = [];

    for (let x = 0; x < width; x++) {
        let row = [];
        let rowIsImpacted = isEven(x) === style.rows;

        for (let y = 0; y < width; y++) {
            // work out if this cell is impacted
            row.push(rowIsImpacted && isEven(y) === style.blacks ? 0 : 1);
        }
        grid.push(row);
    }
    return grid;
}

const isEven = num => num % 2 === 0;

function getRandom(allGrids) {
    function randomIntFromInterval(min, max) {
        let rand = Math.random();
        let multiplier = max - min + 1;
        let randTimesMultiplier = rand * multiplier;
        // min and max included
        return Math.floor(randTimesMultiplier + min);
    }
    let thisGrid = allGrids[randomIntFromInterval(0, allGrids.length - 1)].grid;

    return getBinaryGrid(thisGrid);
}

export default {
    getBinaryGrid,
    completeBinaryGrid,
    convertBinaryToStored,
    getBase,
    getRandom
};
