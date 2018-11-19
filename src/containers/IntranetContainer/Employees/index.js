import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from "components-folder/Loader";
import Profiles from './Profiles'
import ProfilesHr from './ProfilesHr'

const mapStateToProps = state => {
  return {
    role: state.role,
    enabledComponents: state.system.enabledComponents,
  }
}

class employeesRouter extends Component {
  render(){
    const { role, enabledComponents } = this.props

    if (Object.keys(role).length === 0 && enabledComponents.shr_personnel) return <Loader/>

    if (role.stuff_info && enabledComponents.shr_personnel){
      return <ProfilesHr/>
    } else {
      return <Profiles/>
    }
  }
}


const Employees = connect(mapStateToProps)(employeesRouter)

export default Employees
