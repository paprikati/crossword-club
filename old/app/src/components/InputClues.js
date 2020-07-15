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
                        style={{height: '40px', fontSize: '12px'}}
                        value={clue.question}
                        onChange={e => onUpdate({clue, question: e.target.value})}
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

    return (
        <div style={{width: '60%'}}>
            <div className="input-clues-header">Clues</div>
            <Tabs className="input-clues">{panes}</Tabs>
        </div>
    );
};

InputClues.propTypes = {
    clues: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectEdit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export default InputClues;
