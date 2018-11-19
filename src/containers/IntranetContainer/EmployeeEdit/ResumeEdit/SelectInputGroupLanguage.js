import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Plus, Close } from 'components-folder/Icon'
import SelectInput from 'components-folder/Form/SelectInput'

const cn = require('bem-cn')('text-input-group')

if (process.env.BROWSER) {
  require('components-folder/Form/TextInputGroup.css')
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
        {fields.length === 0 ? fields.push({}) : null}
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
                  options={languagesLevel.map(language => ({
                    label: language.name,
                    value: language.id,
                  }))}
                />
              </div>
              <span
                  className={cn('wrapper-remove').mix('cur languages-position-remove')}
                  onClick={() => fields.remove(index)}
                  title="Удалить"
                >
                <Close className={cn('icon-trash')} />
              </span>
            </div>
          ))}
        </div>

        <button
          className={cn('add-button').mix('languages-position-add no-outline')}
          onClick={e => {
             e.preventDefault()
             fields.push('')
           }}
          title="Добавить"
        >
          <Plus outline={30} className={cn('plus-icon')} />
        </button>

        {touched && error && <p className="error">{error}</p>}
      </div>
    )
  }
}
export default SelectInputGroupLanguage
