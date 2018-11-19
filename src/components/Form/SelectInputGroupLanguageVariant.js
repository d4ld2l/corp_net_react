import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Trash, Plus } from '../Icon'
import SelectInput from '../Form/SelectInput'

const cn = require('bem-cn')('select-language-group-variant')

if (process.env.BROWSER) {
  require('./SelectInputGroupLanguageVariant.css')
}

type Props = {
  label: string,
  fields: {},
  meta: {},
}

class SelectInputGroupLanguageVariant extends Component<Props> {
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
            <div key={exp} className={cn('select-container')}>
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
                <Field
                  label="Уровень"
                  name={`${exp}.language_level_id`}
                  component={SelectInput}
                  options={languagesLevel.map(language => ({
                    label: language.name,
                    value: language.id,
                  }))}
                />
              </div>

              {index !== fields.length - 1 ? (
                <button
                  className={cn('add-button').mix('cur')}
                  onClick={() => fields.remove(index)}
                  title="Удалить"
                >
                  <Trash className={cn('icon-trash')} />
                </button>
              ) : (
                <button
                  className={cn('add-button')}
                  onClick={() => fields.push({})}
                  title="Добавить"
                >
                  <Plus outline={'filled'} className={cn('plus-icon')} />
                </button>
              )}
            </div>
          ))}
        </div>
        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }
}

export default SelectInputGroupLanguageVariant
