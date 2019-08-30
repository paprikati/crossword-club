import React, {useRef, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import './InputWord.less';

// _ is a space, - is a dash.

const InputWord = ({value, punctuation, onChange}) => {
    const refs = [];

    function changeChar(char, charIndex) {
        let newValue = [...value];
        newValue[charIndex] = char.slice(-1).toUpperCase();
        if (charIndex + 1 < value.length) {
            refs[charIndex + 1].current.focus();
        }
        onChange(newValue);
    }

    let inputs = value.map((char, charIndex) => {
        refs[charIndex] = useRef();
        let punctuationDisplay;
        if (punctuation[charIndex]) {
            let divText = punctuation[charIndex] === '_' ? '' : '-';
            punctuationDisplay = <div className="punctuation-display">{divText}</div>;
        }
        return (
            <Fragment key={charIndex}>
                <Input
                    ref={refs[charIndex]}
                    onChange={e => changeChar(e.target.value, charIndex)}
                    key={charIndex}
                    className={'char-input'}
                    value={char}
                />
                {punctuationDisplay}
            </Fragment>
        );
    });

    return <div className="input-word flex">{inputs}</div>;
};

InputWord.propTypes = {
    onChange: PropTypes.func.isRequired,
    punctuation: PropTypes.arrayOf(PropTypes.oneOf(['_', '-', ''])).isRequired,
    value: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default InputWord;
