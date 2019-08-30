import React, {Component} from 'react';
import LandingPage from '../pages/LandingPage';
import Edit from '../pages/Edit';
import grids from '../data/grids';
import * as H from '../helpers';
import {Crossword, InputClues, InputWord, ChangePunctuation} from '../components';
import {Button} from 'antd';

// holds all the methods for complex updating of the store
class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'landing'
        };
        this.updateStore = this.updateStore.bind(this);
        this.onAction = this.onAction.bind(this);
    }

    updateStore() {}

    onAction(action) {
        switch (action) {
            case 'create':
                this.setState({page: 'create'});
            default:
                console.log('error in switch');
                console.log(action);
        }
    }

    render() {
        let user = {id: '123'};

        switch (this.state.page) {
            case 'landing':
                return <LandingPage onAction={this.onAction} user={user} />;
            case 'create':
                // randomly select a grid
                let binaryGrid = getRandomGrid();
                // apply empty values
                let values = H.getEmptyValues(binaryGrid.length);
                let {numberGrid, clues} = H.getCrosswordNumbers(binaryGrid);

                return <Edit binaryGrid={binaryGrid} values={values} numberGrid={numberGrid} clues={clues} />;
            case 'edit':
            // load in this crossword to this.state
            default:
                return <div>ERROR in switch statement Frame.jsx</div>;
        }

        return (
            <div>
                {/* <InputWord initialValue={['A', '', '', '', '', 'C', '']}
                canChangePunctuation={false} punctuation={punctuation} />
                <ChangePunctuation punctuation={punctuation} changePunctuation={changePunctuation} /> */}
                {/* <div style={{display: 'flex'}}>
                    <div>
                        <Crossword binaryGrid={binaryGrid} numberGrid={numberGrid} values={values} isSmall />
                        <Button size="large">SAVE CHANGES</Button>
                    </div>
                    <InputClues values={values} clues={clues} />
                </div> */}
            </div>
        );
    }
}

export default Frame;

function getRandomGrid() {
    let thisGrid = grids[randomIntFromInterval(0, grids.length - 1)];
    return H.getBinaryGrid(thisGrid);
}

function randomIntFromInterval(min, max) {
    let rand = Math.random();
    let multiplier = max - min + 1;
    let randTimesMultiplier = rand * multiplier;
    // min and max included
    return Math.floor(randTimesMultiplier + min);
}

// let binaryGrid = H.getBinaryGrid(G3);

// let values = [
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'],
//     ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E']
// ];
// let {numberGrid, clues} = H.getCrosswordNumbers(binaryGrid);

// let punctuation = ['', '', '', '_', '', ''];

// function changePunctuation(val) {
//     console.log('changing punctuation');
//     console.log(val);
// }
