import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';

const LandingPage = ({user, onAction}) => {
    return (
        <Fragment>
            <Button onClick={() => onAction('view')} icon="eye">
                View Crosswords
            </Button>
            <Button onClick={() => onAction('create')} icon="plus">
                Create Crossword
            </Button>
            <Button onClick={() => onAction('edit')} icon="edit">
                Edit Crossword
            </Button>
        </Fragment>
    );
};

LandingPage.propTypes = {
    onAction: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default LandingPage;

/*

Frame holds a 'page' state.

Landing page (view, create, edit)

Create (select grid)

Edit (+ Publish)

used for both choosing one to edit and choosing one to view
SelectCrossword

View (id=)

*/
