import React, { Component } from 'react'
import { Field } from 'redux-form'
import Checkbox from '../Checkbox/Checkbox'

type Props = {
  options: Array<{
    label: string,
    value: string,
  }>,
}

class CreateVacancyCheckboxGroup extends Component<Props> {
  field = ({ input, meta, options, label }) => {
    const { name, onChange } = input
    const { touched, error } = meta
    const inputValue = input.value

    // --- split options to 2 list ---
    const leftSideLength = Math.round(options.length / 2)
    const leftOptions = options.slice(0, leftSideLength)
    const rightOptions = options.slice(leftSideLength, options.length)

    const renderCheckboxes = target =>
      target.map(({ label, value }, index) => {
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
        <label>{label}</label>

        {options.length > 1 ? (
          <div className="row">
            <div className="col-xs-6">{renderCheckboxes(leftOptions)}</div>
            <div className="col-xs-6">{renderCheckboxes(rightOptions)}</div>
          </div>
        ) : (
          <div>{renderCheckboxes(checkboxes)}</div>
        )}

        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />
  }
}
export default CreateVacancyCheckboxGroup
