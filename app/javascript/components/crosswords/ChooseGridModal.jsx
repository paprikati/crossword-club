import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import * as H from '../../helpers';
import Crossword from '../ui/Crossword';

const ChooseGridModal = ({ onCancel, onChooseGrid, grids }) => {
    let [selectedGridIndex, selectGrid] = useState(-1);

    // TODO: store which one is selected
    const gridCards = grids.map((grid, i) => {
        let gridLayout = JSON.parse(grid.layout);
        let binarygrid = H.grids.getBinaryGridFull(gridLayout);
        let className = selectedGridIndex === i ? 'selected' : 'normal';

        return (
            <div key={grid.id} className={'select-grid-item ' + className} onClick={() => selectGrid(i)}>
                <Crossword binarygrid={binarygrid} size="micro"/>
            </div>
        );
    });

    // const renderItem = (grid, i) => {
    //     let binarygrid = H.grids.getBinaryGrid(grid);
    //     let img = <Crossword binarygrid={binarygrid} size="micro" />;
    //     let className = selectedGridIndex === i ? 'selected' : 'normal';
    //     return (
    //         <List.Item onClick={() => selectGrid(i)} key={i}>
    //             <div className={'select-grid-item ' + className}>{img}</div>
    //         </List.Item>
    //     );
    // };
    // {/*<List grid={{gutter: 16, column: 4}} dataSource={grids.map(x => x.grid)} renderItem={renderItem} />*/}

    return (
        <Modal show onHide={onCancel} width="500px">
            <Modal.Header closeButton>
                <Modal.Title>Choose Grid</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="choose-grid-list">
                    {gridCards}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onChooseGrid(JSON.parse(grids[selectedGridIndex].layout))}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChooseGridModal;
