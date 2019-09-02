import React from 'react';
import grids from './grids';
import punctuation from './punctuation';

export {default as punctuation} from './punctuation';
export {default as clues} from './clues';
export {default as grids} from './grids';

export function getEmptyValues(gridLength) {
    let row = new Array(gridLength);
    row.fill('', 0, gridLength);

    let output = [];
    for (let i = 0; i < gridLength; i++) {
        output.push([...row]);
    }
    return output;
}
export function getClueAnswer(values, clue) {
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

export function getAnswerDisplay(values, clue) {
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

export function updateValues(currentValues, clue, answer) {
    let newVals = currentValues;

    let x = clue.position[0];
    let y = clue.position[1];

    for (let i = 0; i < clue.length; i++) {
        newVals[x][y] = answer[i];
        if (clue.isAcross) {
            y++;
        } else {
            x++;
        }
    }
    return newVals;
}

export function getClueIndex(clues, clue) {
    return clues.findIndex(x => x.number === clue.number && x.isAcross === clue.isAcross);
}

export function getRandomGrid(allGrids) {
    function randomIntFromInterval(min, max) {
        let rand = Math.random();
        let multiplier = max - min + 1;
        let randTimesMultiplier = rand * multiplier;
        // min and max included
        return Math.floor(randTimesMultiplier + min);
    }
    let thisGrid = allGrids[randomIntFromInterval(0, allGrids.length - 1)].grid;

    return grids.getBinaryGrid(thisGrid);
}

export function getClueDisplay(clue) {
    let clueDisplayLength = punctuation.arrToDisplay(clue.punctuation);
    return (
        <div className="clue-display">
            <b>{clue.number}</b> {clue.question} ({clueDisplayLength})
        </div>
    );
}

export function getBaseGrid(width, styleLetter) {
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
