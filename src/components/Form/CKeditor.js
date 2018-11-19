import React from 'react'
// import CKEditor from '../../lib/ckeditor'
import CKEditor from 'react-ckeditor-component'

const defaultConfig = {
  toolbar: 'Basic',
  toolbar_Basic: [
    {
      name: 'basicstyles',
      items: ['Bold', 'Italic', 'Strike', 'RemoveFormat'],
    },
    {
      name: 'paragraph',
      items: ['NumberedList', 'BulletedList', '-'],
    },
    {
      name: 'links',
      items: ['Link'],
    },
  ],
}

export default ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning },
  config = defaultConfig,
  ...props
}) => (
  <div className="form-group">
    {label &&
    <label className={`form-group__label ${touched && error ? 'form-group__label_error' : ''}`}>
      {label}
    </label>}
    <CKEditor
      content={input.value}
      events={{
        change: e => input.onChange(e.editor.getData()),
        blur: e => input.onBlur(e.editor.getData()),
        focus: e => input.onFocus(e.editor.getData()),
      }}
      config={config}
      {...props}
    />
    {touched &&
      ((error && <span className="form-group__error">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
)
