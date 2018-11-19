import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    loaders: state.loaders,
    project: state.projectsData.current,
    user: state.user,
    profilesProject: state.profilesProject,
    currentProfileProject: state.profilesProject.currentProfileProject,
    employees: state.employees.data,
    enabledComponents: state.system.enabledComponents,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const Project = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Project
