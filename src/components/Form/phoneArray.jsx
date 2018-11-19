import React from 'react'
import RadioButton from 'components-folder/Form/RadioButton'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import { Field, FieldArray, reduxForm } from 'redux-form'

if (process.env.BROWSER) {
  require('./BootstrapInput.css')
}

const phoneArray = ({ fields, meta: { touched, error } }) => (
  <div>{fields.map((exp, index) => (
    <div key={index} className={cn('wrapper-array').mix('required')}>
      <Field
        name={`${exp}.phone`}
        component={BootstrapInput}
        label="Телефон"
        type="text"
        className={cn('array-input')}
      />
      {index !== fields.length - 1 ? (
        <button
          tabIndex={'0'}
          className={cn('add-button').mix('cur')}
          onClick={() => fields.remove(index)}
          title="Удалить"
        >
          <Trash className={cn('trash-icon').mix('icon')}/>
        </button>
      ) : (
        <button className={cn('add-button')}
                onClick={() => fields.push({})}>
          <Plus outline={30} className={cn('plus-icon')}/>
        </button>)}
      <Field
        name='preferred_contact_type'
        component={RadioButton}
        type="radio"
        className="form-control"
        value={`${index}-phone`}
        label="Желаемый способ связи"
        id={`phone-${index}`}
      />
    </div>))}
    {touched && error && <p className="error">{error}</p>}
  </div>
)

export default BootstrapInput
