import React, { Component } from 'react'
import { Field } from 'redux-form'
import Checkbox from '../Checkbox/Checkbox'

type Props = {
  options: Array<{
    label: string,
    value: string,
  }>,
}

class CheckboxGroup extends Component<Props> {
  field = ({ input, meta, options, label }) => {
    const { name, onChange } = input
    const { touched, error } = meta
    const inputValue = input.value

    const checkboxes = options.map(({ label, value }, index) => {
      const handleChange = event => {
        const arr = [...inputValue]
        if (event) {
          arr.push(value)
        } else {
          arr.splice(arr.indexOf(value), 1)
        }
        return onChange(arr)
      }
      const checked = inputValue.includes(value)
      return (
        <Checkbox key={`checkbox-${index}`} checked={checked} onClick={handleChange}>
          {label}
        </Checkbox>
      )
    })

    return (
      <div className="form-group">
        {label && <label>{label}</label>}
        <div className="checkbox-container">{checkboxes}</div>
        {touched && error && <span className="form-group__error">{error}</span>}
      </div>
    )
  }

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />
  }
}
export default CheckboxGroup
