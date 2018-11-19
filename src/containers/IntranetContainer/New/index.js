import { connect } from 'react-redux'
import Container from './Container'

const mapStateToProps = state => {
  return {
    state,
    data: state.news.data,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const New = connect(mapStateToProps, mapDispatchToProps)(Container)

export default New
