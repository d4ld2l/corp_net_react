import { connect } from 'react-redux'
import { loginUser, generateNewPassword, resetNewPassword } from '../../redux/actions/loginActions'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    pathname: state.router.location.pathname,
    isAuthenticated: state.user.isAuthenticated,
    isSignin: state.user.isSignin,
    loaders: state.loaders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    loginUser: credentials => dispatch(loginUser(credentials)),
    generateNewPassword: credentials => dispatch(generateNewPassword(credentials)),
    resetNewPassword: credentials => dispatch(resetNewPassword(credentials)),
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default LoginContainer
