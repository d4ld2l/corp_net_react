import React, { Component } from 'react'
import { connect } from 'react-redux'
import {change, Field} from 'redux-form'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import { Plus, Close } from '../Icon'
import {urlFormat} from 'lib-folder/validation'

const cn = require('bem-cn')('text-input-group')
if (process.env.BROWSER) {
  require('./TextInputGroup.css')
}

class SelectInputGroupSite extends Component<Props> {
  render() {
    const { label, fields, dispatch, meta: { touched, error, submitFailed } } = this.props

    return (
      <div className={cn.mix('form-group')}>
        <label className={cn('label')}>{label}</label>
        <div className={cn('input-wrap')}>
          {fields.length === 0 ? fields.push({}) : null}
          {fields.map((field, index) => (
            <div key={index} className={cn('wrapper-elements')}>
              <div className={cn('wrapper-field')}>
                <Field
                  type="text"
                  component={BootstrapInput}
                  name={`${field}.link`}
                  validate={[urlFormat]}
                  className="form-control"
                />
              </div>
              <span
                className={cn('wrapper-remove').mix('cur')}
                onClick={async () => {
                  if (fields.getAll().filter(f => !f.destroy).length === 1) {
                    await dispatch(change('CandidateTabContactInformation', `${field}.link`, ''))
                    this.forceUpdate()
                  } else if (fields.get(index).id) {
                    await dispatch(change('CandidateTabContactInformation', `${field}.destroy`, true))
                    fields.remove(index)
                    this.forceUpdate()
                  } else {
                    fields.remove(index)
                  }
                }}
                title="Удалить"
              >
                {fields.getAll().length !== 1 && <Close className={cn('icon-closed')} />}
              </span>
            </div>
          ))}
        </div>

        <span className={cn('add-button').mix('no-outline mb-15')} onClick={() => fields.push({})}>
          <Plus outline={30} className={cn('plus-icon')} />
        </span>

        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }
}
export default connect()(SelectInputGroupSite)
