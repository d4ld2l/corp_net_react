import React, { Component } from 'react'
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import { change, Field, FieldArray, reduxForm } from 'redux-form'
import { push } from "react-router-redux"
import { toastr } from "react-redux-toastr"
import compose from 'ramda/src/compose'
import moment from 'moment'
import get from 'lodash/get'

import { Row, Col, Collapse, FormGroup, ControlLabel } from 'react-bootstrap'

import { required, dateTimeFormat } from 'lib-folder/validation'

import { Arrow, Trash, Calendar, Clip } from 'components-folder/Icon/'

import CheckboxField from 'components-folder/Form/CheckboxField'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import CKeditor from 'components-folder/Form/CKeditor'
import BootstrapInput from "components-folder/Form/BootstrapInput"
import scrollToComponent from "components-folder/ScrollToComponent"
import ReduxFormDropzone from "components-folder/Form/ReduxFormDropzone"
import MultiFile from "components-folder/Form/MultiFile"
import SelectInput from 'components-folder/Form/SelectInput'
import SelectInputGroupLanguage from './SelectInputGroupLanguage'

import { updateResumeEmployee } from "redux-folder/actions/employeesActions"

const connector = compose(
  reduxForm({
    form: 'ResumeCollapse',
    initialValues: {
      resume_educations_attributes: [''],
      resume_qualifications_attributes: [''],
      resume_certificates_attributes: [''],
      resume_work_experiences_attributes: [''],
    },
  }),
  connect(state => ({
    languagesLevel: state.candidates.languagesLevel,
    languages: state.candidates.languages,
    education: state.candidates.educationLevel,
    employees: state.employees,
    current: state.employees.current,
    fetching: state.loaders.employee,
    user: state.user,
    reasonToFillTheProfile: get(state, 'system.settings.text.why_need_to_fill_profile'),
  }))
)

const cn = require('bem-cn')('b-collapse')
if (process.env.BROWSER) {
  require('../b-collapse.css')
}
moment.locale('ru')

const renderTrash = (fields, index) => (
  <div
    className={cn('corner-trash-wrapper').mix(index === 0 ? 'first' : '')}
    onClick={() => fields.remove(index)}
    title="Удалить"
  >
    <Trash outline className={cn('corner-trash-icon')} />
  </div>
)

const renderFieldsExperience = ({ fields, meta: { touched, error, submitFailed } }) => (
  <div>
    {fields.length === 0 ? fields.push({}) : null}
    {fields.map((exp, index) => (
      <div key={index} className={cn('wrapper-data')}>
        <div>
          <FormGroup>
            <div className={cn('required')}>
              <Field type="text"
                     validate={[required]}
                     component={BootstrapInput}
                     label="Должность"
                     name={`${exp}.position`}
                     className="form-control"  />
            </div>
          </FormGroup>

          <FormGroup>
            <ControlLabel className={('p3 p3_theme_light')}>Название компании</ControlLabel>
            <Field
              type="text"
              component="input"
              name={`${exp}.company_name`}
              className="form-control"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className={('p3 p3_theme_light')}>Регион</ControlLabel>
            <Field type="text" component="input" name={`${exp}.region`} className="form-control" />
          </FormGroup>

          <FormGroup>
            <ControlLabel className={('p3 p3_theme_light')}>Сайт компании</ControlLabel>
            <Field type="text" component="input" name={`${exp}.website`} className="form-control" />
          </FormGroup>

          <FormGroup>
            <div className={cn('wrapper-calendar')}>
              <div className={cn('calendar')}>
                <Field
                  label="Начало"
                  name={`${exp}.start_date`}
                  component={DateTimeField}
                  dateFormat="MM.YYYY"
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
                  dateFormat="MM.YYYY"
                  timeFormat={false}
                />
                <Calendar className={cn('calendar-icon')} />
              </div>
              <div className={cn('nowadays-checkbox')}>
              <CheckboxField
                label="По настоящее время"
                name={`${exp}.nowadays`}
              />
              </div>
            </div>
          </FormGroup>

          <div className={cn('wrapper-ckeditor')}>
            <Field
              label="Обязанности"
              component={CKeditor}
              name={`${exp}.experience_description`}
              className="form-control"
            />
          </div>
        </div>
      {renderTrash(fields, index)}
      </div>
    ))}
    <div className="btn btn-outline cur" onClick={() => fields.push({})}>
      Добавить место работы
    </div>
    {(touched || submitFailed) && error && <span>{error}</span>}
  </div>
)

const renderFieldsEducation = ({ fields, meta: { touched, error, submitFailed }, options, dispatch }) => (
  <div>
    {fields.length === 0 ? fields.push({}) : null}
    {fields.map((exp, index) => (
      <div className={cn('wrapper-data')} key={exp}>
        <div>
          <Field
            name={`${exp}.education_level_id`}
            label="Уровень образования"
            component={SelectInput}
            options={options}
          />

          <FormGroup>
            <ControlLabel className={('p3 p3_theme_light')}>Название учебного заведения</ControlLabel>
            <Field
              type="text"
              component="input"
              name={`${exp}.school_name`}
              className="form-control"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className={('p3 p3_theme_light')}>Факультет</ControlLabel>
            <Field
              type="text"
              component="input"
              name={`${exp}.faculty_name`}
              className="form-control"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className={('p3 p3_theme_light')}>Специальность</ControlLabel>
            <Field
              type="text"
              component="input"
              name={`${exp}.speciality`}
              className="form-control"
            />
          </FormGroup>

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
        </div>
      {renderTrash(fields, index)}
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
    {fields.length === 0 ? fields.push({}) : null}
    {fields.map((exp, index) => (
      <div className={cn('wrapper-data')} key={exp}>
        <div>
          <FormGroup>
            <ControlLabel className={('p3 p3_theme_light')}>Организация, выдавшая сертификат</ControlLabel>
            <Field
              type="text"
              component="input"
              name={`${exp}.company_name`}
              className="form-control"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className={('p3 p3_theme_light')}>Название сертификата</ControlLabel>
            <Field
              type="text"
              component="input"
              name={`${exp}.name`}
              className="form-control"
            />
          </FormGroup>

          <div className={cn('calendar')}>
            <Field
              label="Год выдачи"
              name={`${exp}.start_date`}
              component={DateTimeField}
              dateFormat="YYYY"
              timeFormat={false}
            />
            <Calendar className={cn('calendar-icon')} />
          </div>

          <div className={cn('b-upload-file')}>
            <FieldArray
              name={`${exp}.document`}
              component={MultiFile}
              multiple={false}
              label={'Добавить файл'}
            />
          </div>
        </div>
      {renderTrash(fields, index)}
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
    {fields.length === 0 ? fields.push({}) : null}
    {fields.map((exp, index) => (
      <div className={cn('wrapper-data')} key={exp}>
        <div>
          <FormGroup>
            <ControlLabel className={('p3 p3_theme_light')}>Организация, проводившая курсы</ControlLabel>
            <Field
              type="text"
              component="input"
              name={`${exp}.company_name`}
              className="form-control"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel className={('p3 p3_theme_light')}>Название</ControlLabel>
            <Field type="text" component="input" name={`${exp}.name`} className="form-control" />
          </FormGroup>

          <div className={cn('calendar')}>
            <Field
              label="Год выдачи"
              name={`${exp}.end_year`}
              component={DateTimeField}
              dateFormat="YYYY"
              timeFormat={false}
            />
            <Calendar className={cn('calendar-icon')} />
          </div>

          <div className={cn('b-upload-file')}>
            <FieldArray
              name={`${exp}.document`}
              component={MultiFile}
              multiple={false}
              label={'Добавить файл'}
            />
          </div>
        </div>
      {renderTrash(fields, index)}
      </div>
    ))}
    <div className="btn btn-outline" onClick={() => fields.push({})}>
      Добавить курс
    </div>
    {(touched || submitFailed) && error && <span>{error}</span>}
  </div>
)

class ResumeCollapse extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: true,
    }
  }

  componentWillMount(){
    const { employees: { current }, initialize } = this.props
    const resume = current.resumes[0]
    if (resume){
      initialize({
        certificates: resume.resume_certificates.map(item => {
          return {
            id: item.id,
            company_name: item.company_name,
            name: item.name,
            document: item.document && [item.document],
            start_date: item.start_date && moment(item.start_date),
          }
        }),
        courses: resume.resume_courses.map(item => {
          return {
            ...item,
            id: item.id,
            document: item.document && [item.document],
            end_year: item.end_year && moment(item.end_year),
          }
        }),
        language_skills_attributes:
          resume.language_skills.length > 0 ? resume.language_skills : [''],
        resume_work_experiences_attributes:
          resume.resume_work_experiences.length > 0 ?
            resume.resume_work_experiences.map(item => {
              return {
                id: item.id,
                company_name: item.company_name,
                position: item.position,
                region: item.region,
                website: item.website,
                experience_description: item.experience_description,
                start_date: moment(item.start_date),
                end_date: item.end_date ? moment(item.end_date) : null,
                nowadays: item.end_date ? false : true,
              }
            }) :
            [''],
        resume_educations_attributes:
          resume.resume_educations.map(item => {
              return {
                ...item,
                end_year: item.end_year && `${item.end_year}`,
              }
            })
      })
    }
  }

  educationOptionsForSelect = education =>
    education.map(source => ({ label: source.name, value: source.id }))

  componentDidUpdate(prevProps){
    if (!prevProps.submitFailed && this.props.submitFailed){
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], { offset: 0, duration: 1000})
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  checkError(){
    const errorField = ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]
    if (errorField){
      scrollToComponent(errorField, { offset: 0, duration: 1000})
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  onSubmit = async () => {
    const { dispatch, current } = this.props

    const res = await dispatch(updateResumeEmployee(current.id))
    if (res && !(res.success === false)) {
      dispatch(push(`/employees/${current.id}`))
      toastr.success('Профиль успешно отредактирован.')
      return
    }
    toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
  }



  onReset = () => window.history.back()

  render() {
    const { open } = this.state
    const { languages, languagesLevel, education, handleSubmit, dispatch, reasonToFillTheProfile } = this.props
    return (
      <div className={cn} id="statuses">
        <div className={cn('head')} onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Резюме</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_close')} />
          ) : (
            <Arrow className={cn('arrow-icon_open')} />
          )}
        </div>

        <Collapse in={this.state.open}>
          <form onSubmit={handleSubmit(this.onSubmit)}
                onKeyPress={e => {
                  if (e.key === 'Enter') e.preventDefault();
                }}>
            <div>
              <div className={cn('body')}>
                <div className={cn('wrapper-b-data')}>
                  <h4>Место работы</h4>
                  <FieldArray name="resume_work_experiences_attributes" component={renderFieldsExperience} />
                  {reasonToFillTheProfile&&
                    <blockquote className={cn('blockquote')}>
                      <ControlLabel>Зачем нужно заполнять этот раздел</ControlLabel>
                      <div dangerouslySetInnerHTML={{ __html: reasonToFillTheProfile.value }}/>
                    </blockquote>
                  }
                </div>

                <div className={cn('wrapper-b-data')}>
                  <h4>Образование</h4>
                  <FieldArray name="resume_educations_attributes" component={renderFieldsEducation}
                              options={this.educationOptionsForSelect(education)}
                              dispatch={dispatch}
                  />
                </div>

                <div className={cn('wrapper-b-data')}>
                  <h4>Знание языков</h4>
                  <div className={cn('skills-language')}>
                    <FieldArray
                      name="language_skills_attributes"
                      component={SelectInputGroupLanguage}
                      languages={languages}
                      languagesLevel={languagesLevel}
                    />
                  </div>
                </div>

                <div className={cn('wrapper-b-data')}>
                  <h4>Сертификаты</h4>
                  <FieldArray name="certificates" component={renderFieldsCertificates} dispatch={dispatch} />
                </div>

                <div className={cn('wrapper-b-data')}>
                  <h4>Курсы</h4>
                  <FieldArray name="courses" component={renderFieldsCourses} />
                </div>
              </div>
            </div>
            <div className={cn('actions')}>
              <button onClick={() => this.checkError()} className={cn('actions-send')}>
                Сохранить
              </button>
              <div onClick={this.onReset} className={cn('actions-cancel')}>
                Отменить
              </div>
            </div>
          </form>

        </Collapse>
      </div>
    )
  }
}
export default connector(ResumeCollapse)
