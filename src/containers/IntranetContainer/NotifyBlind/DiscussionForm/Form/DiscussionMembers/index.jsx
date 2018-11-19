import React, { Component } from 'react'
import { Field } from 'redux-form'

import { Trash } from 'components-folder/Icon'

const cn = require('bem-cn')('discussion-members')
if (process.env.BROWSER) {
  require('./style.css')
}

export default class DiscussionMember extends Component {
  renderDestroyField = ({ input, label, id, type, style, meta: { touched, error }, ...props }) => (
    <div className={cn('delete')}>
      <input style={style} id={id} {...input} type={type} className="hidden" />
      <label htmlFor={id}>
        <Trash className={cn('delete-icon')} />
      </label>
    </div>
  )

  renderEmployee = (member, index, fields) => {
    if (fields.get(index).record_id)
      return (
        <div key={index} className={cn('item').state({ hidden: fields.get(index)._destroy })}>
          <div
            className={cn('avatar')}
            style={{
              background: `url('${fields.get(index).photo_url}') center center / cover no-repeat`,
            }}
          />
          <div className={cn('info')}>
            <div className={cn('name').mix('p1 indent-reset')}>{fields.get(index).full_name}</div>
            <div className={cn('position').mix('p2')}>{fields.get(index).position}</div>
            <div className={cn('unit').mix('p2')}>{fields.get(index).department}</div>
          </div>
          <Field
            name={`${member}._destroy`}
            id={`${member}._destroy`}
            component={this.renderDestroyField}
            type="checkbox"
          />
        </div>
      )
    return (
      <div key={index} className={cn('item')}>
        <div
          className={cn('avatar')}
          style={{
            background: `url('${fields.get(index).photo_url}') center center / cover no-repeat`,
          }}
        />
        <div className={cn('info')}>
          <div className={cn('name').mix('p1 indent-reset')}>{fields.get(index).full_name}</div>
          <div className={cn('position').mix('p2')}>{fields.get(index).position}</div>
          <div className={cn('unit').mix('p2')}>{fields.get(index).department}</div>
        </div>
        <div className={cn('delete')} onClick={() => fields.remove(index)}>
          <Trash className={cn('delete-icon')} />
        </div>
      </div>
    )
  }

  render() {
    const { fields, hidden } = this.props
    return (
      <div style={{ display: hidden ? 'none' : undefined }}>{fields.map(this.renderEmployee)}</div>
    )
  }
}
