import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';

// options is an array of [{label:'A', value:'a'}];
const SegmentedControl = ({onChange, value, options, disabled, label, width}) => {
    let buttons = options.map(option => {
        let type = option.value === value ? 'primary' : 'secondary';
        return (
            <Button disabled={disabled} key={option.value} onClick={() => onChange(option.value)} type={type}>
                {option.label}
            </Button>
        );
    });

    let control = <Button.Group>{buttons}</Button.Group>;

    if (label) {
        return (
            <div style={{display: 'flex', width}}>
                <div>{label}</div>
                {control}
            </div>
        );
    } else {
        return control;
    }
};

SegmentedControl.propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({option: PropTypes.any, value: PropTypes.any})).isRequired,
    value: PropTypes.any.isRequired,
    width: PropTypes.string
};

SegmentedControl.defaultProps = {
    disabled: false,
    label: null,
    width: null
};

export default SegmentedControl;
