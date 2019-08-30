import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'antd';
import * as H from '../helpers';
import {Crossword, InputClues, InputWord, ChangePunctuation, EditWordModal} from '../components';

// holds all the methods for complex updating of the store
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            binaryGrid: props.binaryGrid,
            clues: props.clues,
            numberGrid: props.numberGrid,
            values: props.values,
            editWord: false
        };
        this.onUpdate = this.onUpdate.bind(this);
        this.editWord = this.editWord.bind(this);
    }

    onUpdate(action, info) {
        switch (action) {
            case 'editWord':
                let {answer, punctuation} = info;

                this.setState(currentState => {
                    let newClues = currentState.clues;
                    let clueToChange = this.state.editWord;
                    let clueIndex = H.getClueIndex(newClues, clueToChange);

                    newClues[clueIndex].punctuation = punctuation;

                    let newValues = H.updateValues(currentState.values, clueToChange, answer);

                    return {
                        clues: newClues,
                        values: newValues,
                        editWord: false
                    };
                });
                break;
            case 'editQuestion':
                let {clue, question} = info;

                this.setState(currentState => {
                    let newClues = currentState.clues;
                    let clueIndex = H.getClueIndex(newClues, clue);

                    newClues[clueIndex].question = question;
                    return {clues: newClues};
                });

                break;
            default:
                console.log(action);
                console.error('Error in switch Edit.jsx onUpdate');
        }
    }

    editWord(clue) {
        // {"number":9,"length":5,"position":[1,0],"isAcross":true}
        this.setState({editWord: clue});
    }

    render() {
        const {editWord, values} = this.state;
        let editWordModal;

        if (this.state.editWord) {
            editWordModal = (
                <EditWordModal
                    clue={editWord}
                    values={values}
                    onCancel={() => this.editWord(false)}
                    onOk={val => this.onUpdate('editWord', val)}
                />
            );
        }

        return (
            <div>
                {editWordModal}
                <div style={{display: 'flex'}}>
                    <div>
                        <Crossword
                            binaryGrid={this.state.binaryGrid}
                            numberGrid={this.state.numberGrid}
                            values={this.state.values}
                            isSmall
                        />
                        <Button size="large">SAVE CHANGES</Button>
                    </div>
                    <InputClues
                        values={this.state.values}
                        clues={this.state.clues}
                        onSelectEdit={this.editWord}
                        onUpdate={info => this.onUpdate('editQuestion', info)}
                    />
                </div>
            </div>
        );
    }
}

Edit.propTypes = {
    binaryGrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    clues: PropTypes.arrayOf(PropTypes.object).isRequired,
    numberGrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export default Edit;
