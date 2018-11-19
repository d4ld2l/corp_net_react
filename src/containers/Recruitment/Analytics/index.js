import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    loaders: state.loaders,
    candidates: state.candidates,
    analytics: state.analytics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const Analytics = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Analytics
