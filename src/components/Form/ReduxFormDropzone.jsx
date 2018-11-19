import React from 'react'
import Dropzone from 'react-dropzone'
import { Avatar, Close } from '../Icon'

if (process.env.BROWSER) {
  require('./ReduxFormDropzone.css')
}

const cn = require('bem-cn')('redux-form-dropzone')

function bytesToSize(bytes) {
  const sizes = ['Байт', 'Кб', 'Мб', 'Гб', 'Тб']
  if (bytes == 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`
}

function getExt(data) {
  return data.split('.').pop()
}

const ReduxFormDropzone = ({
  input,
  meta: { touched, error, warning },
  dropzoneOnDrop,
  icon = true,
  cleanField,
  removable = false,
  multiple = false,
  ...props
}) => {
  return (
    <div className="form-group">
      {input.value.length > 0 &&
        input.value.map((e, i) => (
          <div className={cn('dropzone-wrapper')} key={Math.random()}>
            <div>
              <div className={cn('dropzone-select')} key={i}>
                <span className={cn('dropzone-filename')}>{e.name}</span>
                <span className={cn('dropzone-file-info')}>
                  <span className={cn('dropzone-file-ext')}>{`.${getExt(e.name)},`}</span>
                  <span className={cn('dropzone-file-size')}>{bytesToSize(e.size)}</span>
                </span>
              </div>
            </div>
            {removable &&
              input.value.length > 0 && (
                <div
                  className={cn('trash-wrapp').mix('cur')}
                  onClick={() => cleanField && cleanField(i)}
                >
                  <Close className={cn('trash')} />
                </div>
              )}
          </div>
        ))}

      {(multiple || (!multiple && input.value.length === 0)) && (
        <Dropzone
          onDrop={(acceptedFiles, rejectedFiles, e) => {
            input.onChange(acceptedFiles)
            dropzoneOnDrop && dropzoneOnDrop(acceptedFiles, rejectedFiles, e)
          }}
          {...props}
          multiple={multiple}
        >
          {icon && (
            <div>
              <Avatar size={170} className={cn('dropzone-icon')} />
            </div>
          )}
          <span className={cn('dropzone-text')}>{props.label}</span>
        </Dropzone>
      )}

      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )
}

export default ReduxFormDropzone
