import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import { get } from 'lodash'
import SelectInput from '../Form/SelectInput'
import BootstrapTextarea from '../Form/BootstrapTextarea'
import { Trash, Plus } from '../Icon'

const cn = require('bem-cn')('form-selector-employees')
if (process.env.BROWSER) {
  require('./SelectorEmployees.css')
}

const connector = connect(function(state){
  const selectedEmployeesIds = get(state, 'form.createVacancyChangeFullForm.values.account_vacancies_attributes', [])
    .filter(it => it.full_name)
    .map(it => it.full_name.value)
  return ({
    employees: state.employees.data
      .filter(emp => !(selectedEmployeesIds.includes(emp.id)))
      .map(emp => ({
        label: emp.full_name,
        value: emp.id,
      }))
      .sort((emp1, emp2) => emp1.label.localeCompare(emp2.label)),
  })
})

class SelectorEmployees extends Component {
  customField = (member, index, fields) => (
    <div className={cn('row')} key={index}>
      <div className={cn('input')}>
        <Field
          name={`${member}.full_name`}
          component={SelectInput}
          placeholder="Добавить сотрудника"
          options={this.props.employees}
          searchable={true}
        />
      </div>
      {index !== fields.length - 1 ?
      <div className={cn('icon').mix('cur')} onClick={() => fields.remove(index)}>
        <Trash className={cn('icon-trash').mix('icon')} />
      </div> :
      <div className={cn('add-card').mix('cur')} onClick={() => fields.push({})}>
        <Plus outline={30} className={cn('plus-icon')} />
      </div>}
      {/*<div className={cn('input')}>*/}
        {/*<Field name={`${member}.comment`} component={BootstrapTextarea} label="Комментарий" />*/}
      {/*</div>*/}
    </div>
  )

  render() {
    const { fields, meta: { touched, error } } = this.props

    return (
      <div className={cn}>
        {fields.map(this.customField)}
        <div>{touched && error && <p className="error">{error}</p>}</div>
      </div>
    )
  }
}

export default connector(SelectorEmployees)
