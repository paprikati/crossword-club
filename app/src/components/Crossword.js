import React from 'react';
import PropTypes from 'prop-types';
import * as H from '../helpers';
import './Crossword.less';

// onClickCell will be called with ({rowIndex, cellIndex, cellNumber, cellContent})
const Crossword = ({binarygrid, values, size, onClickCell, print}) => {
    const numbergrid = H.clues.getNumberGrid(binarygrid);

    const renderCellContent = (cellBinary, rowIndex, cellIndex) => {
        let onClick = () => onClickCell({rowIndex, cellIndex, cellNumber, cellContent, cellBinary});

        let cellNumber = numbergrid[rowIndex][cellIndex];
        let cellContent = values ? values[rowIndex][cellIndex] : null;

        if (print) {
            let fillColour = cellBinary ? '#fff' : '000';
            let xvalue = 30 * cellIndex;
            let yvalue = 30 * rowIndex;
            return (
                <g>
                    <rect
                        x={xvalue}
                        y={yvalue}
                        width="30"
                        height="30"
                        style={{fill: fillColour, stroke: '#000', strokeWidth: 2}}
                    />
                    <text style={{fontSize: 'smaller'}} x={xvalue + 2} y={yvalue + 12} className="cell-number">
                        {cellNumber || ''}
                    </text>
                </g>
            );
        }

        if (!cellBinary) {
            return <div onClick={onClick} className="black" />;
        }

        let cellContentClassName = cellNumber ? 'cell-content has-number' : 'cell-content';
        return (
            <div onClick={onClick}>
                <div className="cell-number">{cellNumber || ''}</div>
                <div className={cellContentClassName}>{cellContent}</div>
            </div>
        );
    };

    let rows = binarygrid.map((row, rowIndex) => {
        let cells = row.map((cell, cellIndex) => {
            let cellContent = renderCellContent(cell, rowIndex, cellIndex);
            if (print) {
                return cellContent;
            }
            return (
                <div key={cellIndex} className="crossword-cell">
                    {cellContent}
                </div>
            );
        });

        if (print) {
            return cells;
        }
        return (
            <div key={rowIndex} className="crossword-row">
                {cells}
            </div>
        );
    });
    if (print) {
        return (
            <div style={{width: '450px', height: '450px'}}>
                <svg viewBox="0, 0, 450,450">{rows}</svg>
            </div>
        );
    }
    return <div className={'crossword ' + size}>{rows}</div>;
};

Crossword.propTypes = {
    binarygrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    onClickCell: PropTypes.func,
    print: PropTypes.bool,
    size: PropTypes.oneOf(['big', 'small', 'micro']).isRequired,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

Crossword.defaultProps = {
    values: null,
    onClickCell: () => {},
    print: false
};

export default Crossword;
