import produce from 'immer';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import * as H from '../../helpers';
// import {Crossword, InputClues, EditWordModal, ChooseGridModal} from '../ui';
import { make_request } from '../../helpers';
import useModals from '../../hooks/useModals';
import Crossword from '../ui/Crossword';
import withToast from '../wrappers/withToast';
import ChooseGridModal from './ChooseGridModal';


// TODO: pull this into a helper
const getEmptyCrossword = (grids) => {
    let binarygrid = H.grids.getRandom(grids);
    return {
        binarygrid,
        values: H.getEmptyValues(binarygrid.length),
        clues: H.clues.getCrosswordClues(binarygrid)
    };
};

// a clue looks like {"number":9,"length":5,"position":[1,0],"isAcross":true}

const EditCrossword = ({ toast, user, existingCrossword, grids, allCrosswords, mode } ) => {

    const [crossword, updateCrosswordState] = useState(existingCrossword || getEmptyCrossword(grids));

    // TODO: write a fancy hook to give this a nicer interface - maybe even make a little package.
    // should also include some information about the modal
    const modals = useModals({ editWord: false, chooseGrid: false });


    const isComplete = () => {
        const { binarygrid, clues, values, title } = crossword;
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
    };

    // TODO: pull this into a neat hook - again maybe a package
    const updateCrossword = (updateFn) => {
        updateCrosswordState(produce(crossword, updateFn));
    };

    const onEditWord = (answer, punctuation) => {
        let clueToChange = modals.editWord.info;
        let clueIndex = H.getClueIndex(crossword.clues, clueToChange);

        updateCrossword(_crossword => {
            _crossword.clues[clueIndex].punctuation = punctuation;
            _crossword.values = H.updateValues(_crossword.values, clueToChange, answer);
        });

        modals.editWord.hide();
    };

    const onEditQuestion = (clue, question) => {
        let clueIndex = H.getClueIndex(crossword.clues, clue);

        updateCrossword(_crossword => {
            _crossword.clues[clueIndex].question = question;
        });
    };

    const onEditTitle = (title) => {
        updateCrossword(_crossword => {
            _crossword.title = title;
        });
    };

    const onChooseGrid = (grid_layout) => {
        let binarygrid = H.grids.getBinaryGridFull(grid_layout);

        updateCrossword(_crossword => {
            _crossword.binarygrid = binarygrid;
            _crossword.values = H.getEmptyValues(binarygrid.length);
            _crossword.clues = H.clues.getCrosswordClues(binarygrid);
        });

        modals.chooseGrid.hide();
    };

    // TODO: make ispublished camelCase
    const onSave = ({ ispublished }) => {
        make_request(
            {
                url: mode === 'create' ? '/crosswords' : `/crosswords/${crossword.id}`,
                method: mode === 'create' ? 'POST' : 'PUT',
                data: { crosswords: { ...crossword, ispublished } }
            })
            .then(() => {
                if (mode === 'create') {
                    // TODO: change page to the edit version of this crossword unless its published.
                }
                if (ispublished) {
                    toast.success('Published!');
                    // TODO: change page to view this crossword
                } else {
                    toast.success('Saved!');
                }
            }
            );
    };

    let editWordModal, chooseGridModal;

    // if (modals.editWord.visible) {
    //     editWordModal = (
    //         <EditWordModal
    //             clue={modals.editWord.info}
    //             values={crossword.values}
    //             onOk={onEditWord}
    //             onCancel={modals.chooseGrid.hide}
    //         />
    //     );
    // }

    if (modals.chooseGrid.visible) {
        chooseGridModal = (
            <ChooseGridModal
                grids={grids}
                onChooseGrid={onChooseGrid}
                onCancel={modals.chooseGrid.hide}
            />
        );
    }

    return (
        <div>
            {editWordModal}
            {chooseGridModal}
            <div style={{ display: 'flex' }}>
                <div className="left-panel">
                    {/* <Input*/}
                    {/*    placeholder="Crossword Title"*/}
                    {/*    value={crossword.title}*/}
                    {/*    onChange={e => onEditTitle(e.target.value)}*/}
                    {/* />*/}
                    <Button onClick={modals.chooseGrid.show}>Choose different grid</Button>
                    <Crossword
                        binarygrid={crossword.binarygrid}
                        numbergrid={crossword.numbergrid}
                        values={crossword.values}
                        size="small"
                    />
                    <Button disabled={!crossword.title} onClick={onSave} size="large" type="primary" icon="save">
                        SAVE CHANGES
                    </Button>
                    <Button
                        disabled={!isComplete()}
                        style={{ marginLeft: '10px' }}
                        onClick={() => onSave({ ispublished: true })}
                        size="large"
                        type="primary"
                        icon="save"
                    >
                        PUBLISH
                    </Button>
                </div>
                {/* <InputClues*/}
                {/*    values={crossword.values}*/}
                {/*    clues={crossword.clues}*/}
                {/*    onSelectEdit={this.editWord}*/}
                {/*    onUpdate={info => this.onUpdate('editQuestion', info)}*/}
                {/* />*/}
            </div>
        </div>
    );
};

export default withToast(EditCrossword);
