import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Modal, List} from 'antd';
import * as H from '../helpers';
import Crossword from './Crossword';
import './ChooseGridModal.less';

const ChooseGridModal = ({onCancel, onOk, grids, refreshGrids}) => {
    let [selectedGridIndex, selectGrid] = useState(-1);

    useEffect(() => {
        refreshGrids();
    }, []);

    const renderItem = (grid, i) => {
        let binarygrid = H.grids.getBinaryGrid(grid);
        let img = <Crossword binarygrid={binarygrid} size="micro" />;
        let className = selectedGridIndex === i ? 'selected' : 'normal';
        return (
            <List.Item onClick={() => selectGrid(i)} key={i}>
                <div className={'select-grid-item ' + className}>{img}</div>
            </List.Item>
        );
    };

    return (
        <Modal
            okButtonProps={{disabled: selectedGridIndex < 0}}
            width="500px"
            visible
            onCancel={onCancel}
            onOk={() => onOk(grids[selectedGridIndex].grid)}
        >
            <List grid={{gutter: 16, column: 4}} dataSource={grids.map(x => x.grid)} renderItem={renderItem} />
        </Modal>
    );
};

ChooseGridModal.propTypes = {
    grids: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    refreshGrids: PropTypes.func.isRequired
};

export default ChooseGridModal;
