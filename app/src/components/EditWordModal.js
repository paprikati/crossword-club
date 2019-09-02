import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'antd';
import * as H from '../helpers';
import InputWord from './InputWord';
import ChangePunctuation from './ChangePunctuation';

const EditWordModal = ({clue, values, onCancel, onOk}) => {
    let currentVal = H.getClueAnswer(values, clue);
    let [answer, updateAnswer] = useState(currentVal);
    let [punctuation, updatePunctuation] = useState(clue.punctuation);

    return (
        <Modal width={700} visible onCancel={onCancel} onOk={() => onOk({answer, punctuation})}>
            <InputWord answer={answer} onChange={updateAnswer} punctuation={punctuation} />
            <ChangePunctuation punctuation={punctuation} changePunctuation={updatePunctuation} />
        </Modal>
    );
};

EditWordModal.propTypes = {
    clue: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export default EditWordModal;
