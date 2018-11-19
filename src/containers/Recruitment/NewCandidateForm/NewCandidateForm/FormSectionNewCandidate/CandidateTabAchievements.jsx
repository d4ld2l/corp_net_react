import React, {Component} from 'react'
import {Field, FieldArray} from 'redux-form'
import {Collapse,} from 'react-bootstrap'
import {Arrow, Trash, Calendar} from 'components-folder/Icon'
import SelectInput from 'components-folder/Form/SelectInput'
import DateTimeCalendarIconFIeld from 'components-folder/Form/DateTimeCalendarIconFIeld'
import BootstrapInput from "components-folder/Form/BootstrapInput";
import { requiredEducationLevel } from "lib-folder/validation";

const cn = require('bem-cn')('candidate-tab-achievements')

if (process.env.BROWSER) {
  require('./main.css')
}

const renderFieldsEducation = ({fields, meta: {touched, error, submitFailed}}) => (
  <div>
    {fields.map((exp, index) => (
      <div className={cn('wrapper-data')} key={exp}>
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
            component={DateTimeCalendarIconFIeld}
            dateFormat="YYYY"
            timeFormat={false}
          />
        </div>

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')}/>
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

const renderFieldsCertificates = ({fields, meta: {touched, error, submitFailed}}) => (
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
            component={DateTimeCalendarIconFIeld}
            dateFormat="YYYY"
            timeFormat={false}
          />
        </div>

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')}/>
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

const renderFieldsCourses = ({fields, meta: {touched, error, submitFailed}}) => (
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
            component={DateTimeCalendarIconFIeld}
            dateFormat="YYYY"
            timeFormat={false}
          />
        </div>

        {index !== fields.length - 1 && (
          <span
            className={cn('wrapper-remove').mix('cur btn btn-outline btn-small')}
            onClick={() => fields.remove(index)}
            title="Удалить"
          >
            <Trash className={cn('icon-trash')}/>
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

export default class CandidateTabAchievements extends Component {
  state = {
    open: true,
  }

  render() {
    const {open} = this.state
    const {education} = this.props
    return (
      <div className={cn} id="achievements">
        <div className={cn('head').mix('clearfix')} onClick={() => this.setState({open: !open})}>
          <h2 className="indent-reset">Образование</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')}/>
          ) : (
            <Arrow className={cn('arrow-icon_close')}/>
          )}
        </div>

        <Collapse in={open}>
          <div>
            <div className={cn('collapse')}>
              <section className={cn('section')}>
                <div className={cn('wrapper-data')}>
                  <Field
                    name={`education_level_id`}
                    label="Уровень образования"
                    component={SelectInput}
                    options={education.map(it => ({label: it.name, value: it.id}))}
                    validate={[ requiredEducationLevel ]}
                  />
                </div>
                <div className={cn('append-block')}>
                  <FieldArray
                    name="resume_educations_attributes"
                    component={renderFieldsEducation}

                  />
                </div>
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
