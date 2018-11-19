import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Trash, Plus } from '../Icon'
import SelectInput from '../Form/SelectInput'
import isEmpty from 'lodash/isEmpty'
import {requiredLanguageLevel} from '../../lib/validation'

const cn = require('bem-cn')('text-input-group')

if (process.env.BROWSER) {
  require('./TextInputGroup.css')
}

class SelectInputGroupLanguage extends Component {
  render() {
    const {
      label,
      fields,
      meta: { touched, error, submitFailed },
      languages,
      languagesLevel,
    } = this.props
    return (
      <div className={cn.mix('form-group')}>
        <div className={cn('input-wrap')}>
          {fields.map((exp, index) => (
            <div key={exp} className={cn('select-container').mix('languages')}>
              <div className={cn('select-container-item')}>
                <Field
                  label="язык"
                  name={`${exp}.language_id`}
                  component={SelectInput}
                  options={languages.map(language => ({
                    label: language.name,
                    value: language.id,
                  }))}
                />
              </div>
              <div className={cn('select-container-item')}>
                <Field
                  label="Уровень"
                  name={`${exp}.language_level_id`}
                  component={SelectInput}
                  validate={[requiredLanguageLevel]}
                  options={languagesLevel.map(language => ({
                    label: language.name,
                    value: language.id,
                  }))}
                />
              </div>

              {((index !== fields.length - 1) ||
              isEmpty(languages) ||
              !(fields.getAll().filter(it => it === '').length < languages.length)) && (
                <span
                  tabIndex={'0'}
                  className={cn('wrapper-remove').mix('cur languages-position-remove')}
                  onClick={() => fields.remove(index)}
                  title="Удалить"
                >
                  <Trash className={cn('icon-trash').mix('icon')} />
                </span>
              )}
            </div>
          ))}
        </div>
        {
          !isEmpty(languages) && fields.getAll().filter(it => it === '').length < languages.length &&
          <span
              className={cn('add-button').mix('languages-position-add no-outline')}
              onClick={() => fields.push('')}
              title="Добавить"
          >
            <Plus outline={30} className={cn('plus-icon')} />
          </span>
        }


        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }
}
export default SelectInputGroupLanguage
