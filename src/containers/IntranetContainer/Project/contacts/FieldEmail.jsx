import React, { Component } from 'react'
import { change, Field } from 'redux-form'
import BootstrapInput from "components-folder/Form/BootstrapInput"
import RadioButton from "components-folder/Form/RadioButton"
import { emailFormat } from '../../../../lib/validation'

import {
  Plus,
  Close
} from 'components-folder/Icon/'

const cn = require('bem-cn')('customers')


class FieldEmail extends Component {
  state = {
    currentEmail: null
  }

  render() {
    const { dispatch, fields, meta: { touched, error, submitFailed } } = this.props
    const total = fields.getAll().filter(f => !f.destroy).length

    return (
      <div className={cn('wrapper-input')}>
        {fields.map((field, index) => {
          const value = fields.get(index)

          if (!value.destroy) {
            return (
              <div className={cn('wrapper-b-phone')} key={index}>
                <div className={cn('field-wrapper')}>
                  <Field
                    component={BootstrapInput}
                    validate={[emailFormat]}
                    name={`${field}.email`}
                    type="text"
                    label="Email"
                    onChange={(e, value) => { this.setState({ currentEmail: value }) }}
                  />
                </div>

                <span
                  className={cn('wrapper-remove').mix('cur')}
                  onClick={async () => {
                    if (total === 1) {
                      await dispatch(change('contact', `${field}.email`, ''))
                      this.forceUpdate()
                    } else if (fields.get(index).id) {
                      await dispatch(change('contact', `${field}.destroy`, true))
                      this.forceUpdate()
                    } else {
                      fields.remove(index)
                    }
                  }}
                  title="Удалить"
                >
                  <Close className={cn('icon-closed')} />
                </span>

                { (value.email || this.state.currentEmail) && (
                  <div className={cn('wrapper-radio-btn')}>
                    <label className={cn('radio-label')}>Приоритет</label>
                    <Field
                      name={`preferable_email`}
                      component={RadioButton}
                      type="radio"
                      className="form-control"
                      id={field}
                      value={field}
                    />
                  </div>
                )}
              </div>
            )
          }
        })}
        <div className={cn('wrapper-icon')} onClick={() => fields.push({})} title="Добавить">
          <Plus outline={30} className={cn('plus-icon')} />
        </div>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </div>
    )
  }
}

export default FieldEmail
