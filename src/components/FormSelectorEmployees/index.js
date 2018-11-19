import { connect } from 'react-redux'
import Container from './Container'

import path from 'ramda/src/pathOr'

import {
  openSelectorEmployeesModal,
  closeSelectorEmployeesModal,
  addSelectorEmployees,
} from '../../redux/actions/recruiterActions'

const mapStateToProps = state => {
  return {
    state,
    // open: state.recruiter.newRequest.openSelectorEmployeesModal,
    // employees: state.recruiter.newRequest.employees,
    // full_name: path('', ['form', 'selectorEmployeesForm', 'values', 'full_name'], state),
    // comment: path('', ['form', 'selectorEmployeesForm', 'values', 'comment'], state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    // openModal: () => dispatch(openSelectorEmployeesModal()),
    // closeModal: () => dispatch(closeSelectorEmployeesModal()),
    // addEmployees: (payload) => dispatch(addSelectorEmployees(payload)),
  }
}

const FormSelectorEmployees = connect(mapStateToProps, mapDispatchToProps)(Container)

export default FormSelectorEmployees
