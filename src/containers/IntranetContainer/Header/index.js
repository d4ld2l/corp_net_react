import { connect } from 'react-redux'
import path from 'ramda/src/pathOr'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const Header = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Header
