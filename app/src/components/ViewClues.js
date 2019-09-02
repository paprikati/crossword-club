import React from 'react';
import PropTypes from 'prop-types';
import {Tabs} from 'antd';
import * as H from '../helpers';
import './ViewClues.less';

const ViewClues = ({clues, onSelectClue, print}) => {
    if (print) {
        function getClues(isAcross) {
            let theseClues = clues.filter(x => x.isAcross === isAcross);
            let clueList = theseClues.map(clue => {
                return (
                    <div style={{fontSize: 12}} key={clue.number}>
                        {H.getClueDisplay(clue)}
                    </div>
                );
            });
            return clueList;
        }

        let h3Style = {marginTop: -10, fontWeight: 'bold'};
        let divStyle = {width: '40%', display: 'inline-block', verticalAlign: 'top', marginRight: 30};

        return (
            <div>
                <div style={divStyle}>
                    <h3 style={h3Style}>Across</h3>
                    {getClues(true)}
                </div>
                <div style={divStyle}>
                    <h3 style={h3Style}>Down</h3>
                    {getClues(false)}
                </div>
            </div>
        );
    }

    const panes = [true, false].map(isAcross => {
        let theseClues = clues.filter(x => x.isAcross === isAcross);
        let clueComponents = theseClues.map(clue => {
            return (
                <div key={clue.number} className="clue" onClick={() => onSelectClue(clue)}>
                    {H.getClueDisplay(clue)}
                </div>
            );
        });

        return (
            <Tabs.TabPane tab={isAcross ? 'Across' : 'Down'} key={isAcross}>
                {clueComponents}
            </Tabs.TabPane>
        );
    });

    return (
        <div style={{width: '60%'}}>
            <div className="view-clues-header">Clues</div>
            <Tabs className="view-clues">{panes}</Tabs>
        </div>
    );
};

ViewClues.propTypes = {
    clues: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectClue: PropTypes.func.isRequired,
    print: PropTypes.bool
};
ViewClues.defaultProps = {
    print: false
};

export default ViewClues;
