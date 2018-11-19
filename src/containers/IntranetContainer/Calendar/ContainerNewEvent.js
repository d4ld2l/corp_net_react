import { connect } from 'react-redux'
import NewEvent from './NewEvent'

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

const ContainerNewEvent = connect(mapStateToProps, mapDispatchToProps)(NewEvent)

export default ContainerNewEvent
