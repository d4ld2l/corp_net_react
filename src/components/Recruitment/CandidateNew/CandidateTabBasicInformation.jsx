import React, { Component } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import moment from 'moment'
import compose from 'ramda/src/compose'
import isEqual from 'lodash/isEqual'
import { Collapse, FormGroup, ControlLabel } from 'react-bootstrap'

import { Arrow, Calendar } from '../../Icon'


import { RadioButtonGroup } from '../../RadioButtonGroup'
import DateTimeField from '../../Form/DateTimeFIeld'
import SkillsField from '../../Form/SkillsField'
import SelectInputGroupLanguage from '../../Form/SelectInputGroupLanguage'
import CKeditor from '../../Form/CKeditor'

import { editorConfig } from './data'

const cn = require('bem-cn')('candidate-tab-basic-information')

if (process.env.BROWSER) {
  require('./main.css')
}
const marital_status_option = [
  { label: 'Женат', value: 'married_m' },
  { label: 'Замужем', value: 'married_w' },
  { label: 'Разведен', value: 'outside_of_marriage' },
  { label: 'Холост', value: 'unmarried' },
]

const children_option = [{ label: 'Есть', value: '0' }, {
  label: 'Нету',
  value: '1',
}]

const validate = values => {
  const errors = {}

  if (!moment(values.birthdate).isValid()) {
    errors.birthdate = 'Обязательное поле'
  }

  return errors
}

type Props = {
  fields: Array<{
    tags: string,
  }>,
  languages: Array<{}>,
  languagesLevel: Array<{}>,
}

type State = {
  open: boolean,
  sex: Array<{
    active: boolean,
    disabled: boolean,
    value: string,
    label: string,
  }>,
}

const connector = compose(
  reduxForm({
    form: 'CandidateTabBasicInformation',
    fields: ['skills'],
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: {
      language_skills_attributes: [''],
    },
    validate,
  }),
  connect(state => ({
    form: state.form.CandidateTabBasicInformation,
    initialValues: state.candidates.parsedResume.basicInformation,
    languagesLevel: state.candidates.languagesLevel,
    languages: state.candidates.languages,
    candidate: state.candidates.current,
  })),
)

class CandidateTabBasicInformation extends Component<Props, State> {
  state = {
    open: true,
    sex: [
      {
        active: false,
        disabled: false,
        value: 'male',
        label: 'Мужской',
      },
      {
        active: false,
        disabled: false,
        value: 'female',
        label: 'Женский',
      },
    ],
  }

  componentDidMount() {
    const { initialize, candidateId, candidate } = this.props
    if (candidateId) {
      const { resume } = candidate
      initialize({
        birthdate: moment(candidate.birthdate).format('DD.MM.YYYY'),
        sex: resume.sex,
        skills: resume.skills.map(item => item.name),
        skills_description: resume.skills_description,
        language_skills_attributes:
          resume.language_skills.length > 0 ? resume.language_skills : [''],
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.props.initialize(nextProps.initialValues)
    }
  }

  render() {
    const { open, sex } = this.state
    const { languages, languagesLevel } = this.props
    return (
      <div className={cn} id="basic_information">
        <div className={cn('head').mix('clearfix')}
             onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Общая информация</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')}/>
          ) : (
            <Arrow className={cn('arrow-icon_close')}/>
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('collapse')}>
              <div>
                <div className={cn('wrapper-line-up')}>
                  <div className={cn('wrapper-birthdate')}>
                    <Field
                      name="birthdate"
                      label="Дата рождения"
                      component={DateTimeField}
                      dateFormat="DD.MM.YYYY"
                      timeFormat={false}
                    />
                    <Calendar className={cn('calendar-icon')}/>
                  </div>

                  <FormGroup>
                    <ControlLabel>Пол</ControlLabel>
                    <Field component={RadioButtonGroup} options={sex} name="sex"
                           layout={'block'}/>
                  </FormGroup>
                </div>
                {/* <div className={cn('wrapper-line-up')}>
                      <div className={cn('marital-status')}>
                        <Field
                          label="Семейное положение"
                          name="marital_status"
                          component={SelectInput}
                          placeholder="Выбрать"
                          noResultsText="Нет значений"
                          options={marital_status_option}
                        />
                      </div>

                      <div className={cn('children')}>
                        <Field
                          label="Дети"
                          name="children"
                          component={SelectInput}
                          placeholder="Выбрать"
                          noResultsText="Нет значений"
                          options={children_option}
                        />
                      </div>
                  </div> */}

                <div className={cn('skills-list')}>
                  <h4>Навыки</h4>
                  <FormGroup>
                    <ControlLabel>Навыки</ControlLabel>
                    <Field name="skills" component={SkillsField}/>
                  </FormGroup>

                  <Field
                    component={CKeditor}
                    name="skills_description"
                    className="form-control"
                    label="Основные навыки"
                    config={editorConfig}
                  />
                  <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>
                    Если необходимо, опишите некоторые навыки более подробно
                  </p>
                </div>

                <div className={cn('skills-language')}>
                  <h4>Знание языков</h4>
                  <FieldArray
                    name="language_skills_attributes"
                    component={SelectInputGroupLanguage}
                    languages={languages}
                    languagesLevel={languagesLevel}
                  />
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default connector(CandidateTabBasicInformation)
