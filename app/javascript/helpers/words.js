const rawWords1 = require('../data/common.json').words;
// const rawWords2 = require('../data/all.json').words;
// const words = rawWords1.split('\n').concat(rawWords2.split('\n'));

const words = rawWords1.split('\n');

function getPossibleWords(values) {
    let results = [];
    let countOfResults = 0;
    for (let word of words) {
        if (matches(word, values)) {
            countOfResults++;
            results.push(word.toLowerCase());
        }
        if (countOfResults >= 15) {
            break;
        }
    }
    return results.sort();
}

function matches(word, values) {
    if (word.length !== values.length) return false;
    let i = 0;
    for (let char of word) {
        if (values[i] === '' || char.toLowerCase() === values[i].toLowerCase()) {
            i++;
            continue;
        } else {
            return false;
        }
    }
    return true;
}

export default { getPossibleWords };
