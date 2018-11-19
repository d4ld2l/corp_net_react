import React, { Component } from 'react'
import { Field } from 'redux-form'
import Checkbox from '../Checkbox/Checkbox'

type Props = {
  options: Array<{
    label: string,
    value: string,
  }>,
}

class CheckboxField extends Component<Props> {
  field = ({ input, meta, label, className }) => {
    const { onChange } = input
    const { touched, error } = meta

    return (
      <div className={`form-group ${className ? className : ''}`}>
        <Checkbox checked={input.value} onClick={event => onChange(event)}>
          {label}
        </Checkbox>
        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />
  }
}
export default CheckboxField
