import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// options is an array of [{label:'A', value:'a'}];
const SegmentedControl = ({onChange, value, options, label, width}) => {
    let buttons = options.map(option => {
        let variant = option.value === value ? 'secondary' : 'outline-secondary';
        return (
            <Button variant={variant} key={option.value} onClick={() => onChange(option.value)}>
                {option.label}
            </Button>
        );
    });

    let control = <ButtonGroup>{buttons}</ButtonGroup>;

    if (label) {
        return (
            <div className='segmented-control' style={{display: 'flex', width}}>
                <div className='label'>{label}</div>
                {control}
            </div>
        );
    } else {
        return control;
    }
};

SegmentedControl.defaultProps = {
    disabled: false,
    label: null,
    width: null
};

export default SegmentedControl;
