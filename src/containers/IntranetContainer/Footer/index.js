import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const Footer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Footer
