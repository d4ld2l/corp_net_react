import { connect } from 'react-redux'
import path from 'ramda/src/pathOr'
import { logoutUser } from '../../../redux/actions/loginActions'
import Container from './Notification/Container'

const mapStateToProps = state => {
  return {
    state,
    isAuthenticated: state.user.isAuthenticated,
    name: path('Name', ['user', 'name'], state),
    middlename: path('Middlename', ['user', 'middlename'], state),
    surname: path('Surname', ['user', 'surname'], state),
    email: state.user.email,
    avatar: path(false, ['user', 'photo', 'url'], state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  }
}

const Header = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Header
