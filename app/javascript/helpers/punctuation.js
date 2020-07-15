function arrToDisplay(arr) {
    let output = [];
    let partLength = 1;

    arr.forEach(item => {
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
function displayToArr(display) {
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

export default {
    arrToDisplay,
    displayToArr
};
