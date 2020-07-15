import React, { useState } from 'react';

import * as H from '../../helpers';
import { make_request } from '../../helpers';
import ChooseBaseGrid from '../grids/ChooseBaseGrid';
import EditGrid from '../grids/EditGrid';
import withToast from '../wrappers/withToast';

const CreateGrid = ({ toast }) => {
    let [step, changeStep] = useState(1);
    let [binarygrid, updateBinaryGrid] = useState(H.grids.getBase(15, 'A'));

    function onSave() {
        let gridToStore = H.grids.convertBinaryToStored(binarygrid);
        make_request(
            {
                url: '/grids',
                method: 'POST',
                data: { grids: { layout: JSON.stringify(gridToStore) } }
            }).then(() => {
            //    TODO: do something more like a modal here with a mask and a 'if you dont get redirected click' button
            toast.success('Grid Saved!');
            setTimeout(() => {
                console.log('about to redirect');
                window.location.href = '/';
            }, 1500);
        }).catch(toast.error);
    }

    const step1 = <ChooseBaseGrid binarygrid={binarygrid} updateBinaryGrid={updateBinaryGrid} onContinue={() => changeStep(2)} />;

    const step2 = <EditGrid binarygrid={binarygrid} updateBinaryGrid={updateBinaryGrid} onBack={() => changeStep(1)} onSave={onSave}/>;

    return (
        <div className="add-grid">
            {step === 1 ? step1 : step2}
        </div>
    );
};

export default withToast(CreateGrid);
