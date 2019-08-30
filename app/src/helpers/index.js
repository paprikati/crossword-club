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
    console.log('calling update values');
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

export {default as getCrosswordNumbers} from './getCrosswordNumbers';
export {default as punctuation} from './punctuation';
export {default as getBinaryGrid} from './getBinaryGrid';
