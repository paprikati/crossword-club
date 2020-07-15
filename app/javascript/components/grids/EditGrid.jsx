import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import * as H from '../../helpers';
import Crossword from '../ui/Crossword';
import SegmentedControl from '../ui/SegmentedControl';
import withToast from '../wrappers/withToast';

const EditGrid = ({ binarygrid, updateBinaryGrid, onBack, onSave, toast }) => {
    let [symmetricalMode, updateSymmetricalMode] = useState(true);

    const onClickCell = ({ rowIndex, cellIndex, cellBinary }) => {
        // if its the bottom half of the grid, message that they cant change that in symmetrical mode
        let halfway = Math.ceil(binarygrid.length / 2);
        if (symmetricalMode && rowIndex >= halfway) {
            toast.error('In symmetrical mode, you can only edit cells in the top half of the grid');
            return;
        }

        // HACK sorry
        let newBinaryGrid = JSON.parse(JSON.stringify(binarygrid));

        // flip it from what it was before
        newBinaryGrid[rowIndex][cellIndex] = cellBinary ? 0 : 1;

        // if symmetrical, rebuild from halfgrid.
        if (symmetricalMode) {
            let halfgrid = newBinaryGrid.slice(0, halfway);
            newBinaryGrid = H.grids.completeBinaryGrid([...halfgrid], newBinaryGrid.length);
        }

        updateBinaryGrid(newBinaryGrid);
    };

    return (
        <div className="edit-grid">
            <div className='page-heading'>
                <h3>Configure your grid</h3>
                <small>Click a cell to change its colour</small>
            </div>
            <div className="preview">
                <SegmentedControl
                    value={symmetricalMode}
                    label="Symmetrical Mode?"
                    width="300px"
                    onChange={updateSymmetricalMode}
                    options={[{ label: 'On', value: true }, { label: 'Off', value: false }]}
                />
                <Crossword binarygrid={binarygrid} onClickCell={onClickCell} size="medium" />
            </div>
            <Navbar className="footer" fixed="bottom">
                <Button className="back " variant="light" onClick={onBack}>Back</Button>
                <Button className="save u-float-right" variant="light" onClick={onSave}>Save</Button>
            </Navbar>
        </div>
    );
};

export default withToast(EditGrid);
