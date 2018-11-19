import React from 'react'
import Dropzone from 'react-dropzone'
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
          // const canvas = document.getElementById('canvas')
          // const ctx = canvas.getContext('2d')
          // const img = new Image()
          // // img.width = 170
          // img.onload = function() {
          //   ctx.drawImage(img, 0, 0, 170, 370, 0, 0, 170, 170)
          //   input.onChange(canvas.toDataURL("image/jpeg"))
          // }
          // img.src = base64.target.result
          input.onChange(base64.target.result)
          dropzoneOnDrop && dropzoneOnDrop(acceptedFiles, rejectedFiles, e)
        }}
        {...props}
      >
        <div className={cn('dropzone-candidate')}>
          {icon && (
            <div>
              <Avatar size={170} className={cn('dropzone-icon', { indent: 'right' })} />
            </div>
          )}
          <button className="btn btn-primary btn-small">{props.label}</button>
        </div>
      </Dropzone>

      {removable &&
        input.value.length > 0 && (
        <div onClick={() => cleanField && cleanField()} title="Удалить фото" className={cn('btn-delete-photo')}>
          <Trash className={cn('icon-trash').mix('cur')} />
          <span className={cn('btn-delete-text')}>Удалить фото</span>
        </div>
      )}

      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      {/*<canvas id="canvas" style={{display: 'none'}}/>*/}
    </div>
  )
}

export default ReduxFormDropzone
