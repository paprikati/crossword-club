import React, {Component} from 'react';
import Frame from './Frame';

// holds all the methods for complex updating of the store
class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateStore = this.updateStore.bind(this);
    }

    updateStore() {}

    render() {
        return <Frame Store={Store} updateStore={this.updateStore} />;
    }
}

export default Store;
