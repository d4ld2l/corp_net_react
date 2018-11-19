import { connect } from 'react-redux'
import EditEvent from './EditEvent'

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

const ContainerEditEvent = connect(mapStateToProps, mapDispatchToProps)(EditEvent)

export default ContainerEditEvent
