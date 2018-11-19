import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    data: state.news.data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const Employee = connect(mapStateToProps, mapDispatchToProps)(Container)

export default Employee
