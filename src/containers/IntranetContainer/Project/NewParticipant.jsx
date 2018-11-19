import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import compose from 'ramda/src/compose'
import { v4 } from 'uuid'

import { PARTICIPANTS_DATA, PARTICIPANTS_TABS } from './data'
import { fillSkills } from '../../../redux/actions/searchSkills'
import { Field, reduxForm, FieldArray } from 'redux-form'
import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import ReduxFormDropzoneAvatarCandidate from 'components-folder/Form/ReduxFormDropzoneAvatarCandidate'
import {
  getProfilesProject, updateProfileProject, toggleTabProfilesProject, getProfilesProjectPagination,
  createProfileProject, getProfileProject
} from '../../../redux/actions/profilesProjectActions'
import ParticipantItem from './ParticipantItem'
import ParticipantCard from './ParticipantCard'
import { Row, Col, Collapse, ControlLabel, FormGroup } from 'react-bootstrap'
import {toastr} from 'react-redux-toastr'



import {
  Loupe,
  Settings,
  Arrow,
  Copy,
  Close,
  Attention,
  Phone,
  Skype,
  Post,
  Trash,
  Plus,
  Calendar,
  Planet,
} from 'components-folder/Icon/'
import Loader from "components-folder/Loader";

import CheckboxField from 'components-folder/Form/CheckboxField'

import {createProject, getProjectsDataPagination, updateProject} from "../../../redux/actions/projectsDataActions";
import * as employeesActions from "../../../redux/actions/employeesActions";
import SelectInputOptGroups from "components-folder/Form/SelectInputOptGroups";
import {dateTimeFormat, greaterThanStartInArray, required} from "../../../lib/validation";
import SkillsFIeldProfile from "components-folder/Form/SkillsFIeldProfile";
import DateTimeField from "components-folder/Form/DateTimeFIeld";
import SelectInput from "components-folder/Form/SelectInput";
import {push} from "react-router-redux";
import scrollToComponent from "components-folder/ScrollToComponent";
import ReactDOM from "react-dom";
import GeneralInformationSkills from '../EmployeeEdit/GeneralInformationSkills'
const cn = require('bem-cn')('participants')
if (process.env.BROWSER) {
  require('./style.css')
}
moment.locale('ru')

const work = ({fields, meta: {error, submitFailed}}) => (

  <div>
    {fields.length === 0 ? fields.push({}) : null}

    {fields.map((field, index) => (
      <div key={field} className={cn('group')}>
        <label className="form-group__label ">Период работы на проекте</label>
        <div className={cn('wrapper-calendar')}>
          <div className={cn('calendar')}>
            <Field
              label=""
              name={`${field}.begin_date`}
              component={DateTimeField}
              validate={[dateTimeFormat]}
              dateFormat="YYYY-MM-DD"
              timeFormat={false}
            />
            <Calendar className={cn('calendar-icon')} />
          </div>
          <div className={cn('dash')}>—</div>
          <div className={cn('calendar')}>
            <Field
              label=""
              name={`${field}.end_date`}
              component={DateTimeField}
              validate={[dateTimeFormat, greaterThanStartInArray]}
              dateFormat="YYYY-MM-DD"
              inputProps={{ disabled: fields.get(index).for_now}}
              timeFormat={false}
            />
            <Calendar className={cn('calendar-icon')} />
          </div>

        </div>
        <div className={cn('wrapper-for_now')}>
          <CheckboxField
            label="По настоящее время"
            name={`${field}.for_now`}
            onChange={(value) => fields.get(index).end_date = ''}
            className={cn('nowadays-checkbox')}
          />
        </div>
        <div className={cn('')}>
          <Field
            component={BootstrapInput}
            name={`${field}.role`}
            type="text"
            label="Роль"
          />
        </div>
        <Field
          component={BootstrapTextarea}
          name={`${field}.duties`}
          type="text"
          label="Обязанности"
        />
        {index !== fields.length - 1 ? (
          <div className={cn('delete')} onClick={() => fields.remove(index)}>
            <div className={cn('before-straight-angle')} />
            <Trash className={cn('delete-icon')} />
            <div className={cn('after-straight-angle')} />
          </div>
        ) : (
          <div className={cn('wrapper-add-btn')} onClick={() => fields.push({})}>
            <div className={cn('before-straight-angle')} />
            <Plus outline={'filled'} className={cn('add')} />
            <div className={cn('after-straight-angle')} />
          </div>
        )}
      </div>
    ))}
  </div>
)

class NewParticipant extends Component {
  state = {
    open: false,
    edit: false,
  }

  componentDidMount(){
    const {dispatch, employees, currentProfileProject, initialize, edit, project, user} = this.props

    if (employees.length === 0){
      dispatch(employeesActions.getEmployees())
    }

    if (!edit && !(project.manager_id === user.id ||  user.roles.find(({name}) => name === 'admin'))){
      initialize({
        participant: {
          value: user.id,
          label: user.full_name,
        }
      })
    }

    if (edit){
      dispatch(fillSkills(currentProfileProject.account.account_skills))
      initialize({
        participant: {
          value: currentProfileProject.account.id,
          label: currentProfileProject.account.full_name,
        },
        skill_list: currentProfileProject.account.account_skills.map(it => ({...it, skill_attributes: it.skill})),
        project_work_periods_attributes: currentProfileProject.project_work_periods.map((it) => ({
          ...it,
          for_now: (it.begin_date && !it.end_date) ? true : false,
        })),
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { edit, initialize } = this.props
    if (edit && !nextProps.edit){
      initialize({
        participant: {},
        skill_list: [],
        project_work_periods_attributes: [],
      })
    }
  }

  componentDidUpdate(prevProps){
    if (!prevProps.submitFailed && this.props.submitFailed){
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], { offset: 0, duration: 1000})
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  checkError(){
    if (ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]){
      scrollToComponent(ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0], { offset: 0, duration: 1000})
      toastr.error('Проверьте правильность заполненых полей.')
    }
  }

  getEmployeesForSelect = () => {
    const { employees, profilesProject, project } = this.props
    return employees.filter(({id}) => !project.account_projects.map(({account_id}) => (account_id)).includes(id)).map(it => ({
      label: it.full_name,
      value: it.id,
    }))
  }

  onSubmit = async () => {
    const { dispatch, project, showSidebar, edit, currentProfileProject}  = this.props
    let res =  {}
    if (edit) {
      res = await dispatch(updateProfileProject(project.id, currentProfileProject))
    } else {
      res = await dispatch(createProfileProject(project.id))
    }
    if (res.success){
      if (edit) {
        toastr.success(`Участник ${res.account_project.account.full_name} успешно обновлен.`)
      } else {
        toastr.success(`${res.account_project.account.full_name} успешно добавлен в проект.`)
      }
      if (!edit){
        dispatch(getProfilesProject(project.id, 1))
      }
      showSidebar(res.account_project.id)
    } else {
      toastr.error(`На сервере ошибки, повторите попытку позже`)
    }
  }

  render() {
    const { closeSidebar, handleSubmit, edit, user, currentProfileProject: {account},loaders, project, enabledComponents } = this.props
    if (loaders.profileProject && edit){
      return (
        <div className={cn('participant-card-wrapper')}>
          <Loader/>
        </div>
      )
    }
    return (
      <div className={cn('participant-card-wrapper').mix(cn('participant-card-wrapper_new'))}>
        <div className={cn('participant-card-head-wrapper')}>
          <h2>{edit ? 'Редактирование участника' : 'Новый участник'}</h2>
          <div
            className={cn('participant-card-func-elements').mix(
              cn('participant-card-func-elements_new')
            )}
          >
            <span
              onClick={closeSidebar}
              className={cn('participant-card-closed-thin-icon-wrapper').mix('cur')}
              title={'Закрыть форму'}
            >
        <Close className={cn('participant-card-closed-thin-icon')} />
        </span>
          </div>
        </div>

        <div className={cn('b-wrapper').mix('global-scroll global-scroll_theme_light')}>
          <form
            onSubmit={handleSubmit(this.onSubmit)}
            onKeyPress={e => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          >
            <div className="required">
              <Field
                component={SelectInputOptGroups}
                options={this.getEmployeesForSelect()}
                name={`participant`}
                searchable={true}
                validate={[required]}
                onChange={this.setSkillList}
                disabled={(edit || !(project.manager_id === user.id ||  user.roles.find(({name}) => name === 'admin'))) ? true : false}
                label={'Участник'}
                noResultsText="Нет данных для выбора."
              />
              <p className={cn('info-msg')}>Введите имя участника</p>
            </div>
            {
              edit && enabledComponents.shr_skills && <GeneralInformationSkills />
            }

            <FormGroup>
              <FieldArray
                name="project_work_periods_attributes"
                component={work}
              />
            </FormGroup>
            <button className={'btn btn-primary btn-margin-right '} onClick={() => this.checkError()}>Сохранить</button>
            <button className={'btn btn-primary btn-outline'} onClick={closeSidebar}>Отменить</button>
          </form>
        </div>
      </div>
    )
  }
}
export default reduxForm({
  form: 'NewParticipant',
})(NewParticipant)
