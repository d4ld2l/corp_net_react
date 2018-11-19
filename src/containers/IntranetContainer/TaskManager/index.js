import { connect } from 'react-redux'
import Container from './Container'


const mapStateToProps = state => {
  return {
    state,
    data: state.tasks.data,
    // page: state.tasks.page,
    // scroll: state.tasks.scroll,
    status: state.tasks.status,
    scope: state.tasks.scope,
    count: state.tasks.count,
    // openCard: state.tasks.openCard,
    // openForm: state.tasks.openForm,
    // current: state.tasks.current,
    // // currentId: state.tasks.currentId,
    edit: state.tasks.edit,
    parent: state.tasks.parent,

    tasksLoading: state.loaders.tasks,
    taskLoading: state.loaders.task,
    taskFormLoading: state.loaders.taskFormLoading,
    system: state.system,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

const TaskManager = connect(mapStateToProps, mapDispatchToProps)(Container)

export default TaskManager

