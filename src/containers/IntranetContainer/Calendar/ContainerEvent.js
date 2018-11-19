import { connect } from 'react-redux'
import Event from './Event'

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

const ContainerEvent = connect(mapStateToProps, mapDispatchToProps)(Event)

export default ContainerEvent
