import React, { Component } from 'react'
import { AddDocument, AddImage, Close } from '../Icon'
import getBase64 from '../../helpers/getFileBase64'

const cn = require('bem-cn')('notify-add-img-file')

const none = { display: 'none' }

class NotifyBlindAddImgFile extends Component {
  state = {
    isFilePopup: true,
  }
  async addFile(fields) {
    const base64 = await getBase64(this.refs.inputFile.files[0])
    fields.push({
      file: base64.target.result,
      name: this.refs.inputFile.files[0].name,
      target: 'doc',
    })
    this.refs.inputFile.value = null
  }
  async addImage(fields) {
    const base64 = await getBase64(this.refs.inputImage.files[0])
    fields.push({
      file: base64.target.result,
      name: this.refs.inputImage.files[0].name,
      target: 'image',
    })
    this.refs.inputImage.value = null
  }
  customField = (member, index, fields) => (
    <li key={index} className={cn('file-container')}>
      <div className={cn('wrap-file')} title={fields.get(index).name}>
        {fields.get(index).target === 'image' && (
          <img src={fields.get(index).file} className={cn('preview')} alt={''} />
        )}
        <span className={cn('fake-link')}>{fields.get(index).name.replace(/\.[^/.]+$/, '')}</span>
        <span className={cn('item-expansion')}>
          .{fields
            .get(index)
            .name.split('.')
            .pop()}
        </span>
        <span
          className={cn('wrap-remove')}
          title={`Удалить ${fields.get(index).name}`}
          onClick={() => fields.remove(index)}
          onBlur={() => fields}
        >
          <Close className={cn('icon-remove')} />
        </span>
      </div>
    </li>
  )

  isFilePopup = () => {
    const { isFilePopup } = this.state
    this.setState({ isFilePopup: !isFilePopup })
  }
  render() {
    const { isFilePopup } = this.state
    const { fields, meta: { touched, error } } = this.props

    return (
      <div>
        <section className={cn('group-element')}>
          <label htmlFor="inputFile" title={'Прикрепить документ'}>
            <AddDocument className={cn('icon-add-document')} />
          </label>
          <label htmlFor="inputImage" title={'Прикрепить изображение'}>
            <AddImage className={cn('icon-add-image')} />
          </label>
        </section>
        {isFilePopup &&
          fields.length > 0 && (
            <div className={cn('file-popup')}>
              <p className={cn('title')}>Прикрепленные файлы</p>
              <ul className={cn('list')}>{fields.map(this.customField)}</ul>
            </div>
          )}
        {touched && error && <p className="error">{error}</p>}
        <input
          type={'file'}
          ref={'inputFile'}
          id={'inputFile'}
          onChange={() => this.addFile(fields)}
          style={none}
        />
        <input
          type={'file'}
          ref={'inputImage'}
          id={'inputImage'}
          onChange={() => this.addImage(fields)}
          style={none}
        />
        {fields.length > 0 && (
          <p
            className={cn('added-file')}
            onClick={this.isFilePopup}
            title={isFilePopup ? 'Нажмите, чтобы закрыть' : 'Нажмите, чтобы открыть'}
          >
            Добавлено {fields.length}{' '}
            {fields.length === 1
              ? 'файл'
              : fields.length > 4 ? 'файлов' : fields.length > 1 ? 'файла' : 'файлов'}
          </p>
        )}
      </div>
    )
  }
}

export default NotifyBlindAddImgFile
