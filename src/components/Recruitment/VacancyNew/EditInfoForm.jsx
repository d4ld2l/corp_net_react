import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'ramda/src/compose'
import { Field, reduxForm } from 'redux-form'
import SelectInput from '../../Form/SelectInput'
import BootstrapCheckbox from '../../Form/BootstrapCheckbox'
import BootstrapInput from '../../Form/BootstrapInput'
import CKeditor from '../../Form/CKeditor'
import CheckboxGroup from '../../Form/CheckboxGroup'
import { Arrow } from '../../Icon'
import { FormGroup, ControlLabel, Collapse } from 'react-bootstrap'
import { isEqual, parseInt, split, join, isNumber } from 'lodash'

import {
  experienceOptions,
  scheduleOptions,
  typeOfEmploymentOptions,
  typeOfContractOptions,
  typeOfSalaryOptions,
  editorConfig,
} from './data'
import Input from 'components-folder/Input/'

const cn = require('bem-cn')('new-vacancy-form')

const onlyNumberNormalize = value => {
  if (!value) return value
  return value.replace(/[^\d]/g, '')
}

const salaryNormalize = value => {
  const result = onlyNumberNormalize(value)
  return result.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

const ckEditorValidate = value => value.replace(/[</p>&nbs;]/g, '')

const validate = values => {
  const errors = {}

  if (!values.name || !values.name.trim().length) {
    errors.name = 'Обязательное поле'
  }

  if (!values.positions_count || Number(values.positions_count) === 0) {
    errors.positions_count = 'Обязательное поле'
  }

  if (Number(values.positions_count) > 99) {
    errors.positions_count = 'Максимально 99'
  }

  if (!values.demands || !ckEditorValidate(values.demands).trim().length) {
    errors.demands = 'Обязательное поле'
  }

  if (!values.duties || !ckEditorValidate(values.duties).trim().length) {
    errors.duties = 'Обязательное поле'
  }

  let level_of_salary_from = isNumber(values.level_of_salary_from)
    ? values.level_of_salary_from
    : parseInt(join(split(values.level_of_salary_from, ' '), ''))
  let level_of_salary_to = isNumber(values.level_of_salary_to)
    ? values.level_of_salary_to
    : parseInt(join(split(values.level_of_salary_to, ' '), ''))

  if (level_of_salary_from > 999999) {
    errors.level_of_salary_from = 'До 6 знаков'
  }

  if (level_of_salary_from < 1) {
    errors.level_of_salary_from = 'Минимальное значение 1'
  }

  if (!values.level_of_salary_from) {
    errors.level_of_salary_from = 'Обязательное поле'
  }

  if (level_of_salary_to > 999999) {
    errors.level_of_salary_to = 'До 6 знаков'
  }

  if (level_of_salary_to < 1) {
    errors.level_of_salary_to = 'Минимальное значение 1'
  }

  if (!values.level_of_salary_to) {
    errors.level_of_salary_to = 'Обязательное поле'
  }

  if (!values.place_of_work || !values.place_of_work.trim().length) {
    errors.place_of_work = 'Обязательное поле'
  }

  return errors
}
const asyncValidate = async values => {
  let level_of_salary_from = isNumber(values.level_of_salary_from)
    ? values.level_of_salary_from
    : parseInt(join(split(values.level_of_salary_from, ' '), ''))
  let level_of_salary_to = isNumber(values.level_of_salary_to)
    ? values.level_of_salary_to
    : parseInt(join(split(values.level_of_salary_to, ' '), ''))

  if (level_of_salary_from > level_of_salary_to) {
    throw { level_of_salary_from: 'Неверное значение' }
  }
}

const connector = compose(
  reduxForm({
    form: 'createVacancyChangeInfoForm',
    validate,
    asyncValidate,
    asyncBlurFields: ['level_of_salary_from', 'level_of_salary_to'],
    initialValues: {
      type_of_contract: typeOfContractOptions[0],
      type_of_salary: typeOfSalaryOptions[0],
    },
  }),
  connect(state => ({
    state,
    initialValues: {
      name: state.vacancies.current.name,
      positions_count: state.vacancies.current.positions_count,
      demands: state.vacancies.current.demands,
      duties: state.vacancies.current.duties,
      experience: state.vacancies.current.experience,
      schedule: state.vacancies.current.schedule,
      type_of_employment: state.vacancies.current.type_of_employment,
      type_of_salary: state.vacancies.current.type_of_salary,
      level_of_salary_from: state.vacancies.current.level_of_salary_from,
      level_of_salary_to: state.vacancies.current.level_of_salary_to,
      showSalaryOnPablish: state.vacancies.current.show_salary,
      type_of_contract: state.vacancies.current.type_of_contract,
      place_of_work: state.vacancies.current.place_of_work,
      comment: state.vacancies.current.comment,
    },
  }))
)

class EditInfoForm extends Component {
  state = {
    showExtra: false,
  }

  componentWillReceiveProps(nextProps) {
    const { initialize } = this.props
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      initialize(nextProps.initialValues)
    }
  }

  componentDidMount() {
    const { initialize, vacancyId } = this.props
    if (vacancyId) {
      initialize(this.props.initialValues)
    }
  }

  render() {
    const { showExtra } = this.state
    const { clearAsyncError } = this.props
    return (
      <div className={cn}>
        <div style={{display: 'flex'}}>
          <div className={cn('field--420').mix(cn('field--mb-10'))}>
            <FormGroup>
              <ControlLabel>
                Название вакансии <span className="new-recruiter-request__required">*</span>
              </ControlLabel>
              <Field
                name="name"
                type="text"
                component={BootstrapInput}
                showLabel
                toIndent
                placeholder="Введите название вакансии"
                required
              />
            </FormGroup>
          </div>
          <div className={cn('field--100').mix(cn('field--ml-30'))}>
            <FormGroup>
              <ControlLabel>
                Количество <span className="new-recruiter-request__required">*</span>
              </ControlLabel>
              <Field
                name="positions_count"
                type="text"
                normalize={onlyNumberNormalize}
                component={BootstrapInput}
                showLabel
                toIndent
                required
              />
            </FormGroup>
          </div>
        </div>
        <div className={cn('field--550').mix(cn('field--mb-10'))}>
          <FormGroup>
            <ControlLabel>
              Основные требования <span className="new-recruiter-request__required">*</span>
            </ControlLabel>
            <Field
              name="demands"
              component={CKeditor}
              className="form-control"
              config={editorConfig}
            />
          </FormGroup>
          <p className={cn('field--notice').mix('p2 p1_theme_light_third')}>
            Перечислите ключевые требования к кандидату. Например, стрессоустойчивость и т.д.
          </p>
          <div className={cn('field--550')} />
          <FormGroup>
            <ControlLabel>
              Основные обязанности <span className="new-recruiter-request__required">*</span>
            </ControlLabel>
            <Field
              name="duties"
              component={CKeditor}
              className="form-control"
              config={editorConfig}
            />
          </FormGroup>
          <p className={cn('field--notice').mix('p2 p1_theme_light_third')}>
            Например, ведение отчетов и баз данных, выполнение поручений
          </p>
        </div>
        <div className={cn('field--800')} />
        <div style={{display: 'flex'}}>
          <div className={cn('field--250')}>
            <Field
              name="type_of_salary"
              label="Тип зарплаты:"
              options={typeOfSalaryOptions}
              component={SelectInput}
            />
          </div>
          <div className={cn('field--300').mix(cn('field--ml-30'))}>
            <FormGroup>
              <ControlLabel>
                Уровень заработной платы от - до{' '}
                <span className="new-recruiter-request__required">*</span>
              </ControlLabel>
              <div className={cn('flex')}>
                <div className={cn('field--100')}>
                  <Field
                    name="level_of_salary_from"
                    component={BootstrapInput}
                    type={'text'}
                    normalize={salaryNormalize}
                  />
                </div>
                <div className={cn('hyphen')}>—</div>
                <div className={cn('field--100')}>
                  <Field
                    name="level_of_salary_to"
                    type={'text'}
                    component={BootstrapInput}
                    onChange={e => clearAsyncError('level_of_salary_from')}
                    normalize={salaryNormalize}
                  />
                </div>
                <div className={cn('ruble')}>руб.</div>
              </div>
            </FormGroup>
          </div>
        </div>

        <div className={cn('field--550').mix(cn('field--mb-10'))}>
          <Field
            name="showSalaryOnPablish"
            component={BootstrapCheckbox}
            label="Указывать уровень заработной платы при публикации вакансии"
          />
        </div>
        <div className={cn('field--550').mix(cn('field--mb-10'))}>
          <FormGroup>
            <ControlLabel>
              Вид договора <span className="new-recruiter-request__required">*</span>
            </ControlLabel>
            <Field
              name="type_of_contract"
              options={typeOfContractOptions}
              component={SelectInput}
            />
          </FormGroup>
        </div>

        <div className={cn('field--550').mix(cn('field--mb-10'))}>
          <FormGroup>
            <ControlLabel>
              Место работы / Город / Офис <span className="new-recruiter-request__required">*</span>
            </ControlLabel>
            <Field
              name="place_of_work"
              type="text"
              component={BootstrapInput}
              showLabel
              toIndent
              required
            />
          </FormGroup>
        </div>

        <div className={cn('field--550').mix(cn('field--mb-10'))}>
          <Field
            name="comment"
            component={CKeditor}
            className="form-control"
            label="Комментарий"
            config={editorConfig}
          />
          <p className="new-vacancy-form__field--notice p2 p1_theme_light_third">Оставьте свой комментарий к вакансии</p>
        </div>
        <div
          className={cn('field--550').mix(
            'new-vacancy-form__checkbox-group new-vacancy-form__field--mb-10'
          )}
        >
          <h4
            className={cn('extra-title').mix('cur')}
            onClick={() => this.setState({ showExtra: !showExtra })}
          >
            <span>Дополнительно</span>
            {showExtra ? (
              <Arrow className={cn('arrow-icon').state({ active: showExtra })} />
            ) : (
              <Arrow className={cn('arrow-icon')} />
            )}
          </h4>
          <Collapse in={showExtra}>
            <div>
              <CheckboxGroup label="Опыт работы" name="experience" options={experienceOptions} />

              <CheckboxGroup label="График работы" name="schedule" options={scheduleOptions} />

              <CheckboxGroup
                label="Тип занятости"
                name="type_of_employment"
                options={typeOfEmploymentOptions}
              />
            </div>
          </Collapse>
        </div>
      </div>
    )
  }
}

export default connector(EditInfoForm)
