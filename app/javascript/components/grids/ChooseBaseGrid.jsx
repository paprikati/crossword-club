import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';

import * as H from '../../helpers';
import Crossword from '../ui/Crossword';
import SegmentedControl from '../ui/SegmentedControl';

const ChooseBaseGrid = ({ binarygrid, updateBinaryGrid, onContinue }) => {
    let [gridStyle, updateGridStyle] = useState('A');
    let [gridWidth, updateGridWidth] = useState(15);
    // let [symmetricalMode, updateSymmetricalMode] = useState(true);

    function changeWidth(e) {
        let newWidth = e.target.value;
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

    let gridStyleOptions = ['A', 'B', 'C', 'D'].map(x => ({ value: x, label: `Style ${x}` }));

    return (
        <div className="choose-base-grid">
            <div className='page-heading'>
                <h3>Choose Base Grid</h3>
            </div>
            <SegmentedControl options={gridStyleOptions} onChange={changeStyle} value={gridStyle} />
            <Form.Row>
                <Col>
                    <Form.Control type="range" step={2} min={1} max={21} onChange={changeWidth} value={gridWidth}/>
                </Col>
                <Col id="grid-width-number-input">
                    <Form.Control type="number" step={2} min={1} max={21} onChange={changeWidth} value={gridWidth}/>
                </Col>
            </Form.Row>
            <div className="preview">
                <Crossword binarygrid={binarygrid} size="small" hideNumbers />
            </div>
            <Navbar className="footer" fixed="bottom">
                <Button className="continue u-float-right" variant="light" onClick={onContinue}>Continue</Button>
            </Navbar>
        </div>
    );
};

export default ChooseBaseGrid;
