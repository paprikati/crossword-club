import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'antd';
import * as H from '../helpers';
import InputWord from './InputWord';
import ChangePunctuation from './ChangePunctuation';

const EditWordModal = ({clue, values, onCancel, onOk}) => {
    let currentVal = H.getClueValue(values, clue);
    let [value, updateValue] = useState(currentVal);
    let [punctuation, updatePunctuation] = useState(clue.punctuation);

    return (
        <Modal visible onCancel={onCancel} onOk={() => onOk({value, punctuation})}>
            <InputWord value={value} onChange={updateValue} punctuation={punctuation} />
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
