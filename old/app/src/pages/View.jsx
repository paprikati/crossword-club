import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Crossword, ViewClues, InputWordModal} from '../components';
import * as H from '../helpers';
import {Button, Modal} from 'antd';
import './View.less';
import produce from 'immer';

const View = ({crossword}) => {
    const {binarygrid, numbergrid, clues, title} = crossword;

    const [values, updateValues] = useState(H.getEmptyValues(binarygrid.length));
    const [selectedClues, updateSelectedClues] = useState(false);
    const [displayPrint, updateDisplayPrint] = useState(false);

    const fillInAnswer = ({across, down}) => {
        let newValues = produce(values, draft => {
            if (across.answer) {
                draft = H.updateValues(draft, across.clue, across.answer);
            }
            if (down.answer) {
                draft = H.updateValues(draft, down.clue, down.answer);
            }
            return draft;
        });
        updateValues(newValues);
        updateSelectedClues(false);
    };

    const onClickCell = ({cellNumber}) => {
        if (cellNumber) {
            let theseSelectedClues = clues.filter(x => x.number === cellNumber);
            updateSelectedClues(theseSelectedClues);
        }
    };

    let inputWordModal;

    if (selectedClues) {
        inputWordModal = (
            <InputWordModal
                values={values}
                clues={selectedClues}
                onOk={fillInAnswer}
                onCancel={() => updateSelectedClues(false)}
            />
        );
    }

    if (displayPrint) {
        return (
            <Modal width="90%" visible closable footer={false} onCancel={() => updateDisplayPrint(false)}>
                <div className="print-view-crossword">
                    <h1>{title}</h1>
                    <div style={{display: 'inline-block', width: '50%', verticalAlign: 'top'}}>
                        <Crossword
                            binarygrid={binarygrid}
                            numbergrid={numbergrid}
                            clues={clues}
                            values={values}
                            onClickCell={onClickCell}
                            size="small"
                            print
                        />
                    </div>
                    <div style={{display: 'inline-block', width: '50%', verticalAlign: 'top'}}>
                        <ViewClues print clues={clues} onSelectClue={clue => updateSelectedClues([clue])} />
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <div className="view-crossword">
            {inputWordModal}
            <div className="left">
                <div style={{display: 'flex'}}>
                    <div className="title">{title}</div>
                    <Button style={{marginLeft: 'auto', marginTop: 20}} icon="printer" onClick={() => updateDisplayPrint(true)}>
                        View Screenshot-Friendly
                    </Button>
                </div>
                <Crossword
                    binarygrid={binarygrid}
                    numbergrid={numbergrid}
                    clues={clues}
                    values={values}
                    onClickCell={onClickCell}
                    size="big"
                />
            </div>
            <div className="right">
                <ViewClues clues={clues} onSelectClue={clue => updateSelectedClues([clue])} />
            </div>
        </div>
    );
};

View.propTypes = {
    crossword: PropTypes.object.isRequired
};

export default View;
