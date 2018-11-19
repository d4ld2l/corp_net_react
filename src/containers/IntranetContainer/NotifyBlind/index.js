import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Container from './Container'
import { get } from 'lodash'

import { actions as topicsActions } from 'redux-folder/ducks/topics'
import { resetTasks, getTasks } from 'redux-folder/actions/taskActions'
import { getDictionaryAccounts } from 'redux-folder/actions/dictionariesActions'

const mapStateToProps = state => {
  return {
    state,
    enabledComponents: state.system.enabledComponents,
    loaders: state.loaders,
    isShow: state.notifyBlind.isShow,
    showSearch: state.notifyBlind.showSearch,
    showFilters: state.notifyBlind.showFilters,
    // isNoteCard: state.notifyBlind.isNoteCard,
    // isTaskCard: state.notifyBlind.isTaskCard,
    // isSubtaskCard: state.notifyBlind.isSubtaskCard,
    // isFavorites: state.notifyBlind.isFavorites,
    // isParticipants: state.notifyBlind.isParticipants,
    // isLikeNote: state.notifyBlind.isLikeNote,
    // isLikeComment: state.notifyBlind.isLikeComment,
    // isCreateDiscussion: state.notifyBlind.isCreateDiscussion,
    // isCreateTask: state.notifyBlind.isCreateTask,
    data: state.news.data,
    tab: state.notifyBlind.tab,
    view: state.notifyBlind.view,
    tasks: state.tasks.data,
    // tasksCount: state.tasks.count,
    openTaskCard: state.tasks.openCard,
    openTaskForm: state.tasks.openForm,
    pathname: state.router.location.pathname,
    topics: state.topics,
    user: get(state, `user`, {}),
    accounts: get(state, `dictionaries.accounts`, []),
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      resetTasks,
      getTasks,
      getDictionaryAccounts,
    },
    dispatch
  ),
  ...bindActionCreators(topicsActions, dispatch),
  toggleTaskForm: () => dispatch({ type: 'TOGGLE_OPEN_FORM_TASK' }),
  dispatch, // pass dispatch
})

const NotifyBlind = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)

export default NotifyBlind
