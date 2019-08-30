import React from 'react';
import PropTypes from 'prop-types';
import {Input, message} from 'antd';
import * as H from '../helpers';
import './ChangePunctuation.less';

// _ is a space, - is a dash.

const ChangePunctuation = ({punctuation, changePunctuation}) => {
    let displayVal = H.punctuation.arrToDisplay(punctuation);

    function onBlur(e) {
        let val = e.target.value;
        try {
            let arr = H.punctuation.displayToArr(val);
            if (arr.length !== punctuation.length) {
                throw 'wrong length';
            }
            changePunctuation(arr);
        } catch (err) {
            message.error('Invalid input. Check number of letters.');
        }
    }

    return (
        <div className="change-punctuation">
            <Input defaultValue={displayVal} onBlur={onBlur} />
        </div>
    );
};

ChangePunctuation.propTypes = {
    changePunctuation: PropTypes.func.isRequired,
    punctuation: PropTypes.arrayOf(PropTypes.oneOf(['_', '-', ''])).isRequired
};

export default ChangePunctuation;
