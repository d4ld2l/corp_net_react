import { connect } from 'react-redux'
import Container from './Container'
import { changePassword } from '../../../redux/actions/loginActions'

const mapStateToProps = state => {
  return {
    state,
    loaders: state.loaders,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    changePassword: credentials => dispatch(changePassword(credentials)),
  }
}

const Settings = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Settings
