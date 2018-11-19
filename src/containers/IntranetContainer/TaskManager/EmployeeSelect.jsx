import React, { Component } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import SelectInput from 'components-folder/Form/SelectInput'

const cn = require('bem-cn')('task-card')

const connector = connect(
  state => ({
    dictionaries: state.dictionaries
  })
)

class EmployeeSelect extends Component {
  get employeesForSelect() {
    return this.props.dictionaries.accounts.map(u => ({
      label: u.full_name,
      value: u.id,
      account_id: u.id,
      avatar: u.photo_url,
    })).sort((u1, u2) => u1.label.localeCompare(u2.label))
  }

  renderSelectOption = (option) => (
    <span>
      <img src={option.avatar} className={cn('select-avatar')} />
      <span>{option.label}</span>
    </span>
  )

  renderSelectValue = (option) => (
    <span>
      <img src={option.avatar || '/public/avatar.png'} className={cn('select-avatar')} />
      <span>{option.label}</span>
    </span>
  )

  onChangeSubmit = async (event, newValue, previousValue) => {
    const { task, updateTask } = this.props
    const data = await updateTask(task, { only: 'observers' })
  }

  render() {
    const { name, label, validate, multi, submitOnChange } = this.props

    return (
      <Field
        component={SelectInput}
        options={this.employeesForSelect}
        valueRenderer={this.renderSelectValue}
        optionRenderer={this.renderSelectOption}
        searchable={true}
        name={name}
        multi={multi}
        label={label}
        noResultsText="Нет подходящих сотрудников"
        validate={validate}
        afterChange={submitOnChange && this.onChangeSubmit}
      />
    )
  }

}

export default connector(EmployeeSelect)
