export default function getBinaryGrid(halfgrid, numberOfCols) {
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
