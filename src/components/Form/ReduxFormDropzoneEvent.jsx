import React from 'react'
import Dropzone from 'react-dropzone'
import { Row, Col } from 'react-bootstrap'
import { Trash, Clip, Avatar } from '../Icon/'

const cn = require('bem-cn')('new-recruiter-request-edit-full-form')

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
      <Dropzone
        onDrop={(acceptedFiles, rejectedFiles, e) => {
          input.onChange(acceptedFiles)
          dropzoneOnDrop && dropzoneOnDrop(acceptedFiles, rejectedFiles, e)
        }}
        {...props}
      >
        {icon && (
          <div>
            <Avatar className={cn('dropzone-icon')} />
          </div>
        )}
        <Clip className={cn('clip-icon')} />
        <span className={cn('dropzone-text')}>{props.label}</span>
      </Dropzone>

      {input.value.length > 0 &&
        input.value.map((e, i) => (
          <div key={Math.random()}>
            <div>
              <div className={cn('dropzone-select')({ width: 'min' })} key={i}>
                <span className={cn('dropzone-filename')}>{e.name}</span>
                <span className={cn('dropzone-file-info')}>
                  <span className={cn('dropzone-file-ext')}>{`.${getExt(e.name)},`}</span>
                  <span className={cn('dropzone-file-size')}>{bytesToSize(e.size)}</span>
                </span>
              </div>
            </div>
            <div className={'cur'} onClick={() => cleanField()} title="Удалить файл">
              <Trash className={cn('icon-trash').mix('cur')} />
            </div>
          </div>
        ))}

      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )
}

export default ReduxFormDropzone
