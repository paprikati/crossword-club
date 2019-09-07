import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Steps, Slider, InputNumber, message} from 'antd';
import {Crossword, SegmentedControl} from '../components';
import * as H from '../helpers';
import './AddGrid.less';

// TODO: confirm grid doesnt exist before writing to the db
const AddGrid = ({_fetch, onChangePage}) => {
    let [step, changeStep] = useState(0);
    let [gridStyle, updateGridStyle] = useState('A');
    let [gridWidth, updateGridWidth] = useState(15);
    let [binarygrid, updateBinaryGrid] = useState(H.grids.getBase(15, 'A'));
    let [symmetricalMode, updateSymmetricalMode] = useState(true);

    function changeWidth(newWidth) {
        updateGridWidth(newWidth);
        changeBaseGrid(newWidth, gridStyle);
    }

    function changeStyle(newStyle) {
        updateGridStyle(newStyle);
        changeBaseGrid(gridWidth, newStyle);
    }

    function changeBaseGrid(width, style) {
        updateBinaryGrid(H.grids.getBase(width, style));
    }

    let gridStyleOptions = ['A', 'B', 'C', 'D'].map(x => ({value: x, label: `Style ${x}`}));
    let selectGridStyleControl = (
        <SegmentedControl options={gridStyleOptions} onChange={changeStyle} disabled={step === 1} value={gridStyle} />
    );

    const onClickCell = ({rowIndex, cellIndex, cellBinary}) => {
        // if its step 0, return as no action required
        if (step === 0) return;

        // if its the bottom half of the grid, message that they cant change that in symmetrical mode
        let halfway = Math.ceil(binarygrid.length / 2);
        if (symmetricalMode && rowIndex >= halfway) {
            message.error('You can only edit cells in the top half of the grid');
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

    function onSave() {
        let gridToStore = H.grids.convertBinaryToStored(binarygrid);
        _fetch(
            `/api/crossword/grids`,
            {
                method: 'POST',
                body: JSON.stringify(gridToStore)
            },
            () => {
                message.success('Saved!');
                onChangePage('landing');
            }
        );
    }

    return (
        <div className="add-grid">
            <Steps className="steps" current={step}>
                <Steps.Step title="Choose Base" description="Set up your grid" />
                <Steps.Step title="Customise" description="Click on a cell to change its colour" />
            </Steps>
            <div className="flex">
                <div className="left">
                    {selectGridStyleControl}
                    <div className="flex">
                        <Slider disabled={step === 1} step={2} min={1} max={21} onChange={changeWidth} value={gridWidth} />
                        <InputNumber
                            disabled={step === 1}
                            min={1}
                            max={21}
                            onChange={changeWidth}
                            value={gridWidth}
                            style={{marginLeft: 16, marginRight: 3}}
                        />
                    </div>
                    <Button className="continue" disabled={step === 1} onClick={() => changeStep(1)}>
                        Continue
                    </Button>
                </div>
                <div className="right">
                    {/* <SegmentedControl
                        value={symmetricalMode}
                        disabled={step === 0}
                        label="Symmetrical Mode?"
                        width="300px"
                        onChange={updateSymmetricalMode}
                        options={[{label: 'On', value: true}, {label: 'Off', value: false}]}
                    /> */}
                    <Crossword binarygrid={binarygrid} onClickCell={onClickCell} size="small" />
                    <Button className="back" disabled={step === 0} onClick={() => changeStep(0)}>
                        Back
                    </Button>
                    <Button className="save" type="primary" disabled={step === 0} onClick={onSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

AddGrid.propTypes = {
    _fetch: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired
};

export default AddGrid;
