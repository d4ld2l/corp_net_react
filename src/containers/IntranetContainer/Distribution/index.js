import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    data: state.distribution.data,
    loader: state.loaders.distribution,
    personalGroups: state.distribution.personalGroups,
    availableGroups: state.distribution.availableGroups,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const Distribution = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Distribution
