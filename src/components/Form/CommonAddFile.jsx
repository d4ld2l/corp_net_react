import React, { Component } from 'react'
import { Clip, Close } from '../Icon'
import getBase64 from '../../helpers/getFileBase64'
if (process.env.BROWSER) {
  require('./CommonAddImgFile.css')
}

const cn = require('bem-cn')('common-add-img-file')

const none = { display: 'none' }

class CommonAddFile extends Component {
  async addFile(fields) {
    const base64 = await getBase64(this.refs.inputFile.files[0])
    fields.push({
      file: base64.target.result,
      name: this.refs.inputFile.files[0].name,
      target: 'doc',
    })
    this.refs.inputFile.value = null
  }
  customField = (member, index, fields) => (
    <li key={index} className={cn('file-container')}>
      <div className={cn('wrap-file')} title={fields.get(index).name}>
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
          <Close className={cn('icon-remove').mix('icon')} />
        </span>
      </div>
    </li>
  )
  render() {
    const { fields, meta: { touched, error } } = this.props

    return (
      <div className={cn('wrapper')}>
        <section className={cn('group-element')}>
          <label htmlFor="inputFile" className={cn('single')}>
            <Clip className={cn('icon-add-file')} title={'Прикрепить документ'} />
            <p className={('link link_theme_light_third')}>Прикрепить документ</p>
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
      </div>
    )
  }
}

export default CommonAddFile
