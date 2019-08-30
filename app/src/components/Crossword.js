import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './Crossword.less';

const Crossword = ({binaryGrid, numberGrid, values, isSmall}) => {
    let rows = binaryGrid.map((row, rowIndex) => {
        let cells = row.map((cell, cellIndex) => {
            let cellContent = renderCellContent(numberGrid, values, cell, rowIndex, cellIndex);
            return (
                <div key={cellIndex} className="crossword-cell">
                    {cellContent}
                </div>
            );
        });
        return (
            <div key={rowIndex} className="crossword-row">
                {cells}
            </div>
        );
    });
    let className = isSmall ? 'crossword small' : 'crossword';
    return <div className={className}>{rows}</div>;
};

const renderCellContent = (numberGrid, values, cell, rowIndex, cellIndex) => {
    if (!cell) {
        return <div className="black" />;
    }
    let cellNumber = numberGrid[rowIndex][cellIndex];
    let cellContent = values[rowIndex][cellIndex];
    return (
        <Fragment>
            <div className="cell-number">{cellNumber || ''}</div>
            <div className="cell-content">{cellContent}</div>
        </Fragment>
    );
};

Crossword.propTypes = {
    binaryGrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    isSmall: PropTypes.bool.isRequired,
    numberGrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export default Crossword;
