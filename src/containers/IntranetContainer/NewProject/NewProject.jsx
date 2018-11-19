import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import BootstrapInput from 'components-folder/Form/BootstrapInput'
import BootstrapTextarea from 'components-folder/Form/BootstrapTextarea'
import SelectInputOptGroups from 'components-folder/Form/SelectInputOptGroups'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import EmployeesSearch from './EmployeesSearch'
import { RadioButtonGroup } from 'components-folder/RadioButtonGroup'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import { Calendar } from 'components-folder/Icon'
import CheckboxField from 'components-folder/Form/CheckboxField'
import TagsField from "components-folder/Form/TagsField";
import * as legalUnitsActions from '../../../redux/actions/legalUnitsActions'
import * as employeesActions from '../../../redux/actions/employeesActions'
import * as departmentsActions from '../../../redux/actions/departmentsActions'
import * as customersActions from '../../../redux/actions/customersActions'
import { createProject, updateProject } from '../../../redux/actions/projectsDataActions'
import {dateTimeFormat, greaterThanStart, required} from '../../../lib/validation'
import { toastr } from 'react-redux-toastr'
import { push } from 'react-router-redux'
import moment from 'moment'
import ReactDOM from "react-dom";
import scrollToComponent from "components-folder/ScrollToComponent";



const cn = require('bem-cn')('new-project')
if (process.env.BROWSER) {
  require('./style.css')
}

class NewProject extends Component {
  state = {
    project_status_option: [
      {
        active: true,
        disabled: false,
        value: 'active',
        label: 'Активный',
      },
      {
        active: false,
        disabled: false,
        value: 'closed',
        label: 'Завершен',
      },
    ],
    departmentsOptions: [],
    edit: false,
    disabledEndDate: false,
  }

  componentDidMount(){
    const { dispatch, match, initialize, project } = this.props
    if (match.params.id){
      this.setState({edit: true})
      initialize({
        status: project.status,
        title: project.title,
        charge_code: project.charge_code,
        legal_unit: project.legal_unit && {
          label: project.legal_unit.full_name,
          value: project.legal_unit.id,
        },
        manager: project.manager && {
          label: project.manager.full_name,
          value: project.manager.id,
        },
        department: project.department && {
          label: project.department.name_ru,
          value: project.department.id,
        },
        begin_date: project.begin_date ? moment(project.begin_date) : '',
        end_date: project.end_date ? moment(project.end_date) : '',
        for_now: !project.end_date,
        product_list: project.products.map(({name}) => ({name: name})),
        methodology_list: project.methodologies.map(({name}) => ({name: name})),
        technology_list: project.technologies.map(({name}) => ({name: name})),
        description: project.description,
        customer: project.customer_projects[0] && {
          label: project.customer_projects[0].customer.name,
          value: project.customer_projects[0].customer.id,
        }
      })
      if (!project.end_date){
        this.setState({disabledEndDate: true})
      }
    }
    Promise.all([
      dispatch(legalUnitsActions.getLegalUnits()),
      dispatch(employeesActions.getEmployees()),
      dispatch(departmentsActions.getDepartments()),
      dispatch(customersActions.getCustomers()),
    ])
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
    const { employees } = this.props
    return employees.map(it => ({
      label: it.full_name,
      value: it.id,
    }))
  }

  getLegalUnitsForSelect = () => {
    const { legal_units } = this.props
    return legal_units.map(it => ({
      label: it.full_name,
      value: it.id,
    }))
  }

  setDepartmentsOption = (value) => {
    const { departments } = this.props
    const departmentsOptions = departments.filter(department => department.legal_unit_id === value.value)
      .map(it => ({
        label: it.name_ru,
        value: it.id,
      }))
    this.setState({departmentsOptions: departmentsOptions})
  }

  getCustomersForSelect = () => {
    const { customers } = this.props
    return customers.map(it => ({
      label: it.name,
      value: it.id,
    }))
  }

  onSubmit = async () => {
    const { dispatch, project } = this.props
    const { edit } = this.state
    let res = {}
    if (edit){
      res = await dispatch(updateProject(project))
    } else {
      res = await dispatch(createProject())
    }

    if (res.id) {
      dispatch(push(`/projects/${res.id}`))
      toastr.success(edit ? 'Проект успешно сохранен.' : 'Проект успешно создан.')
    } else {
      toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
    }
  }

  onReset = () => {
    window.history.back()
  }

  render() {
    const { project_status_option, departmentsOptions, edit, disabledEndDate } = this.state
    const { handleSubmit } = this.props
    return(
      <div className={cn()}>
        <form
          onSubmit={handleSubmit(this.onSubmit)}
          onKeyPress={e => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        >
          <div className={cn('wrapper')}>
            <div className={cn('data-input').mix(
              cn('data-input_margin')
            )}>


              <FormGroup>
                <ControlLabel>Статус проекта</ControlLabel>
                <Field component={RadioButtonGroup} options={project_status_option} name="status"
                       layout={'block'}/>
              </FormGroup>
              <div className={cn('required')}>
                <Field
                  component={BootstrapInput}
                  name={`title`}
                  validate={[required]}
                  label={'Название Проекта'}
                />
              </div>
              <Field
                component={BootstrapInput}
                name={`charge_code`}
                label={'Код проекта'}
              />

              <h4>Исполнитель</h4>

              <Field
                component={SelectInputOptGroups}
                options={this.getLegalUnitsForSelect()}
                name={`legal_unit`}
                searchable={true}
                onChange={(value) => this.setDepartmentsOption(value)}
                label={'Юридическое лицо'}
                noResultsText="Нет данных для выбора."
              />
              <div className={cn('required')}>
                <Field
                  component={SelectInputOptGroups}
                  options={this.getEmployeesForSelect()}
                  name={`manager`}
                  searchable={true}
                  validate={[required]}
                  label={'Менеджер'}
                  noResultsText="Нет данных для выбора."
                />
              </div>
              <Field
                component={SelectInputOptGroups}
                options={departmentsOptions}
                searchable={true}
                name={`department`}
                label={'Подразделение'}
                noResultsText="Нет подрезделений в выбраном юр. лице"
              />
              <FormGroup>
                <ControlLabel>ДатЫ начала – окончания проекта</ControlLabel>
                <div className={cn('wrapper-calendar')}>
                  <div className={cn('calendar')}>
                    <Field
                      label=""
                      name={`begin_date`}
                      component={DateTimeField}
                      validate={[dateTimeFormat]}
                      dateFormat="DD.MM.YYYY"
                      timeFormat={false}
                    />
                    <Calendar className={cn('calendar-icon')} />
                  </div>
                  <div className={cn('dash')}>—</div>
                  <div className={cn('calendar')}>
                    <Field
                      label=""
                      name={`end_date`}
                      component={DateTimeField}
                      validate={[dateTimeFormat, greaterThanStart]}
                      dateFormat="DD.MM.YYYY"
                      inputProps={{ disabled: disabledEndDate}}
                      timeFormat={false}
                    />
                    <Calendar className={cn('calendar-icon')} />
                  </div>
                  <CheckboxField
                    label="По настоящее время"
                    name={`for_now`}
                    onChange={() => this.setState({disabledEndDate: !disabledEndDate})}
                    className={cn('nowadays-checkbox')}
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <Field label={'Продукты'} name="product_list" component={TagsField} />
                <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>Например: Siebel CRM</p>
              </FormGroup>
              <FormGroup>
                <Field label={'Методологии'} name="methodology_list" component={TagsField} />
                <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>Например: Agile, Scrum, Waterfall</p>
              </FormGroup>
              <FormGroup>
                <Field label={'Технологии'} name="technology_list" component={TagsField} />
                <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>Например: React Native, AngularJS, NPM</p>
              </FormGroup>
              <Field
                component={BootstrapTextarea}
                name={`description`}
                type="text"
                label={'Описание проекта'}
              />
              <h4>Заказчик</h4>

              <Field
                component={SelectInputOptGroups}
                options={this.getCustomersForSelect()}
                name={`customer`}
                searchable={true}
                noResultsText="Нет данных для выбора."
                label={'Название организации'}
              />
            </div>
            {
              !edit && <EmployeesSearch />
            }
          </div>
          <button className={'btn btn-primary btn-margin-right '} onClick={() => this.checkError()}>Сохранить</button>
          <div className={'btn btn-outline'} onClick={() => this.onReset()}>Отменить</div>
        </form>

      </div>
    )
  }
}export default reduxForm({
  form: 'NewProject',
})(NewProject)

