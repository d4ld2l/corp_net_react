import React from 'react'
import Checkbox from '../Checkbox/Checkbox'

const BootstrapCheckbox = ({ input, disabled, label, name, meta }) => {
  const { touched, error } = meta

  return (
    <div className="bootstrap-checkbox">
      <Checkbox checked={input.value} onClick={input.onChange} disabled={disabled}>
        {label}
      </Checkbox>

      {touched && error && <p className="error">{error}</p>}
    </div>
  )
}

export default BootstrapCheckbox
