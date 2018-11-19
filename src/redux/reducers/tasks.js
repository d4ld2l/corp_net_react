// import { createSelector } from 'reselect'

const initialState = {
  data: [],
  page: 1,
  perPage: 25,
  scroll: true,
  search: {
    data: [],
    query: '',
  },
  resourceName: null,
  resourceId: null,
  status: 'in_progress',
  scope: 'available_to_me',
  count: {},
  openCard: false,
  current: {},
  parent: null,
  openForm: false,
  edit: false,
}

// const taskList = state => state.tasks.data
// const currentUser = state => state.user

// const visibleTasks = createSelector(
//   [taskList, currentUser],
//   (tasks, user) =>
//     tasks.filter(t => t.author_id === user.id || t.executor_id === user.id ||
//                       t.task_observers && t.task_observers.map(o => o.profile.id).includes(user.id))
// )

// export const doneTasks = createSelector([visibleTasks], tasks => tasks.filter(t => t.done))
// export const undoneTasks = createSelector([visibleTasks], tasks => tasks.filter(t => !t.done))
//
// export const assignedTasks = createSelector([visibleTasks, currentUser], (tasks, user) => tasks.filter(t => t.executor_id === user.id))
// export const createdTasks = createSelector([visibleTasks, currentUser], (tasks, user) => tasks.filter(t => t.author_id === user.id))
//
// export const doneAssignedTasks = createSelector([doneTasks, currentUser], (tasks, user) => tasks.filter(t => t.executor_id === user.id))
// export const undoneAssignedTasks = createSelector([undoneTasks, currentUser], (tasks, user) => tasks.filter(t => t.executor_id === user.id))
// export const doneCreatedTasks = createSelector([doneTasks, currentUser], (tasks, user) => tasks.filter(t => t.author_id === user.id))
// export const undoneCreatedTasks = createSelector([undoneTasks, currentUser], (tasks, user) => tasks.filter(t => t.author_id === user.id))


export default (state = initialState, action) => {
  const { type, payload } = action
  let newCount = state.count
  let newState

  switch (type) {
    case 'RESET_TASKS':
      return initialState
    case 'GET_TASKS_RES':
      return {
        ...state,
        resourceName: action.resourceName,
        resourceId: action.resourceId,
        data: (action.page === 1 || action.resourceName !== state.resourceName || action.resourceId !== state.resourceId) ? payload.tasks : [...state.data, ...payload.tasks],
        scroll: payload.tasks.length === state.perPage,
        page: action.page + 1,
        count: payload.count,
      }
    case 'TM_CHANGE_STATUS':
      return {
        ...state,
        status: action.payload,
        scope: 'available_to_me',
        openCard: false,
        openForm: state.edit ? state.openForm : false,
      }
    case 'TM_CHANGE_SCOPE':
      return{
        ...state,
        scope: action.payload,
        openCard: false,
        openForm: state.edit ? state.openForm : false,
      }
    case 'TOGGLE_OPEN_CARD_TASK':
      return {
        ...state,
        openCard: action.payload,
        openForm: false,
      }
    case 'TOGGLE_OPEN_FORM_TASK':
      return {
        ...state,
        openForm: !state.openForm,
        openCard: state.edit ? true : false, // back to card from editing
        edit: false,
        current: state.parent ? state.parent : state.current,
        parent: null,
      }
    case 'OPEN_SUBTASK_CARD':
      return {
        ...state,
        parent: action.payload.current,
        current: action.payload.subtask,
      }
    case 'CLOSE_SUBTASK_CARD':
      return {
        ...state,
        current: action.payload,
        parent: null,
      }
    case 'GET_TASK_RES':
      return {
        ...state,
        current: action.payload,
      }
    case 'CREATE_TASK_RES':
      ++newCount.in_progress.available_to_me
      ++newCount.in_progress.created_by_me

      if (payload.data.executor_id === payload.user.id){
        ++newCount.in_progress.executed_by_me
      }

      return {
        ...state,
        data: (state.status === 'in_progress' && state.scope !== 'executed_by_me') ? [...state.data, payload.data] : state.data,
        current: payload.data,
        edit: false,
        openForm: false,
        openCard: true,
        count: newCount,
      }
    case 'TOGGLE_EDIT_TASK':
      return {
        ...state,
        ...action.payload,
      }
    case 'UPDATE_TASK_RES':

      if (!payload.data.parent_id) {
        // проверка, что текущий юзер стал ответственным или перестал им быть
        if (state.current.executor_id !== payload.user.id && payload.data.executor_id === payload.user.id) {
          ++newCount[state.status].executed_by_me
        } else {
          --newCount[state.status].executed_by_me
        }
      }

      if (payload.data.parent_id) {
        return {
          ...state,
          current: payload.data,
          parent: {
            ...state.parent,
            subtasks_available_to_account: state.parent.subtasks_available_to_account.map(sub => sub.id === action.payload.data.id ? action.payload.data : sub)
          },
          edit: false,
          openForm: false,
          openCard: true,
          count: newCount
        }
      } else {
        return {
          ...state,
          data: state.data.map(task => task.id === payload.data.id ? payload.data : task),
          current: payload.data,
          edit: false,
          openForm: false,
          openCard: true,
          count: newCount
        }
      }
    case 'UPDATE_DONE_TASK_RES':
      if (payload.done) {
        --newCount.in_progress.available_to_me
        ++newCount.finished.available_to_me

        if (payload.author_id === action.user.id){
          --newCount.in_progress.created_by_me
        }

        if (payload.executor_id === action.user.id) {
          --newCount.in_progress.executed_by_me
        }
      } else {
        --newCount.finished.available_to_me
        ++newCount.in_progress.available_to_me

        if (payload.author_id === action.user.id){
          --newCount.finished.created_by_me
        }

        if (payload.executor_id === action.user.id) {
          --newCount.finished.executed_by_me
        }
      }

      return {
        ...state,
        data: state.data.map(task => task.id === payload.id ? payload : task),
        current: state.openCard ? payload : state.current,
        count: newCount,
      }
    case 'UPDATE_DONE_SUBTASK_RES':
      newState = {
        ...state,
        data: state.data.map(t => {
          if (t.id === payload.parent_id) {
            payload.done ? ++t.executed_subtasks_count : --t.executed_subtasks_count
          }
          return t
        }),
        current: state.parent ? payload : {
          ...state.current,
          subtasks_available_to_account: state.current.subtasks_available_to_account.map(sub => sub.id === payload.id ? payload : sub)
        },
      }

      if (state.parent) {
        newState.parent = {
          ...state.parent,
          subtasks_available_to_account: state.parent.subtasks_available_to_account.map(sub => sub.id === payload.id ? payload : sub)
        }
      }

      return newState
    case 'TM_TOGGLE_TASK':
      return {
        ...state,
        data: state.data.filter(task => task.id !== payload.id),
        openCard: false,
        current: {},
        count: newCount,
      }
    case 'DELETE_TASK_RES':
      if (payload.parent_id) {
        return {
          ...state,
          current: {
            ...state.parent,
            subtasks_available_to_account: state.parent.subtasks_available_to_account.filter(sub => sub.id !== payload.id)
          },
          parent: null,
          data: state.data.map(t => {
            if (t.id === payload.parent_id) {
              --t.total_subtasks_count && payload.done && --t.executed_subtasks_count
            }
            return t
          })
        }
      } else {
        --newCount[state.status].available_to_me

        if (payload.task.author_id === payload.user.id){
          --newCount[state.status].created_by_me
        }

        if (payload.task.executor_id === payload.user.id) {
          --newCount[state.status].executed_by_me
        }

        return {
          ...state,
          data: state.data.filter(task => task.id !== payload.id),
          count: newCount
        }
      }
    default:
      return state
  }
}
