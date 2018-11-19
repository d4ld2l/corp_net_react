import React, { Component } from 'react'
import { Field } from 'redux-form'
import { AddDocument, AddImage, Close } from 'components-folder/Icon'
import getBase64 from 'helpers-folder/getFileBase64'

const cn = require('bem-cn')('multi-file')

const none = { display: 'none' }

class MultiFile extends Component {
  async addFile(fields, form, id, type) {
    if (this.refs[id].files.length) {
      const keys = Object.keys(this.refs[id].files)
      keys.forEach(async idx => {
        const name = this.refs[id].files[idx].name
        const base64 = await getBase64(this.refs[id].files[idx])
        fields.push({
          file: base64.target.result,
          type,
          name,
        })
      })
    }
    this.refs[id].value = null
  }

  renderDestroyField = ({ input, label, id, type, style, meta: { touched, error }, ...props }) => (
    <span style={{ flex: 1, textAlign: 'right' }}>
      <input style={style} id={id} {...input} type={type} className="hidden" />
      <label htmlFor={id}>
        <Close className={cn('file-delete')} />
      </label>
    </span>
  )

  customField = (member, index, fields) => {
    if (fields.get(index).id)
      return (
        <li key={index} className={cn('file').state({ hidden: fields.get(index)._destroy })}>
          <div className={cn('wrap-file')}>
            <p className={cn('file-name')}>
              <a target="_blank" href={fields.get(index).url}>
                {fields.get(index).name.replace(/\.[^/.]+$/, '')}
              </a>
              <span className={cn('file-type')}>
                .
                {fields
                  .get(index)
                  .name.split('.')
                  .pop()}
              </span>
            </p>
            <Field
              name={`${member}._destroy`}
              id={`${member}._destroy`}
              component={this.renderDestroyField}
              type="checkbox"
            />
          </div>
        </li>
      )
    return (
      <li key={index} className={cn('file')}>
        <div className={cn('wrap-file')}>
          <p className={cn('file-name')}>
            <a className={'link link_theme_light_third link_pseudo'} href="javascript://">
              {fields.get(index).name.replace(/\.[^/.]+$/, '')}
            </a>
            <span className={cn('file-type').mix('p2 p2_theme_light_second fw_400')}>
              .
              {fields
                .get(index)
                .name.split('.')
                .pop()}
            </span>
          </p>
          <span style={{ flex: 1, textAlign: 'right' }} onClick={() => fields.remove(index)}>
            <Close className={cn('file-delete')} />
          </span>
        </div>
      </li>
    )
  }

  render() {
    const {
      disabled,
      fields,
      meta: { form, touched, error },
    } = this.props
    return (
      <section className={'notify-add-img-file__group-element'}>
        <label htmlFor={`${form}-${fields.name}-inputFileDocument`}>
          <AddDocument className={'notify-add-img-file__icon-add-document'} />
        </label>
        <label htmlFor={`${form}-${fields.name}-inputFileImage`}>
          <AddImage className={'notify-add-img-file__icon-add-image'} />
        </label>
        {touched && error && <p className="error">{error}</p>}
        <input
          type="file"
          ref={`${form}-${fields.name}-inputFileDocument`}
          id={`${form}-${fields.name}-inputFileDocument`}
          onChange={this.addFile.bind(
            this,
            fields,
            form,
            `${form}-${fields.name}-inputFileDocument`,
            'documents_attributes'
          )}
          style={none}
          disabled={disabled}
          multiple
        />
        <input
          type="file"
          accept="image/*"
          ref={`${form}-${fields.name}-inputFileImage`}
          id={`${form}-${fields.name}-inputFileImage`}
          onChange={this.addFile.bind(
            this,
            fields,
            form,
            `${form}-${fields.name}-inputFileImage`,
            'photos_attributes'
          )}
          style={none}
          disabled={disabled}
          multiple
        />
        <ul className={cn('list')}>{fields.map(this.customField)}</ul>
      </section>
    )
  }
}

export default MultiFile
