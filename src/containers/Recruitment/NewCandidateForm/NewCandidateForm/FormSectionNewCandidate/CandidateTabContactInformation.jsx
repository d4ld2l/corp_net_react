import React, {Component} from 'react'
import {Collapse} from 'react-bootstrap'
import isEmpty from 'lodash/isEmpty'
import {Arrow, Plus, Trash} from 'components-folder/Icon'
import {Field, FieldArray, reduxForm} from 'redux-form'
import RadioButton from 'components-folder/Form/RadioButton'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import SelectInputGroupSite from 'components-folder/Form/SelectInputGroupSite'
import {required, emailFormat, phoneFormat2} from "../../../../../lib/validation";

const cn = require('bem-cn')('candidate-tab-contact-information')

if (process.env.BROWSER) {
  require('./main.css')
}

const phoneArray = ({fields, meta: {touched, error}}) => (
  <div>{!isEmpty(fields) && fields.map((exp, index) => (
    <div key={index} className={cn('wrapper-array').mix('required')}>
      <Field
        name={`${exp}.phone`}
        component={BootstrapInput}
        label="Телефон"
        type="text"
        validate={[required, phoneFormat2]}
      />
      {index !== fields.length - 1 ? (
        <span
          tabIndex={'0'}
          className={cn('add-button').mix('cur')}
          onClick={() => fields.remove(index)}
          title="Удалить"
        >
          <Trash className={cn('trash-icon').mix('icon')}/>
        </span>
      ) : (
        <span className={cn('add-button')}
                onClick={() => fields.push({})}>
          <Plus outline={30} className={cn('plus-icon')}/>
        </span>)}
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

const emailArray = ({fields, meta: {touched, error}}) => (
  <div>{!isEmpty(fields) && fields.map((exp, index) => (
    <div key={index} className={cn('wrapper-array').mix('required')}>
      <Field
        name={`${exp}.email`}
        component={BootstrapInput}
        label="Почта"
        type="text"
        validate={[required, emailFormat]}
      />
      {index !== fields.length - 1 ? (
        <span
          tabIndex={'0'}
          className={cn('add-button').mix('cur')}
          onClick={() => fields.remove(index)}
          title="Удалить"
        >
          <Trash className={cn('trash-icon').mix('icon')}/>
        </span>
      ) : (
        <span className={cn('add-button')}
                onClick={() => fields.push({})}>
          <Plus outline={30} className={cn('plus-icon')}/>
        </span>)}
      <Field
        name='preferred_contact_type'
        component={RadioButton}
        type="radio"
        className="form-control"
        value={`${index}-email`}
        label="Желаемый способ связи"
        id={`email-${index}`}
      />
    </div>))}
    {touched && error && <p className="error">{error}</p>}
  </div>
)

export default class CandidateTabContactInformation extends Component {
  state = {
    open: true,
  }

  render() {
    const {open} = this.state


    return (
      <div className={cn} id="contact_information">
        <div className={cn('head').mix('clearfix')}
             onClick={() => this.setState({open: !open})}>
          <h2 className="indent-reset">Контактная информация</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')}/>
          ) : (
            <Arrow className={cn('arrow-icon_close')}/>
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('collapse')}>
              <section>
                <FieldArray
                  name={'phones'}
                  component={phoneArray}
                />
                <FieldArray
                  name={'emails'}
                  component={emailArray}
                />
                <div className={cn('wrapper-skype')}>
                  <Field component={BootstrapInput} name="skype" type="text"
                         showLabel label="Skype" toIndent/>
                </div>

                <FieldArray
                  name="additional_contacts_attributes"
                  component={SelectInputGroupSite}
                  label="Добавить сайт"
                />
              </section>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

