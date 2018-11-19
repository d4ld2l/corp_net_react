import React, { Component } from 'react'
import { change, Field } from 'redux-form'
import BootstrapInput from "components-folder/Form/BootstrapInput"
import SelectInput from "components-folder/Form/SelectInput"
import {
  Plus,
  Close
} from 'components-folder/Icon/'
import { phoneFormat } from '../../../../lib/validation'

const cn = require('bem-cn')('customers')

class FieldOther extends Component {
  render() {
    const { dispatch, fields, meta: { touched, error, submitFailed }, options } = this.props
    const total = fields.getAll().filter(f => !f.destroy).length

    return (
      <div className={cn('wrapper-input')}>
        {fields.map((field, index) => {
          const value = fields.get(index)

          if (!value.destroy) {
            return (
              <div className={cn('wrapper-b-other')} key={index}>
                <div className={cn('field-wrapper')}>
                  <Field
                    component={SelectInput}
                    name={`${field}.name`}
                    label="Мессенджер"
                    options={options}
                  />
                </div>

                <div className={cn('field-wrapper')}>
                  <Field
                    component={BootstrapInput}
                    name={`${field}.phone`}
                    type="text"
                    label="Номер телефона"
                    validate={phoneFormat}
                  />
                </div>

                <span
                  className={cn('wrapper-remove').mix('cur')}
                  onClick={async () => {
                    if (total === 1) {
                      await dispatch(change('contact', `${field}.name`, ''))
                      await dispatch(change('contact', `${field}.phone`, ''))
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

export default FieldOther
