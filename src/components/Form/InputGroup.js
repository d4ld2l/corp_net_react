// @flow
import React, { Component } from 'react'
import { Field } from 'redux-form'
import RadioButton from '../Form/RadioButton'
import { Trash, Plus } from '../Icon/'

const cn = require('bem-cn')('text-input-group')
if (process.env.BROWSER) {
  require('./TextInputGroup.css')
}

type Props = {
  label: string,
  fields: {},
  meta: {},
}

class InputGroup extends Component<Props> {
  render() {
    const { label, fields, meta: { touched, error, submitFailed } } = this.props
    return (
      <div className={cn.mix('form-group')}>
        <label className={cn('label')}>{label}</label>
        <div className={cn('input-wrap')}>
          {fields.length === 0 ? fields.push({}) : null}
          {fields.map((exp, index) => (
            <div key={index} className={cn('wrapper-elements')}>
              <div className={cn('wrapper-field')}>
                <Field
                  type="text"
                  component="input"
                  name={`${exp}.data`}
                  className="form-control"
                />
              </div>
              {index !== fields.length - 1 && (
                <span
                  className={cn('wrapper-remove').mix('cur')}
                  onClick={() => fields.remove(index)}
                  title="Удалить"
                >
                  <Trash className={cn('icon-trash')} />
                </span>
              )}
              <Field
                name="preferred_contact_type"
                component={RadioButton}
                type="radio"
                className="form-control"
                value={`${exp}.data`}
                label="Желаемый способ связи"
                id={`${exp}`}
              />
            </div>
          ))}
        </div>

        {/* <button
          className={cn('add-button').mix('no-outline')}
          onClick={() => fields.push({})}
          title="Добавить"
        >
          <Plus outline={'filled'} className={cn('plus-icon')} />
        </button> */}

        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }
}
export default InputGroup
