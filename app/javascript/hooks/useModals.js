import { useState } from 'react';

export default function useModals(config) {

    const modals = {};

    Object.entries(config).forEach(([modalKey, initialValue]) => {
        let [val, setVal] = useState(initialValue);
        modals[modalKey] = {
            visible: !!val, // should the modal be visible
            info: val, // any extra info you've passed through about the modal
            show: info => setVal(info || true), // function to show the modal - will pass in any info as one arg
            hide: () => setVal(false) // function to hide the modal
        };
    });

    return modals;
}
