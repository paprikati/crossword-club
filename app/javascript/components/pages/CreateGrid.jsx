import React, {useState} from 'react';
import * as H from '../../helpers';
import ChooseBaseGrid from "../grids/ChooseBaseGrid";
import EditGrid from "../grids/EditGrid";

const CreateGrid = () => {
    let [step, changeStep] = useState(1);
    let [gridStyle, updateGridStyle] = useState('A');
    let [gridWidth, updateGridWidth] = useState(15);
    let [binarygrid, updateBinaryGrid] = useState(H.grids.getBase(15, 'A'));
    let [symmetricalMode, updateSymmetricalMode] = useState(true);

    function changeBaseGrid(width, style) {
        updateBinaryGrid(H.grids.getBase(width, style));
    }

    function onSave() {
        let gridToStore = H.grids.convertBinaryToStored(binarygrid);
        _fetch(
            `/api/crossword/grids`,
            {
                method: 'POST',
                body: JSON.stringify(gridToStore)
            },
            () => {
                message.success('Saved!');
                onChangePage('landing');
            }
        );
    }

    const step1 = <ChooseBaseGrid binarygrid={binarygrid} updateBinaryGrid={updateBinaryGrid} onContinue={() => changeStep(2)} />

    const step2 = <EditGrid binarygrid={binarygrid} updateBinaryGrid={updateBinaryGrid} onBack={() => changeStep(1)} onSave={onSave}/>

    return (
        <div className="add-grid">
            {step === 1 ? step1 : step2}
        </div>
    );
};

export default CreateGrid;
