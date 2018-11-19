import React, { Component } from 'react'

import { Arrow, Calendar } from 'components-folder/Icon'
import SelectInputOptGroups from 'components-folder/Form/SelectInputOptGroups'
import { Field, reduxForm } from 'redux-form'
import DateTimeField from 'components-folder/Form/DateTimeFIeld'
import CheckboxField from 'components-folder/Form/CheckboxField'
import { ControlLabel, FormGroup } from 'react-bootstrap'
import { v4 } from 'uuid'
import { setFilter, toggleFilter } from "../../../redux/actions/projectsDataActions";
import {dateTimeFormat, greaterThanStart} from "../../../lib/validation";
import ReactDOM from "react-dom";

const cn = require('bem-cn')('projects')
if (process.env.BROWSER) {
  require('./style.css')
}

class Filtered extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.defaultOpen,
    }
  }

  componentDidMount(){
    const { filter, initialize } = this.props
    initialize({
      ...filter,
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

  getDepartmentForSelect = () => {
    const { departments } = this.props
    return departments.map(it => ({
      label: it.name_ru,
      value: it.id,
    }))
  }

  getDictionary = dictionary => {
    const { methodologies, products, technologies } = this.props
    switch (dictionary) {
      case 'methodologies':
        return (
          methodologies &&
          methodologies.map(it => ({
            label: it.name,
            value: it.id,
          }))
        )
      case 'products':
        return (
          products &&
          products.map(it => ({
            label: it.name,
            value: it.id,
          }))
        )
      case 'technologies':
        return (
          technologies &&
          technologies.map(it => ({
            label: it.name,
            value: it.id,
          }))
        )
    }
  }

  openCollapse = () => {
    const { dispatch, filterOpen } = this.props
    dispatch(toggleFilter(!filterOpen))
  }

  onSubmit() {
    const { dispatch, activeTabMy } = this.props
    if (!ReactDOM.findDOMNode(this).getElementsByClassName('form-group__error')[0]) {
      dispatch(setFilter(activeTabMy))
    }
  }

  onRestFilter() {
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
          <h3 className={cn('collapse-head-label').mix('fw_400')}>Фильтр</h3>
          {/*<div className={cn('filtered-wrapper-mark')}>*/}
          {/*{[0, 1, 2].map(() => (*/}
          {/*<span className={'select__mark'} key={v4()}>*/}
          {/*текс текс*/}
          {/*<span className={'select__mark-delete'}>×</span>*/}
          {/*</span>*/}
          {/*))}*/}
          {/*</div>*/}
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
                {/*<Field*/}
                {/*component={SelectInputOptGroups}*/}
                {/*options={optionsCustomer}*/}
                {/*label={'Заказчик'}*/}
                {/*name="customer"*/}
                {/*multi={true}*/}
                {/*/>*/}
                <Field
                  component={SelectInputOptGroups}
                  options={this.getCustomersForSelect()}
                  name={`customer`}
                  searchable={true}
                  noResultsText="Нет данных для выбора."
                  label={'Название организации'}
                />
                {/*<Field*/}
                {/*component={SelectInputOptGroups}*/}
                {/*options={optionsCustomer}*/}
                {/*label={'Юридическое лицо'}*/}
                {/*name="legal_entity"*/}
                {/*multi={true}*/}
                {/*/>*/}
                <Field
                  component={SelectInputOptGroups}
                  options={this.getLegalUnitsForSelect()}
                  name={`legalUnit`}
                  searchable={true}
                  label={'Юридическое лицо'}
                  noResultsText="Нет данных для выбора."
                />
                {/*<Field*/}
                {/*component={SelectInputOptGroups}*/}
                {/*options={optionsCustomer}*/}
                {/*label={'Подразделение'}*/}
                {/*name="unit"*/}
                {/*multi={true}*/}
                {/*/>*/}
                <Field
                  component={SelectInputOptGroups}
                  options={this.getDepartmentForSelect()}
                  searchable={true}
                  name={`department`}
                  multi={true}
                  label={'Подразделение'}
                  noResultsText="Нет подрезделений в выбраном юр. лице"
                />
                <Field
                  component={SelectInputOptGroups}
                  options={this.getEmployeesForSelect()}
                  name={`manager`}
                  searchable={true}
                  label={'Менеджер'}
                  noResultsText="Нет данных для выбора."
                />
                {/*<Field*/}
                {/*component={SelectInputOptGroups}*/}
                {/*options={optionsCustomer}*/}
                {/*label={'Менеджер'}*/}
                {/*name="manager"*/}
                {/*multi={true}*/}
                {/*/>*/}
                <CheckboxField
                  label="Поиск по закрытым проектам"
                  name={`close_project`}
                  className={cn('nowadays-checkbox')}
                />
              </div>
              <div
                className={cn('filtered-body-wrapper-elem').mix(
                  cn('filtered-body-wrapper-elem_margin')
                )}
              >
                <FormGroup>
                  <Field
                    component={SelectInputOptGroups}
                    options={this.getDictionary('products')}
                    name={`product_list`}
                    searchable={true}
                    multi={true}
                    label={'Продукты'}
                    noResultsText="Нет данных для выбора."
                  />
                  <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>
                    Например: Siebel CRM
                  </p>
                </FormGroup>
                <FormGroup>
                  <Field
                    component={SelectInputOptGroups}
                    options={this.getDictionary('methodologies')}
                    name={`methodology_list`}
                    searchable={true}
                    multi={true}
                    label={'Методологии'}
                    noResultsText="Нет данных для выбора."
                  />
                  <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>
                    Например: Agile, Scrum, Waterfall
                  </p>
                </FormGroup>
                <FormGroup>
                  <Field
                    component={SelectInputOptGroups}
                    options={this.getDictionary('technologies')}
                    name={`technology_list`}
                    searchable={true}
                    multi={true}
                    label={'Технологии'}
                    noResultsText="Нет данных для выбора."
                  />
                  <p className={cn('info-msg').mix('p2 p2_theme_light_second')}>
                    Например: React Native, AngularJS, NPM
                  </p>
                </FormGroup>
                {/*<FormGroup>*/}
                {/*<Field label={'Продукты'} name="product_list" component={SkillsFIeldProfile} />*/}
                {/*<p className={cn('info-msg')}>Например: Siebel CRM</p>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*<Field label={'Методологии'} name="methodology_list" component={SkillsFIeldProfile} />*/}
                {/*<p className={cn('info-msg')}>Например: Agile, Scrum, Waterfall</p>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*<Field label={'Технологии'} name="technology_list" component={SkillsFIeldProfile} />*/}
                {/*<p className={cn('info-msg')}>Например: React Native, AngularJS, NPM</p>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*<Field*/}
                {/*component={SelectInputOptGroups}*/}
                {/*options={optionsCustomer}*/}
                {/*name={`products`}*/}
                {/*label={'Продукты'}*/}
                {/*multi={true}*/}
                {/*/>*/}
                {/*<p className={cn('info-msg')}>Укажите место работы и должность</p>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*<Field*/}
                {/*component={SelectInputOptGroups}*/}
                {/*options={optionsCustomer}*/}
                {/*name={`methodology`}*/}
                {/*label={'Методологии'}*/}
                {/*multi={true}*/}
                {/*/>*/}
                {/*<p className={cn('info-msg')}>Укажите место работы и должность</p>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*<Field*/}
                {/*component={SelectInputOptGroups}*/}
                {/*options={optionsCustomer}*/}
                {/*name={`technology`}*/}
                {/*label={'Технологии'}*/}
                {/*multi={true}*/}
                {/*/>*/}
                {/*<p className={cn('info-msg')}>Укажите место работы и должность</p>*/}
                {/*</FormGroup>*/}
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
                        timeFormat={false}
                      />
                      <Calendar className={cn('calendar-icon')} />
                    </div>
                  </div>
                </FormGroup>
              </div>
            </div>
            <button className={'btn btn-primary btn-margin-right'} onClick={() => this.onSubmit()}>
              применить
            </button>
            <button className={'btn btn-outline'} onClick={() => this.onRestFilter()}>
              Сбросить фильтр
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default reduxForm({
  form: 'Filtered',
})(Filtered)
