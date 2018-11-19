import React, { Component } from 'react'
import compose from 'ramda/src/compose'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import isEqual from 'lodash/isEqual'
import { Collapse, FormGroup } from 'react-bootstrap'

import CheckboxField from '../../Form/CheckboxField'
import { Arrow, Trash, Calendar } from '../../Icon'
import DateTimeField from '../../Form/DateTimeFIeld'
import CKeditor from '../../Form/CKeditor'

import { editorConfig } from './data'
import BootstrapInput from "../../Form/BootstrapInput";

const cn = require('bem-cn')('candidate-tab-experience')
if (process.env.BROWSER) {
  require('./main.css')
}

const renderFields = ({ fields, meta: { touched, error, submitFailed } }) => (
  <div>
    {fields.map((exp, index) => (
      <div key={index} className={cn('wrapper-data')}>
        <Field
          type="text"
          name={`${exp}.position`}
          component={BootstrapInput}
          showLabel
          label={'Должность'}
          toIndent
        />
        <Field
          type="text"
          name={`${exp}.company_name`}
          component={BootstrapInput}
          showLabel
          label={'Название компании'}
          toIndent
        />

        <Field
          type="text"
          name={`${exp}.region`}
          component={BootstrapInput}
          showLabel
          label={'Регион'}
          toIndent
        />

        <Field
          type="text"
          name={`${exp}.website`}
          component={BootstrapInput}
          showLabel
          label={'Сайт'}
          toIndent
        />

        <FormGroup>
          <div className={cn('wrapper-calendar')}>
            <div className={cn('calendar')}>
              <Field
                label="Начало (Обязательное поле)"
                name={`${exp}.start_date`}
                component={DateTimeField}
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
              />
              <Calendar className={cn('calendar-icon')} />
            </div>
            <div className={cn('dash')}>—</div>
            <div className={cn('calendar')}>
              <Field
                label="Окончание"
                name={`${exp}.end_date`}
                component={DateTimeField}
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
              />
              <Calendar className={cn('calendar-icon')} />
            </div>
            <CheckboxField
              label="По настоящее время"
              name={`${exp}.nowadays`}
              className={cn('nowadays-checkbox')}
            />
          </div>
        </FormGroup>

        <Field
          label="Обязанности"
          component={CKeditor}
          name={`${exp}.experience_description`}
          className="form-control"
          config={editorConfig}
        />

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')} />
            Удалить место работы {index + 1}
          </span>
        )}
      </div>
    ))}
    <div className="btn btn-outline cur" onClick={() => fields.push({})}>
      Добавить место работы
    </div>
    {(touched || submitFailed) && error && <span>{error}</span>}
  </div>
)

type Props = {}

type State = {
  open: boolean,
}

const validate = values => {
  const errors = {}
  values.resume_work_experiences_attributes.map(work => {
    if (!work.start_date && (!!work.position || !!work.company_name)) {
      errors.start_date = 'Обязательное поле'
    }
  })
  return errors
}

const connector = compose(
  reduxForm({
    form: 'CandidateTabExperience',
    validate,
    initialValues: {
      resume_work_experiences_attributes: [''],
    },
  }),
  connect(state => ({
    form: state.form.CandidateTabExperience,
    initialValues: state.candidates.parsedResume.experience,
    candidate: state.candidates.current,
  }))
)

class CandidateTabExperience extends Component<Props, State> {
  state = {
    open: true,
  }

  componentWillMount() {
    const { initialize, candidateId, candidate } = this.props
    if (candidateId) {
      const { resume } = candidate
      initialize({
        resume_work_experiences_attributes:
          resume.resume_work_experiences.length > 0
            ? resume.resume_work_experiences.map(item => {
                return {
                  ...item,
                  nowadays: !item.end_date,
                }
              })
            : [''],
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.props.initialize(nextProps.initialValues)
    }
  }

  render() {
    const { open } = this.state

    return (
      <div className={cn} id="experience">
        <div className={cn('head').mix('clearfix')} onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Опыт работы</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')} />
          ) : (
            <Arrow className={cn('arrow-icon_close')} />
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('collapse')}>
              <FieldArray name="resume_work_experiences_attributes" component={renderFields} />
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default connector(CandidateTabExperience)
