import React, { Component } from 'react'
import { AddDocument, AddImage, ClosedThin } from '../Icon'
import getBase64 from '../../helpers/getFileBase64'
if (process.env.BROWSER) {
  require('./CommonAddImgFile.css')
}

const cn = require('bem-cn')('common-add-img-file')

const none = { display: 'none' }

class CommonAddImgFile extends Component {
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
          <ClosedThin className={cn('icon-remove')} />
        </span>
      </div>
    </li>
  )
  render() {
    const { fields, meta: { touched, error } } = this.props

    return (
      <div className={cn('wrapper')}>
        <section className={cn('group-element')}>
          <label htmlFor="inputFile">
            <AddDocument className={cn('icon-add-document')} title={'Прикрепить документ'} />
          </label>
          <label htmlFor="inputImage">
            <AddImage className={cn('icon-add-image')} title={'Прикрепить изображение'} />
          </label>
        </section>
        <ul className={cn('list')}>{fields.map(this.customField)}</ul>
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
      </div>
    )
  }
}

export default CommonAddImgFile
