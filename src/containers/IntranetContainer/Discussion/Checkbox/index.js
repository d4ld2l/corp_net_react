import React, { Component } from 'react'

export default class Checkbox extends Component {
  render() {
    const {
      input: { checked, onChange },
      label,
      className,
    } = this.props
    return (
      <div className={className}>
        <label className="custom-checkbox">
          <input type="checkbox" {...{ checked, onChange }} />
          <span className="custom-checkmark" />
        </label>
        {label && <div>{label}</div>}
      </div>
    )
  }
}
