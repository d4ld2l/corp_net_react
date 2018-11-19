import React, { Component } from 'react'

import { Arrow, Calendar } from 'components-folder/Icon'
import SelectInputOptGroups from 'components-folder/Form/SelectInputOptGroups'
import { Field, reduxForm } from 'redux-form'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import CheckboxField from 'components-folder/Form/CheckboxField'
import { ControlLabel, FormGroup } from 'react-bootstrap'
import { v4 } from 'uuid'
import * as legalUnitsActions from "../../../redux/actions/legalUnitsActions";
import * as employeesActions from "../../../redux/actions/employeesActions";
import * as departmentsActions from "../../../redux/actions/departmentsActions";
import * as customersActions from "../../../redux/actions/customersActions";
import { setFilter, toggleFilter, getProjectsDictionary} from "../../../redux/actions/projectsDataActions";
import {dateTimeFormat, greaterThanStart} from "../../../lib/validation";
import ReactDOM from "react-dom";

const cn = require('bem-cn')('filter')
if (process.env.BROWSER) {
  require('./css/filter/filter.css')
}

class Filtered extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.defaultOpen,
    }
  }

  componentDidMount(){
    const { dispatch, filter, initialize } = this.props
    Promise.all([
      dispatch(legalUnitsActions.getLegalUnits()),
      dispatch(employeesActions.getEmployees()),
      dispatch(departmentsActions.getDepartments()),
      dispatch(customersActions.getCustomers()),
      dispatch(getProjectsDictionary('technologies')),
      dispatch(getProjectsDictionary('products')),
      dispatch(getProjectsDictionary('methodologies')),
    ])
    initialize({
      ...filter
    })
  }


  getCustomersForSelect = () => {
    const { customers } = this.props
    return customers.map(it => ({
      label: it.name,
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

  getEmployeesForSelect = () => {
    const { employees } = this.props
    return employees.map(it => ({
      label: it.full_name,
      value: it.id,
    }))
  }

  getDepartmentForSelect =() => {
    const { departments } = this.props
    return departments.map(it => ({
      label: it.name_ru,
      value: it.id,
    }))
  }

  getDictionary = (dictionary) => {
    const { methodologies, products, technologies } = this.props
    switch (dictionary) {
      case 'methodologies':
        return methodologies && methodologies.map( it => ({
          label: it.name,
          value: it.id,
        }))
      case 'products':
        return products && products.map( it => ({
          label: it.name,
          value: it.id,
        }))
      case 'technologies':
        return technologies && technologies.map( it => ({
          label: it.name,
          value: it.id,
        }))
    }
  }

  openCollapse = () => {
    const { dispatch, filterOpen } = this.props
    dispatch(toggleFilter(!filterOpen))
  }

  onSubmit(){
    const { dispatch, activeTabMy } = this.props
    if (!ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]) {
      dispatch(setFilter(activeTabMy))
    }
  }

  onRestFilter(){
    const { initialize } = this.props
    initialize({
      product_list: [],
      methodology_list: [],
      technology_list: [],
    })
  }

  render() {
    const { filterOpen, handleSubmit } = this.props

    return (
      <div className={cn('collapse').mix(cn('filtered'))}>
        <div className={cn('collapse-head')} onClick={this.openCollapse}>
          <h3 className={('indent-reset')}>Фильтр</h3>
          <span onClick={this.openCollapse}>
            {filterOpen ? (
              <Arrow className={cn('open-icon')} />
            ) : (
              <Arrow className={cn('close-icon')} />
            )}
          </span>
        </div>

        {filterOpen && (
          <div className={cn('collapse-body')}>
            <div>
              <div className={cn('filtered-body-wrapper-elem')}>
                <Field
                  component={SelectInputOptGroups}
                  options={this.getDepartmentForSelect()}
                  searchable={true}
                  name={`legalUnit`}
                  multi={true}
                  label={'Юридичесское лицо'}
                  noResultsText="Нет подрезделений в выбраном юр. лице"
                />
                <Field
                  component={SelectInputOptGroups}
                  options={this.getDepartmentForSelect()}
                  searchable={true}
                  name={`block`}
                  multi={true}
                  label={'Блок'}
                  noResultsText="Нет подрезделений в выбраном юр. лице"
                />
                <Field
                  component={SelectInputOptGroups}
                  options={this.getDepartmentForSelect()}
                  searchable={true}
                  name={`practice`}
                  multi={true}
                  label={'Практика'}
                  noResultsText="Нет подрезделений в выбраном юр. лице"
                />

                <Field
                  component={SelectInputOptGroups}
                  options={this.getDepartmentForSelect()}
                  searchable={true}
                  name={`office`}
                  multi={true}
                  label={'Офис'}
                  noResultsText="Нет офисов в выбраном юр. лице"
                />
                <fieldset className={cn('fieldset')}>
                  {/*Текст ошибки*/}
                  {/*<p className={'settings__error-msg'}>Ошибочка</p>*/}
                  <div className="form-group">
                    <label className={'p3 p3_theme_light_third'}>Ставка</label>
                    <input
                      type="text"
                      name="stavka"
                      className="form-control"
                    />
                  </div>
                </fieldset>
                <Field
                  component={SelectInputOptGroups}
                  options={this.getEmployeesForSelect()}
                  name={`contract`}
                  searchable={true}
                  label={'Тип договора'}
                  noResultsText="Нет данных для выбора."
                />

              </div>
              <div
                className={cn('filtered-body-wrapper-elem').mix(
                  cn('filtered-body-wrapper-elem_margin')
                )}
              >
                <fieldset className={cn('fieldset')}>
                  {/*Текст ошибки*/}
                  {/*<p className={'settings__error-msg'}>Ошибочка</p>*/}
                  <div className="form-group">
                    <label className={'p3 p3_theme_light_third'}>Уровень заработной платы от - до</label>
                    <div className={'form-group-container'}>
                      <input
                        type="text"
                        name="level-sallary-from"
                        className="form-control form-control_sallary"
                      />
                      <span className={'form-control__devider'}>&#8212;</span>
                      <input
                        type="text"
                        name="level-sallary-to"
                        className="form-control form-control_sallary"
                      />
                      <span className={'form-control__currency'}>руб.</span>
                    </div>
                  </div>
                </fieldset>
                <FormGroup>
                    <ControlLabel className={'p3 p3_theme_light_third'}>Дата окончания трудового договора</ControlLabel>
                    <div className={cn('wrapper-calendar')}>
                      <div className={cn('calendar')}>
                        <Field
                          label=""
                          name={`end_date`}
                          component={DateTimeField}
                          validate={[dateTimeFormat, greaterThanStart]}
                          dateFormat="DD.MM.YYYY"
                          timeFormat={false}
                        />
                        <Calendar className={cn('calendar-icon')} />
                      </div>
                    </div>
                </FormGroup>
                  <Field
                    component={SelectInputOptGroups}
                    options={this.getCustomersForSelect()}
                    name={`statement`}
                    searchable={true}
                    noResultsText="Нет данных для выбора."
                    label={'Состояние'}
                  />
                  <Field
                    component={SelectInputOptGroups}
                    options={this.getLegalUnitsForSelect()}
                    name={`typeOfEmployment`}
                    searchable={true}
                    label={'Вид занятости'}
                    noResultsText="Нет данных для выбора."
                  />
                  <Field
                    component={SelectInputOptGroups}
                    options={this.getDictionary('products')}
                    name={`unit`}
                    searchable={true}
                    multi={true}
                    label={'Подразделение'}
                    noResultsText="Нет данных для выбора."
                  />

                <CheckboxField
                  label="Учитывать дубликаты"
                  name={`close_project`}
                  className={cn('nowadays-checkbox')}
                />
              </div>
            </div>

            {/*<button className={'btn btn-primary btn-margin-right'} onClick={() => this.onSubmit()}>применить</button>*/}
            {/*<button className={'btn btn-outline'} onClick={() => this.onRestFilter()}>Сбросить фильтр</button>*/}
          </div>
        )}
      </div>
    )
  }
}
export default reduxForm({
  form: 'Filtered',
})(Filtered)
