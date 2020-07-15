import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import * as H from '../helpers';
import ChangePunctuation from './ChangePunctuation';
import InputWord from './InputWord';

const EditWordModal = ({ clue, values, onCancel, onOk }) => {
    let currentVal = H.getClueAnswer(values, clue);
    let [answer, updateAnswer] = useState(currentVal);
    let [punctuation, updatePunctuation] = useState(clue.punctuation);

    return (
        <Modal width={700} visible onCancel={onCancel} onOk={() => onOk({ answer, punctuation })}>
            <ChangePunctuation punctuation={punctuation} changePunctuation={updatePunctuation} />
            <InputWord answer={answer} onChange={updateAnswer} punctuation={punctuation} showPossibleWords />
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
