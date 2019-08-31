import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const HiddenInput = ({
    name,
    value,
    onChange,
    error
}) => {
    return (
        <div className="hidden-input">
            <input
                type="hidden"
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

HiddenInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};


export default HiddenInput;