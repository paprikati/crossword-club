import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Input, message, Popconfirm, Spin} from 'antd';
import * as H from '../helpers';
import produce from 'immer';
import {v4 as uuid} from 'uuid';
import {Crossword, InputClues, EditWordModal, ChooseGridModal} from '../components';
import './Edit.less';

// holds all the methods for complex updating of the store
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crossword: props.crossword,
            mode: props.mode,
            editWord: false
        };
        this.editWord = this.editWord.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onSave = this.onSave.bind(this);
        this.isComplete = this.isComplete.bind(this);
        this.chooseGrid = this.chooseGrid.bind(this);
    }

    componentDidMount() {
        if (!this.state.crossword) {
            this.setState({crossword: getEmptyCrossword(this.props.Store.grids)});
        }
    }

    isComplete() {
        const {binarygrid, clues, values, title} = this.state.crossword;

        if (!title) return false;

        // check all the clues have a clue

        for (let clue of clues) {
            if (!clue.question) {
                return false;
            }
        }

        // go through each white space in the binarygrid and make sure it has a letter
        for (let x = 0; x < binarygrid.length; x++) {
            let row = binarygrid[x];
            for (let y = 0; y < row.length; y++) {
                let cell = row[y];
                if (cell && !values[x][y]) {
                    return false;
                }
            }
        }

        return true;
    }

    onUpdate(action, info) {
        this.setState(currentState => {
            return produce(currentState, draft => {
                switch (action) {
                    case 'editWord':
                        let {answer, punctuation} = info;

                        let clueToChange = draft.editWord;
                        let clueIndex = H.getClueIndex(draft.crossword.clues, clueToChange);

                        draft.crossword.clues[clueIndex].punctuation = punctuation;
                        draft.crossword.values = H.updateValues(draft.crossword.values, clueToChange, answer);
                        draft.editWord = false;

                        break;
                    case 'editQuestion':
                        let clueToChange_2 = info.clue;
                        let clueIndex_1 = H.getClueIndex(draft.crossword.clues, clueToChange_2);

                        draft.crossword.clues[clueIndex_1].question = info.question;
                        break;
                    case 'editTitle':
                        draft.crossword.title = info;
                        break;
                    case 'chooseGrid':
                        let binarygrid = H.grids.getBinaryGrid(info);
                        draft.crossword.binarygrid = binarygrid;
                        draft.crossword.values = H.getEmptyValues(binarygrid.length);
                        draft.crossword.clues = H.clues.getCrosswordClues(binarygrid);
                        draft.chooseGrid = false;
                        break;
                    default:
                        console.log(action);
                        console.error('Error in switch Edit.jsx onUpdate');
                }
                return draft;
            });
        });
    }

    editWord(clue) {
        // {"number":9,"length":5,"position":[1,0],"isAcross":true}
        this.setState({editWord: clue});
    }

    onSave({ispublished}) {
        this.props._fetch(
            `/api/crossword/${this.state.mode}`,
            {
                method: 'POST',
                body: JSON.stringify({...this.state.crossword, ispublished})
            },
            () => {
                if (this.state.mode === 'create') {
                    this.setState({mode: 'update'});
                }
                if (ispublished) {
                    message.success('Published!');
                    this.props.onChangePage('view', this.state.crossword);
                } else {
                    message.success('Saved!');
                }
            }
        );
    }

    chooseGrid(val) {
        this.setState({chooseGrid: val});
    }

    render() {
        const {editWord, crossword} = this.state;
        let editWordModal, chooseGridModal;

        if (!crossword) {
            return <Spin />;
        }

        if (this.state.editWord) {
            editWordModal = (
                <EditWordModal
                    clue={editWord}
                    values={crossword.values}
                    onCancel={() => this.editWord(false)}
                    onOk={val => this.onUpdate('editWord', val)}
                />
            );
        }

        if (this.state.chooseGrid) {
            chooseGridModal = (
                <ChooseGridModal
                    grids={this.props.Store.grids}
                    refreshGrids={this.props.Store.refreshGrids}
                    onOk={grid => this.onUpdate('chooseGrid', grid)}
                    onCancel={() => this.chooseGrid(false)}
                />
            );
        }

        return (
            <div>
                {editWordModal}
                {chooseGridModal}
                <div style={{display: 'flex'}}>
                    <div className="left-panel">
                        <Input
                            placeholder="Crossword Title"
                            value={crossword.title}
                            onChange={e => this.onUpdate('editTitle', e.target.value)}
                        />
                        <Popconfirm
                            title="Are you sure? This will delete all your progress"
                            onConfirm={this.chooseGrid}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon="table">Choose different grid</Button>
                        </Popconfirm>
                        <Crossword
                            binarygrid={crossword.binarygrid}
                            numbergrid={crossword.numbergrid}
                            values={crossword.values}
                            size="small"
                        />
                        <Button disabled={!crossword.title} onClick={this.onSave} size="large" type="primary" icon="save">
                            SAVE CHANGES
                        </Button>
                        <Button
                            disabled={!this.isComplete()}
                            style={{marginLeft: '10px'}}
                            onClick={() => this.onSave({ispublished: true})}
                            size="large"
                            type="primary"
                            icon="save"
                        >
                            PUBLISH
                        </Button>
                    </div>
                    <InputClues
                        values={crossword.values}
                        clues={crossword.clues}
                        onSelectEdit={this.editWord}
                        onUpdate={info => this.onUpdate('editQuestion', info)}
                    />
                </div>
            </div>
        );
    }
}

function getEmptyCrossword(grids) {
    let binarygrid = H.getRandomGrid(grids);
    return {
        binarygrid,
        values: H.getEmptyValues(binarygrid.length),
        id: uuid(),
        clues: H.clues.getCrosswordClues(binarygrid)
    };
}

// TODO: validate shape of crossword across the app
Edit.propTypes = {
    Store: PropTypes.object.isRequired,
    _fetch: PropTypes.func.isRequired,
    // id: PropTypes.string.isRequired,
    // binarygrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    // clues: PropTypes.arrayOf(PropTypes.object).isRequired,
    crossword: PropTypes.object,
    mode: PropTypes.oneOf(['create', 'update']).isRequired,
    onChangePage: PropTypes.func.isRequired
    // numbergrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    // values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

Edit.defaultProps = {
    crossword: null
};

export default Edit;
