import React from 'react'
import Dropzone from 'react-dropzone'
import { Row, Col } from 'react-bootstrap'
import { Trash, Avatar } from '../Icon/'
import getBase64 from '../../helpers/getFileBase64'

const cn = require('bem-cn')('new-recruiter-request-edit-full-form')

if (process.env.BROWSER) {
  require('../Recruitment/VacancyNew/edit-full-form.css')
}

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
        onDrop={async (acceptedFiles, rejectedFiles, e) => {
          const base64 = await getBase64(acceptedFiles[0])
          input.onChange(base64.target.result)
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

      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )
}

export default ReduxFormDropzone
