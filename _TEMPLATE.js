import React, { Component } from 'react';
import PropTypes from 'prop-types';

// holds all the methods for complex updating of the store
class Something extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.function = this.function.bind(this);
    }

    function() {}

    render() {
        return <Button>Hello</Button>;
    }
}

Something.propTypes = {};

export default Something;
