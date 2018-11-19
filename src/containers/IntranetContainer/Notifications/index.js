import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    loaders: state.loaders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const Notifications = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Notifications
