import React from 'react';

import EditCrossword from '../crosswords/EditCrossword';

const CreateCrossword = ( { user, grids, allCrosswords } ) => {

    return (
        <div className="create-crossword">
            <div className='page-heading'>
                <h3>Create New Crossword</h3>
            </div>
            <EditCrossword user={user} grids={grids} allCrosswords={allCrosswords} mode="create" />

        </div>
    );
};

export default CreateCrossword;
