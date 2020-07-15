import React, {Component} from 'react';
import Frame from './Frame';
import './Store.less';

// holds all the methods for complex updating of the store
class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.refreshGrids = this.refreshGrids.bind(this);
        this.refreshCrosswords = this.refreshCrosswords.bind(this);
    }

    componentDidMount() {
        this.refreshCrosswords();
        this.refreshGrids();
    }

    refreshGrids(cb) {
        // get crosswords
        this.props._fetch('api/crossword/grids', {method: 'GET'}, gridList => {
            this.setState({grids: gridList}, cb);
        });
    }

    refreshCrosswords(cb) {
        const sortCrosswords = (a, b) => {
            let _a = new Date(a.createddate).getTime();
            let _b = new Date(b.createddate).getTime();
            return _a < _b ? 1 : -1;
        };

        // get crosswords
        this.props._fetch('api/crossword', {method: 'GET'}, crosswordList => {
            this.setState({crosswords: crosswordList.sort(sortCrosswords)}, cb);
        });
    }

    render() {
        let _store = {
            ...this.state,
            refreshCrosswords: this.refreshCrosswords,
            refreshGrids: this.refreshGrids
        };

        return <Frame Store={_store} {...this.props} />;
    }
}

export default Store;
