import React, { Component } from 'react'
import compose from 'ramda/src/compose'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import isEqual from 'lodash/isEqual'
import { Collapse, FormGroup, ControlLabel } from 'react-bootstrap'
import Input from 'components-folder/Input/'

import { Arrow, Trash, Calendar } from '../../Icon'
import SelectInput from '../../Form/SelectInput'
import DateTimeField from '../../Form/DateTimeFIeld'
import moment from 'moment/moment'
import BootstrapInput from "../../Form/BootstrapInput";

const cn = require('bem-cn')('candidate-tab-achievements')

if (process.env.BROWSER) {
  require('./main.css')
}

const renderFieldsEducation = ({ fields, meta: { touched, error, submitFailed }, options }) => (
  <div>
    {fields.map((exp, index) => (
      <div className={cn('wrapper-data')} key={exp}>
        <Field
          name={`${exp}.education_level_id`}
          label="Уровень образования"
          component={SelectInput}
          options={options}
        />
        <Field
          type="text"
          name={`${exp}.school_name`}
          component={BootstrapInput}
          showLabel
          label={'Название учебного заведения'}
          toIndent
        />
        <Field
          type="text"
          name={`${exp}.faculty_name`}
          component={BootstrapInput}
          showLabel
          label={'Факультет'}
          toIndent
        />
        <Field
          type="text"
          name={`${exp}.speciality`}
          component={BootstrapInput}
          showLabel
          label={'Специальность'}
          toIndent
        />

        <div className={cn('calendar')}>
          <Field
            label="Год окончания"
            name={`${exp}.end_year`}
            component={DateTimeField}
            dateFormat="YYYY"
            timeFormat={false}
          />
          <Calendar className={cn('calendar-icon')} />
        </div>

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')} />
            Удалить образование {index + 1}
          </span>
        )}
      </div>
    ))}
    <div className="btn btn-outline" onClick={() => fields.push({})}>
      Добавить образование
    </div>
    {(touched || submitFailed) && error && <span>{error}</span>}
  </div>
)

const renderFieldsCertificates = ({ fields, meta: { touched, error, submitFailed } }) => (
  <div>
    {fields.map((exp, index) => (
      <div className={cn('wrapper-data')} key={exp}>

        <Field
          type="text"
          name={`${exp}.company_name`}
          component={BootstrapInput}
          showLabel
          label={'Организация, выдавшая сертификат'}
          toIndent
        />
        <Field
          type="text"
          name={`${exp}.name`}
          component={BootstrapInput}
          showLabel
          label={'Название сертификата'}
          toIndent
        />

        <div className={cn('calendar')}>
          <Field
            label="Год выдачи"
            name={`${exp}.end_date`}
            component={DateTimeField}
            dateFormat="YYYY"
            timeFormat={false}
          />
          <Calendar className={cn('calendar-icon')} />
        </div>

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')} />
            Удалить сертификат {index + 1}
          </span>
        )}
      </div>
    ))}
    <div className="btn btn-outline" onClick={() => fields.push({})}>
      Добавить сертификат
    </div>
    {(touched || submitFailed) && error && <span>{error}</span>}
  </div>
)

const renderFieldsCourses = ({ fields, meta: { touched, error, submitFailed } }) => (
  <div>
    {fields.map((exp, index) => (
      <div className={cn('wrapper-data')} key={exp}>
        <Field
          type="text"
          name={`${exp}.company_name`}
          component={BootstrapInput}
          showLabel
          label={'Организация, проводившая курсы'}
          toIndent
        />
        <Field
          type="text"
          name={`${exp}.name`}
          component={BootstrapInput}
          showLabel
          label={'Название'}
          toIndent
        />

        <div className={cn('calendar')}>
          <Field
            label="Год окончания"
            name={`${exp}.end_year`}
            component={DateTimeField}
            dateFormat="YYYY"
            timeFormat={false}
          />
          <Calendar className={cn('calendar-icon')} />
        </div>

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')} />
            Удалить курс {index + 1}
          </span>
        )}
      </div>
    ))}
    <div className="btn btn-outline" onClick={() => fields.push({})}>
      Добавить курс
    </div>
    {(touched || submitFailed) && error && <span>{error}</span>}
  </div>
)

type Props = {
  education: Array<{
    name: string,
    id: number,
  }>,
}

type State = {
  open: boolean,
}

const connector = compose(
  reduxForm({
    form: 'CandidateTabAchievements',
    initialValues: {
      resume_educations_attributes: [''],
      resume_courses_attributes: [''],
      resume_certificates_attributes: [''],
    },
  }),
  connect(state => ({
    form: state.form.CandidateTabAchievements,
    education: state.candidates.educationLevel,
    initialValues: state.candidates.parsedResume.achievements,
    candidate: state.candidates.current,
  }))
)

class CandidateTabAchievements extends Component<Props, State> {
  state = {
    open: true,
  }

  componentDidMount() {
    const { initialize, candidateId, candidate, initialValues } = this.props
    if (candidateId) {
      const { resume } = candidate
      initialize({
        resume_educations_attributes:
          resume.resume_educations && resume.resume_educations.length > 0
            ? resume.resume_educations.map(item => {
                return {
                  ...item,
                  end_year: item.end_year && `${item.end_year}`,
                }
              })
            : [''],
        resume_certificates_attributes:
          resume.resume_certificates && resume.resume_certificates.length > 0
            ? resume.resume_certificates.map(item => {
                return {
                  company_name: item.company_name ? item.company_name : null,
                  name: item.name ? item.name : null,
                  end_date: item.end_date && `${moment(item.end_year).format('YYYY')}`,
                }
              })
            : [''],
        resume_courses_attributes:
          resume.resume_courses && resume.resume_courses.length > 0
            ? resume.resume_courses.map(item => {
                return {
                  company_name: item.company_name ? item.company_name : null,
                  name: item.name ? item.name : null,
                  end_year: item.end_year && `${moment(item.end_year).format('YYYY')}`,
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

  educationOptionsForSelect = education =>
    education.map(source => ({ label: source.name, value: source.id }))

  render() {
    const { open } = this.state
    const { education } = this.props
    return (
      <div className={cn} id="achievements">
        <div className={cn('head').mix('clearfix')} onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Образование</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')} />
          ) : (
            <Arrow className={cn('arrow-icon_close')} />
          )}
        </div>

        <Collapse in={open}>
          <div>
            <div className={cn('collapse')}>
              <section className={cn('section')}>
                <FieldArray
                  name="resume_educations_attributes"
                  component={renderFieldsEducation}
                  options={this.educationOptionsForSelect(education)}
                />
                <div className={cn('append-block')}>
                  <h4 className={('indent_5')}>Сертификаты</h4>
                  <FieldArray
                    name="resume_certificates_attributes"
                    component={renderFieldsCertificates}
                  />
                </div>
                <div className={cn('append-block')}>
                  <h4 className={('indent_5')}>Курсы</h4>
                  <FieldArray
                    name="resume_courses_attributes"
                    component={renderFieldsCourses}
                  />
                </div>
              </section>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default connector(CandidateTabAchievements)
