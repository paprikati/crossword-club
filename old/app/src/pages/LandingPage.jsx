import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import './LandingPage.less';

const LandingPage = ({onChangePage}) => {
    return (
        <div className="landing-page-buttons">
            <Button type="primary" onClick={() => onChangePage('viewList')} icon="eye">
                View Crosswords
            </Button>
            <Button type="primary" onClick={() => onChangePage('create')} icon="plus">
                Create Crossword
            </Button>
            <Button type="primary" onClick={() => onChangePage('editList')} icon="edit">
                Edit Crossword
            </Button>
            <Button type="primary" onClick={() => onChangePage('addGrid')} icon="table">
                Add New Grid
            </Button>
        </div>
    );
};

LandingPage.propTypes = {
    onChangePage: PropTypes.func.isRequired
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
