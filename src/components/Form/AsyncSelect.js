import React from 'react'
import debounce from 'lodash/debounce'

if (process.env.BROWSER) {
  require('react-select/dist/react-select.css')
  require('./SelectInput.css')
}

export default ({
  label,
  placeholder,
  debounceTime,
  onChange,
  loadOptions = [],
  select,
  ...props
}) => {
  const func = debounce(event => onChange(event), debounceTime)
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        {...props}
        onChange={value => func(value.target.value)}
        type="text"
        placeholder={placeholder}
      />
      <ul>
        {loadOptions.map(option => (
          <li onClick={() => select(option.item.id)}>{option.item.name}</li>
        ))}
      </ul>
    </div>
  )
}
