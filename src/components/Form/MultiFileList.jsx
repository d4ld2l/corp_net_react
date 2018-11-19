import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Clip, Trash } from '../Icon'
import getBase64 from '../../helpers/getFileBase64'

const cn = require('bem-cn')('multi-file-list')

if (process.env.BROWSER) {
  require('./MultiFileList.css')
}

const none = { display: 'none' }

class MultiFile extends Component {
  async addFile(fields, form) {
    if (this.refs[`${form}-${fields.name}-inputFile`].files.length) {
      const keys = Object.keys(this.refs[`${form}-${fields.name}-inputFile`].files)
      keys.forEach(async idx => {
        const name = this.refs[`${form}-${fields.name}-inputFile`].files[idx].name
        const base64 = await getBase64(this.refs[`${form}-${fields.name}-inputFile`].files[idx])
        fields.push({
          file: base64.target.result,
          name,
        })
      })
    }
    this.refs[`${form}-${fields.name}-inputFile`].value = null
  }
  renderDestroyField = ({ input, label, id, type, style, meta: { touched, error }, ...props }) => (
    <span className="cur">
      <input style={style} id={id} {...input} type={type} className="hidden" />
      <label htmlFor={id}>
        <Trash className={cn('delete-icon')} />
      </label>
    </span>
  )

  customField = (member, index, fields) => {
    if (fields.get(index).id) {
      return (
        <div key={index} className={cn(`file-container ${fields.get(index)._destroy && 'hidden'}`)}>
          <span className={cn('fake-link')}>{fields.get(index).name}</span>
          <Field
            name={`${member}._destroy`}
            id={`${member}._destroy`}
            component={this.renderDestroyField}
            type="checkbox"
          />
        </div>
      )
    }
    return (
      <li key={index} className={cn('file-container')}>
        <div className={cn('item')}>
          <div className={cn('item-file')}>
            <span className={cn('fake-link').mix(cn('fake-link_item'))} title={fields.get(index).name}>{fields.get(index).name.replace(/\.[^/.]+$/, "")}</span>
            <span className={cn('item-expansion')}>.{fields.get(index).name.split('.').pop()}</span>
          </div>
          <span onClick={() => fields.remove(index)} className={'cur'}>
          <Trash className={cn('delete-icon')} />
        </span>
        </div>
      </li>
    )
  }

  render() {
    const { multiple, label, fields, meta: { form, touched, error } } = this.props
    return (
      <div>
        <label htmlFor={`${form}-${fields.name}-inputFile`} className={cn('fake-link').mix('cur')}>
          <Clip className={cn('clip-icon')} />
          {label}
        </label>
        {touched && error && <p className="error">{error}</p>}
        <input
          type={'file'}
          ref={`${form}-${fields.name}-inputFile`}
          id={`${form}-${fields.name}-inputFile`}
          onChange={() => this.addFile(fields, form)}
          style={none}
          multiple={multiple}
        />

        <ul className={cn('list-file')}>
          {fields.map(this.customField)}
        </ul>
      </div>
    )
  }
}

export default MultiFile
