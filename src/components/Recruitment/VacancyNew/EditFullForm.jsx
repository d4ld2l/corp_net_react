import React, { Component } from 'react'
import { Field, reduxForm, FieldArray, change } from 'redux-form'
import moment from 'moment'
import { connect } from 'react-redux'
import compose from 'ramda/src/compose'
import uniq from 'ramda/src/uniq'
import { get, isEqual } from 'lodash'

import {
  getDepartmentsTripleTree
} from 'redux-folder/actions/departmentsActions'

import Input from 'components-folder/Input/'
import CommonAddFile from 'components-folder/Form/CommonAddFile'
import DateTimeField from 'components-folder/Form/DateTimeCalendarIconFIeld'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import SelectInput from 'components-folder/Form/SelectInput'
import DateTime from 'react-datetime'
import CKeditor from 'components-folder/Form/CKeditor'
import SelectorEmployees from 'components-folder/Form/SelectorEmployees'
import {typeOfSalaryOptions, editorConfig} from './data'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import ProjectSelect from './ProjectSelect'
import {Calendar} from 'components-folder/Icon'

const validate = values => {
  const errors = {}

  return errors
}

const cn = require('bem-cn')('new-vacancy-form')

const connector = compose(
  reduxForm({
    form: 'createVacancyChangeFullForm',
    validate,
  }),
  connect(state => ({
    state,
    role: state.role,
    departments: state.departmentsReduced,
    system: state.system,
    initialValues: {
      legal_unit: state.vacancies.current.legal_unit,
      projectValue: state.vacancies.current.block,
      practice: state.vacancies.current.practice,
      project: state.vacancies.current.project,
      account_vacancies_attributes:
      state.vacancies.current.account_vacancies && state.vacancies.current.account_vacancies.length > 0 ?
      state.vacancies.current.account_vacancies.map(item => {
        return {
          full_name: {label: item.account.full_name, value: item.account.id},
          comment: item.comment,
        }
      }) : [''],
      additional_tests: state.vacancies.current.additional_tests,
      reason_for_opening: state.vacancies.current.reason_for_opening,
      ends_at: state.vacancies.current.ends_at,
      owner_id: state.vacancies.current.owner_id
        ? state.vacancies.current.owner_id
        : state.recruiter.newRequest.selectGeneralRecruiterRole.find(
        e => e.value === state.user.id
      ) || state.recruiter.newRequest.selectGeneralRecruiterRole[0],
      creator_id: state.vacancies.current.creator_id
        ? state.vacancies.current.creator_id
        : state.recruiter.newRequest.selectManagerRecruiterRole.find(
        e => e.value === state.user.id
      ) || state.recruiter.newRequest.selectManagerRecruiterRole[0],
      documents_attributes:
      state.vacancies.current.documents &&
      state.vacancies.current.documents.map(item => {
        return {
          id: item.id,
          name: item.name,
          file: item.file.url,
        }
      }),
    },
  }))
)

class EditFullForm extends Component {
  state = {
    showBlock: false,
  }

  componentWillReceiveProps(nextProps) {
    const {initialize} = this.props
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      initialize(nextProps.initialValues)
    }
  }

  componentDidMount() {
    const {initialize, vacancyId, dispatch, state} = this.props
    dispatch(getDepartmentsTripleTree())
    initialize({
      owner_id: state.recruiter.newRequest.selectGeneralRecruiterRole.find(
        e => e.value === state.user.id
      ) || state.recruiter.newRequest.selectGeneralRecruiterRole[0],
      creator_id: state.recruiter.newRequest.selectManagerRecruiterRole.find(
        e => e.value === state.user.id
      ) || state.recruiter.newRequest.selectManagerRecruiterRole[0],
      account_vacancies_attributes: [''],
    })
    if (vacancyId) {
      initialize(this.props.initialValues)
    }
  }

  uniqueItems = items => uniq(items)

  render() {
    const {
      role,
      departments,
      dispatch,
      system: { enabledComponents },
      state: {
        recruiter: {
          newRequest: {
            selectManagerRecruiterRole,
            selectGeneralRecruiterRole,
            selectRecruiterRole,
          },
        },
      },
    } = this.props
    const { showBlock } = this.state
    return (
      <div className={cn}>
        <div className={cn('field--550').mix(cn('field--mb-10'))}>
          <Field
            name="creator_id"
            label="Руководитель / контактное лицо по вакансии"
            options={selectManagerRecruiterRole}
            component={SelectInput}
            searchable={true}
          />
        </div>
        <div className={cn('field--550').mix(cn('field--mb-10'))}>
          <Field
            name="owner_id"
            label="Рекрутер"
            options={this.uniqueItems(selectGeneralRecruiterRole.concat(selectRecruiterRole))}
            component={SelectInput}
            searchable={true}
            disabled={role.recruitment_manager}
          />
        </div>
        <div className={cn('field--800')}>
          <div className={cn('date-field')}>
            <Field
              name="ends_at"
              label="Желаемый срок закрытия"
              options={typeOfSalaryOptions}
              component={DateTimeField}
              dateFormat="DD/MM/YYYY"
              timeFormat={false}
              isValidDate={current => current > moment().add(13, 'days')}
            />
          </div>
        </div>
        <div className={cn('field--470').mix(cn('field--m-10'))}>
          <Field
            name="project"
            type="text"
            component={BootstrapInput}
            showLabel
            label="Подразделение, куда требуется новый сотрудник"
            toIndent
          />
        </div>
        <div className={cn('btn-select')}>
        {
          enabledComponents.shr_org &&
          (
              <button
                className={'btn btn-link'}
                onClick={() => this.setState({showBlock: !showBlock})}
              >{showBlock ? 'Скрыть' : 'Выбрать'}
              </button>
          )
        }
        </div>
        {showBlock && (
          <ProjectSelect
            departments={departments}
            setBlock={value => dispatch(change('createVacancyChangeFullForm', 'block', value))}
            setPractice={value => dispatch(change('createVacancyChangeFullForm', 'practice', value))}
            setProject={value => dispatch(change('createVacancyChangeFullForm', 'project', value))}
            setProjectValue={value => dispatch(change('createVacancyChangeFullForm', 'projectValue', value))}
            closeBlock={() => this.setState({showBlock: false})}
          />
        )}
        <p className={cn('field--550').mix('new-vacancy-form__field--label new-vacancy-form__field--mb-10')}>
          Сотрудники, принимающие участие в подборе
        </p>

        <FieldArray name="account_vacancies_attributes"
                    component={SelectorEmployees}/>
        <div className={cn('field--550').mix(cn('field--mb-10'))}>
          <Field
            name="additional_tests"
            component={CKeditor}
            className="form-control"
            label="Дополнительные испытания:"
            config={editorConfig}
          />
          <p className={cn('field--550').mix('new-vacancy-form__field--notice new-vacancy-form__field--mb-10').mix('p2 p1_theme_light_third')}>
            Вы можете указать условия испытания или прикрепить файл
          </p>
        </div>
        <div
          className={cn('field--550')}>
          <FieldArray
            name="documents_attributes"
            component={CommonAddFile}
            multiple
            label="Прикрепить документ"
          />
        </div>
        <div className={cn('field--550').mix(cn('field--mb-10'))}>
          <Field
            name="reason_for_opening"
            component={CKeditor}
            className="form-control"
            label="Причина открытия"
            config={editorConfig}
          />
          <p className={cn('last-margin').mix(cn('field--notice')).mix('p2 p1_theme_light_third')}>
            Кратко изложите причину
          </p>
        </div>
      </div>
    )
  }
}

export default connector(EditFullForm)
