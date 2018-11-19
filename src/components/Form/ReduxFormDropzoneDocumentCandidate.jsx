import React from 'react'
import Dropzone from 'react-dropzone'
import {
  Avatar
} from 'components-folder/Icon'
import { Row, Col } from 'react-bootstrap'
import Close from '../Icon/Close'

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
  multiple = true,
  ...props
}) => {
  return (
    <div className="form-group">
      {(multiple || (!multiple && input.value.length === 0)) && (
        <Dropzone
          onDrop={(acceptedFiles, rejectedFiles, e) => {
            input.onChange(acceptedFiles)
            dropzoneOnDrop && dropzoneOnDrop(acceptedFiles, rejectedFiles, e)
          }}
          {...props}
        >
          {icon && (
            <div>
              <Avatar size={170} className={cn('dropzone-icon')} />
            </div>
          )}
          <span className={cn('dropzone-text')}>{props.label}</span>
        </Dropzone>
      )}

      <h3 className="candidate-tab-full-name__title-document">Прикрепленные документы</h3>

      {input.value.length > 0 ? '' : <p className={'candidate-tab-full-name__signature p2 p2_theme_light_second'}>Вы пока не прикрепили документы</p>}

      <div className="candidate-tab-full-name__document">
        {input.value.length > 0 &&
          input.value.map((e, i) => (
            <Row key={Math.random()}>
              <Col xs={10}>
                <div className={cn('dropzone-select')} key={i}>
                  <span className={cn('dropzone-filename')}>{e.name}</span>
                  <span className={cn('dropzone-file-info')}>
                    <span className={cn('dropzone-file-ext')}>{`.${getExt(e.name)},`}</span>
                    <span className={cn('dropzone-file-size')}>{bytesToSize(e.size)}</span>
                  </span>
                </div>
              </Col>
              {removable &&
                input.value.length > 0 && (
                  <Col xs={1} className={'cur'} onClick={() => cleanField && cleanField(i)} title="Удалить документ">
                    <Close className={cn('trash')} />
                  </Col>
                )}
            </Row>
          )
        )}
      </div>

      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )
}

export default ReduxFormDropzone
