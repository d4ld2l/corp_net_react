import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    loaders: state.loaders,
    employees: state.employees.data,
    legal_units: state.legal_units,
    departments: state.departments,
    customers: state.customers,
    project: state.projectsData.current,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const NewProject = connect(mapStateToProps, mapDispatchToProps)(Container)

export default NewProject
