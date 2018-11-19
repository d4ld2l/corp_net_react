import { connect } from 'react-redux'
import path from 'ramda/src/pathOr'
import Container from './Container'

const mapStateToProps = state => {
  return {
    ...state.myVacancies,
    loaders: state.loaders,
    system: state.system,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default MainContainer
