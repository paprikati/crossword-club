import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Tabs} from 'antd';
import * as H from '../helpers';
import InputWord from './InputWord';
import './InputWordModal.less';

// CLUES is just the clues you want to be in the modal (usually one, sometimes two)
const InputWordModal = ({clues, values, onCancel, onOk}) => {
    let acrossClue, downClue, acrossComponents, downComponents;
    clues.forEach(clue => {
        if (clue.isAcross) {
            acrossClue = clue;
        } else {
            downClue = clue;
        }
    });
    let [acrossAnswer, updateAcrossAnswer] = useState(acrossClue ? H.getClueAnswer(values, acrossClue) : null);
    let [downAnswer, updateDownAnswer] = useState(downClue ? H.getClueAnswer(values, downClue) : null);

    if (acrossClue) {
        acrossComponents = (
            <div>
                {H.getClueDisplay(acrossClue)}
                <InputWord answer={acrossAnswer} onChange={updateAcrossAnswer} punctuation={acrossClue.punctuation} />
            </div>
        );
    }
    if (downClue) {
        downComponents = (
            <div>
                {H.getClueDisplay(downClue)}
                <InputWord answer={downAnswer} onChange={updateDownAnswer} punctuation={downClue.punctuation} />
            </div>
        );
    }

    let modalContent;

    if (acrossClue && downClue) {
        modalContent = (
            <Tabs>
                <Tabs.TabPane tab="Across" key="across">
                    {acrossComponents}
                </Tabs.TabPane>

                <Tabs.TabPane tab="Down" key="down">
                    {downComponents}
                </Tabs.TabPane>
            </Tabs>
        );
    } else {
        modalContent = acrossComponents || downComponents;
    }

    let onOkInfo = {
        across: {
            answer: acrossAnswer,
            clue: acrossClue
        },
        down: {
            answer: downAnswer,
            clue: downClue
        }
    };

    return (
        <Modal width={700} className="input-word-modal" visible onCancel={onCancel} onOk={() => onOk(onOkInfo)}>
            {modalContent}
        </Modal>
    );
};

InputWordModal.propTypes = {
    clues: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export default InputWordModal;
