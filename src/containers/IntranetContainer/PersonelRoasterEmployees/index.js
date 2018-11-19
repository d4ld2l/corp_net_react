import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    loaders: state.loaders,
    user: state.user,
    projectsData: state.projectsData,
    data: state.projectsData.data,
    page: state.projectsData.page,
    activeTabMy: state.projectsData.activeTabMy,
    projectsAllCount: state.projectsData.projectsAllCount,
    projectsMyCount: state.projectsData.projectsMyCount,
    scroll: state.projectsData.scroll,
    filter: state.projectsData.filter,
    filterOpen: state.projectsData.filterOpen,
    legal_units: state.legal_units,
    departments: state.departments,
    customers: state.customers,
    project: state.projectsData.current,
    employees: state.employees.data,
    methodologies: state.projectsData.methodologies,
    products: state.projectsData.products,
    technologies: state.projectsData.technologies,
    searchParams: state.projectsData.searchParams,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const PesonalRoasterEmployees = connect(mapStateToProps, mapDispatchToProps)(Container)

export default PesonalRoasterEmployees
