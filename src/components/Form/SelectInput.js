import React from 'react'
import Select, { Creatable } from 'react-select'

if (process.env.BROWSER) {
  require('react-select/dist/react-select.css')
  require('./SelectInput.css')
}

export default ({
  input,
  label,
  type,
  creatable = false,
  searchable = false,
  clearable = false,
  promptTextCreator = label => `Добавить "${label}"`,
  meta: { touched, error, warning },
  afterChange,
  ...props
}) => {
  const Component = creatable ? Creatable : Select

  return (
    <div className="form-group">
      {label &&
      <label className={`form-group__label${touched && error ? ' form-group__label_error' : ''}`}>
        {label}
      </label>}
      <Component
        placeholder={'Выбрать'}
        promptTextCreator={promptTextCreator}
        searchable={searchable}
        clearable={clearable}
        removeSelected={false}
        className={touched && error ? 'Select--error' : ''}
        {...props}
        value={input.value}
        onChange={value => {
          input.onChange(value)
          afterChange && afterChange()
        }}
        onBlur={() => input.onBlur(input.value)}
        options={props.options}
      />
      {touched &&
        ((error && <span className="form-group__error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )
}
