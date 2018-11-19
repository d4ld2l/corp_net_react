import React, { Component } from 'react'
import compose from 'ramda/src/compose'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import isEqual from 'lodash/isEqual'
import { Collapse, FormGroup, ControlLabel } from 'react-bootstrap'

import { Arrow } from '../../Icon'
import CheckboxGroup from '../../Form/CheckboxGroup'
import SelectProfSpec from '../../Form/SelectProfSpec'
import CKeditor from '../../Form/CKeditor'

import { editorConfig } from './data'
import BootstrapInput from "../../Form/BootstrapInput";

const cn = require('bem-cn')('candidate-tab-expectations')

if (process.env.BROWSER) {
  require('./main.css')
}

const optionsExperience = [
  { label: 'Не имеет значения', value: 'doesnt_matter' },
  { label: 'Нет опыта', value: 'no_experience' },
  { label: 'От 1 года', value: 'from_1_year' },
  { label: 'От 3 лет', value: 'for_3_years' },
  { label: 'От 3 до 6 лет', value: 'from_3_to_6_years' },
  { label: 'Более 6 лет', value: 'from_6_years' },
]

const optionsSchedule = [
  { label: 'Полный день', value: 'full_day' },
  { label: 'Сменный график', value: 'exchangeable' },
  { label: 'Гибкий график', value: 'flextime' },
  { label: 'Удаленная работа', value: 'remote' },
  { label: 'Вахтовый метод', value: 'rotating' },
]

const optionsEmployment = [
  { label: 'Полная', value: 'full_time' },
  { label: 'Частичная', value: 'part_time' },
  { label: 'Волонтерство', value: 'volunteering' },
  { label: 'Стажировка', value: 'probation' },
  { label: 'Проектная или временная работа', value: 'temporary' },
]

const connector = compose(
  reduxForm({
    form: 'CandidateTabExpectations',
  }),
  connect(state => ({
    form: state.form.CandidateTabExpectations,
    initialValues: state.candidates.parsedResume.expectations,
    specialization: state.candidates.specialization,
    candidate: state.candidates.current,
  })),
)

type Props = {}

type State = {
  open: boolean,
}

const onlyNumberNormalize = value => {
  if (!value) return value
  return value.replace(/[^\d]/g, '')
}

const salaryNormalize = value => {
  const result = onlyNumberNormalize(value)
  return result.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

class CandidateTabExpectations extends Component<Props, State> {
  state = {
    open: true,
  }

  componentDidMount() {
    const { initialize, candidateId, candidate, specialization } = this.props
    if (candidateId) {
      const { resume } = candidate
      let group = {}
      if (resume.professional_specializations.length > 0){
        group = this.specializationOptionsForSelect(specialization).filter(it => it.options.map(({value}) => (value)).includes(resume.professional_specializations[0].id))[0]
      }
      initialize({
        salary_level: resume.salary_level && resume.salary_level.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '),
        experience: resume.experience,
        working_schedule: resume.working_schedule,
        employment_type: resume.employment_type,
        comment: resume.comment,
        desired_position: resume.desired_position,
        professional_specialization_ids: resume.professional_specializations.length > 0 ? resume.professional_specializations.map((it) => ({
          group: group,
          label: it.name,
          value: it.id,
      })) : null,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      this.props.initialize(nextProps.initialValues)
    }
  }

  specializationOptionsForSelect = specialization =>
    specialization.map(item => {
      return {
        label: item.name,
        options: item.professional_specializations.map(spec => {
          return { label: spec.name, value: spec.id }
        }),
      }
    })

  render() {
    const { open } = this.state
    const { specialization } = this.props

    return (
      <div className={cn} id="expectations">
        <div className={cn('head').mix('clearfix')}
             onClick={() => this.setState({ open: !open })}>
          <h2 className="indent-reset">Ожидания</h2>

          {open ? (
            <Arrow className={cn('arrow-icon_open')}/>
          ) : (
            <Arrow className={cn('arrow-icon_close')}/>
          )}
        </div>

        <Collapse in={this.state.open}>
          <div>
            <div className={cn('collapse')}>
              <div className={cn('wrapper-data')}>
                <Field type="text" component={BootstrapInput} name="desired_position" showLabel label={'Должность'} toIndent/>

                <Field
                  component={SelectProfSpec}
                  options={this.specializationOptionsForSelect(specialization)}
                  name={"professional_specialization_ids"}
                  label={'Профессиональная область'}
                />

                  <div className={cn('wrapper-salary')}>
                    <div className={cn('salary')}>
                      <Field
                        name="salary_level"
                        type={'text'}
                        showLabel
                        label={'Уровень заработной платы'}
                        component={BootstrapInput}
                        normalize={salaryNormalize}
                        toIndent
                      />
                    </div>

                    <p className={cn('text-salary')}>руб.</p>
                  </div>

                <div className={cn('check-block')}>
                  <FormGroup>
                    <ControlLabel className={('p3 p3_theme_light')}>Опыт работы</ControlLabel>
                    <CheckboxGroup options={optionsExperience}
                                   name="experience"/>
                  </FormGroup>
                </div>
                <div className={cn('check-block')}>
                  <FormGroup>
                    <ControlLabel className={('p3 p3_theme_light')}>График работы</ControlLabel>
                    <CheckboxGroup options={optionsSchedule}
                                   name="working_schedule"/>
                  </FormGroup>
                </div>
                <div className={cn('check-block')}>
                  <FormGroup>
                    <ControlLabel className={('p3 p3_theme_light')}>Тип занятости</ControlLabel>
                    <CheckboxGroup options={optionsEmployment}
                                   name="employment_type"/>
                  </FormGroup>
                </div>

                <div className={cn('wrapper-ckeditor')}>
                  <FormGroup controlId="formControlsTextarea">
                    <Field
                      component={CKeditor}
                      name="comment"
                      className="form-control"
                      label="КОММЕНТАРИЙ"
                      config={editorConfig}
                    />
                    <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>Оставьте свой комментарий к
                      вакансии</p>
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}

export default connector(CandidateTabExpectations)
