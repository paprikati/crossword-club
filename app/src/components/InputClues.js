import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Input, Button} from 'antd';
import * as H from '../helpers';
import './InputClues.less';

const InputClues = ({values, clues, onSelectEdit, onUpdate}) => {
    let config = [
        {title: 'Across', clues: clues.filter(x => x.isAcross)},
        {title: 'Down', clues: clues.filter(x => !x.isAcross)}
    ];

    let panes = config.map(ea => {
        let clueComponents = ea.clues.map(clue => {
            let answer = H.getAnswerDisplay(values, clue);
            let clueDisplayLength = H.punctuation.arrToDisplay(clue.punctuation);
            return (
                <div key={clue.number} className="input-clue">
                    <div className="flex">
                        <div className="number">{clue.number}</div>
                        <div className="answer">{answer}</div>
                        <div className="length">({clueDisplayLength})</div>
                        <Button onClick={() => onSelectEdit(clue)} className="button" icon="edit" />
                    </div>
                    <Input.TextArea
                        value={clue.question}
                        onChange={e => onUpdate({clue, question: e.target.value})}
                        rows={2}
                        className="clue"
                    />
                </div>
            );
        });

        return (
            <Tabs.TabPane tab={ea.title} key={ea.title}>
                {clueComponents}
            </Tabs.TabPane>
        );
    });

    return <Tabs className="input-clues">{panes}</Tabs>;
};

InputClues.propTypes = {
    clues: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectEdit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export default InputClues;
