import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import SelectInput from '../Form/SelectInput'
import BootstrapTextarea from '../Form/BootstrapTextarea'

const connector = connect(
  state => ({
    employees: state.employees.data.map(emp => ({ label: emp.full_name, value: emp.id })),
  }),
  {}
)

class SelectorEmployeesForm extends Component {
  render() {
    const { employees } = this.props

    return (
      <div>
        <Field
          name="full_name"
          component={SelectInput}
          type="text"
          label="Укажите сотрудника"
          options={employees}
        />

        <Field name="comment" component={BootstrapTextarea} type="text" label="Комментарий" />
      </div>
    )
  }
}

export default connector(SelectorEmployeesForm)
