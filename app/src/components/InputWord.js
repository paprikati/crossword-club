import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as H from '../helpers';
import {Input} from 'antd';
import './InputWord.less';

// _ is a space, - is a dash.

class InputWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChar: 0
        };
        this.updateCurrentChar = this.updateCurrentChar.bind(this);
        this.updateWord = this.updateWord.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.currentCharInputRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyPress);
        this.currentCharInputRef.current.focus();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyPress);
    }

    onKeyPress(event) {
        const {currentChar} = this.state;
        if (event.keyCode === 37 || event.keyCode === 8) {
            this.updateCurrentChar(currentChar - 1);
        } else if (event.keyCode === 39) {
            this.updateCurrentChar(currentChar + 1);
        }
    }

    updateCurrentChar(char) {
        // check if char is relevant?
        if (char >= 0 && char < this.props.answer.length) {
            this.setState({currentChar: char}, () => {
                this.currentCharInputRef.current.focus();
            });
        }
    }

    updateWord(char, charIndex) {
        let newValue = [...this.props.answer];
        newValue[charIndex] = char.slice(-1).toUpperCase();
        this.updateCurrentChar(charIndex + 1);
        this.props.onChange(newValue);
    }

    render() {
        const {currentChar} = this.state;
        const {answer, punctuation} = this.props;

        let possibleWords;

        if (this.props.showPossibleWords) {
            possibleWords = (
                <div className="suggestions">
                    <div className="heading">Suggestions:</div>
                    {H.words.getPossibleWords(answer).map((word, i) => {
                        return <div key={i}>{word}</div>;
                    })}
                </div>
            );
        }

        let inputs = answer.map((char, charIndex) => {
            let punctuationDisplay;
            if (punctuation[charIndex]) {
                let divText = punctuation[charIndex] === '_' ? '' : '-';
                punctuationDisplay = <div className="punctuation-display">{divText}</div>;
            }
            return (
                <Fragment key={charIndex}>
                    <Input
                        ref={charIndex === currentChar ? this.currentCharInputRef : null}
                        onChange={e => this.updateWord(e.target.value, charIndex)}
                        onClick={() => this.updateCurrentChar(charIndex)}
                        key={charIndex}
                        className="char-input"
                        value={char}
                    />
                    {punctuationDisplay}
                </Fragment>
            );
        });

        return (
            <div>
                <div className="input-word flex">{inputs}</div>
                {possibleWords}
            </div>
        );
    }
}

InputWord.propTypes = {
    answer: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    punctuation: PropTypes.arrayOf(PropTypes.oneOf(['_', '-', ''])).isRequired,
    showPossibleWords: PropTypes.bool
};

InputWord.defaultProps = {
    showPossibleWords: false
};

export default InputWord;
