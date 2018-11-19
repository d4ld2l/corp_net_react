import React, {Component} from 'react'
import {Field} from 'redux-form'
import {Collapse, FormGroup, ControlLabel} from 'react-bootstrap'
import {Arrow} from 'components-folder/Icon'
import CheckboxGroup from 'components-folder/Form/CheckboxGroup'
import SelectProfSpec from 'components-folder/Form/SelectProfSpec'
import CKeditor from 'components-folder/Form/CKeditor'
import {editorConfig} from './data'
import BootstrapInput from "components-folder/Form/BootstrapInput";

const cn = require('bem-cn')('candidate-tab-expectations')

if (process.env.BROWSER) {
  require('./main.css')
}

const optionsSchedule = [
  {label: 'Полный день', value: 'full_day'},
  {label: 'Сменный график', value: 'exchangeable'},
  {label: 'Гибкий график', value: 'flextime'},
  {label: 'Удаленная работа', value: 'remote'},
  {label: 'Вахтовый метод', value: 'rotating'},
]

const optionsEmployment = [
  {label: 'Полная', value: 'full_time'},
  {label: 'Частичная', value: 'part_time'},
  {label: 'Волонтерство', value: 'volunteering'},
  {label: 'Стажировка', value: 'probation'},
  {label: 'Проектная или временная работа', value: 'temporary'},
]


const onlyNumberNormalize = value => {
  if (!value) return value
  return value.replace(/[^\d]/g, '')
}

const salaryNormalize = value => {
  const result = onlyNumberNormalize(value)
  return result.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

export default class CandidateTabExpectations extends Component {
  state = {
    open: true,
  }

  specializationOptionsForSelect = specialization =>
    specialization.map(item => {
      return {
        label: item.name,
        options: item.professional_specializations.map(spec => {
          return {label: spec.name, value: spec.id}
        }),
      }
    })

  render() {
    const {open} = this.state
    const {specialization} = this.props

    return (
      <div className={cn} id="expectations">
        <div className={cn('head').mix('clearfix')}
             onClick={() => this.setState({open: !open})}>
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
                <Field type="text" component={BootstrapInput} name="desired_position" showLabel label={'Должность'}
                       toIndent/>

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
