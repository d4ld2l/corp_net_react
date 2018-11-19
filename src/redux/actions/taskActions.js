import api from 'api-folder'
import { toastr } from 'react-redux-toastr'
import moment from 'moment/moment'
import { differenceBy } from 'lodash'

moment.locale('ru')


export const resetTasks = () => ({ type: 'RESET_TASKS' })

export const getTasks = (page) => async (dispatch, getState) => {
  dispatch({ type: 'GET_TASKS_REQ' })

  const { perPage, status, scope } = getState().tasks

  const path = getState().router.location.pathname
  const pathItems = path.match(/(\w+)\/(\d+)$/)
  let resourceName, resourceId

  if (pathItems) {
    resourceName = pathItems[1]
    resourceId = pathItems[2]
  }

  try {
    const req = await api.tasks.all(page, perPage, status, scope, resourceName, resourceId)

    dispatch({ type: 'GET_TASKS_RES', payload: req.data, page, resourceName, resourceId })
  } catch (error) {
    dispatch({ type: 'GET_TASKS_FAIL', payload: error.message })
  }
}

export const changeTMStatus = ( status ) => async (dispatch, getState) => {
  dispatch({ type: 'TM_CHANGE_STATUS', payload: status })
  dispatch(getTasks(1))
}

export const changeTMScope = ( scope ) => async (dispatch, getState) => {
  dispatch({ type: 'TM_CHANGE_SCOPE', payload: scope })
  dispatch(getTasks(1))
}

export const updateDoneTask = (task, done) => async (dispatch, getState) => {

  dispatch({ type: 'UPDATE_DONE_TASK_REQ' })
  const params = {
    task: {
      done: done,
    }
  }

  const user = getState().user

  try {
    const req = await api.tasks.update(task.id, params)

    dispatch({ type: 'UPDATE_DONE_TASK_RES', payload: req.data, user })

    if (done) {
      toastr.success('Задача успешно выполнена')
    } else {
      toastr.success('Задача переведена в статус "В работе"')
    }

  } catch (error) {
    dispatch({ type: 'UPDATE_DONE_TASK_FAIL', payload: error.message })
    toastr.error('Не удалось сохранить изменения')
  }
}

export const updateDoneSubTask = (task, subtask) => async (dispatch, getState) => {

  dispatch({ type: 'UPDATE_DONE_SUBTASK_REQ' })
  const params = {
    subtask: {
      done: !subtask.done,
    }
  }
  try {
    const req = await api.subtasks.update(task.id, subtask.id, params)

    dispatch({ type: 'UPDATE_DONE_SUBTASK_RES', payload: req.data })

    if (!subtask.done) {
      toastr.success('Подзадача успешно выполнена')
    } else {
      toastr.success('Подзадача переведена в статус "В работе"')
    }

  } catch (error) {
    dispatch({ type: 'UPDATE_DONE_SUBTASK_FAIL', payload: error.message })
    toastr.error('Не удалось сохранить изменения')
  }
}




export const getTask = (taskId) => async (dispatch, getState) => {

  dispatch({ type: 'GET_TASK_REQ' })

  try {
    dispatch({ type: 'TOGGLE_OPEN_CARD_TASK', payload: true })

    const req = await api.tasks.get(taskId)
    dispatch({ type: 'GET_TASK_RES', payload: req.data })

  } catch (error) {
    dispatch({ type: 'GET_TASK_FAIL', payload: error.message })
  }
}

export const deleteTask = (task) => async (dispatch, getState) => {
  dispatch({ type: 'DELETE_TASK_REQ' })

  const { parent_id, id } = task
  let req

  try {
    if (parent_id) { // subtask
      req = await api.subtasks.delete(parent_id, id)
    } else {
      req = await api.tasks.delete(id)
      dispatch({ type: 'TOGGLE_OPEN_CARD_TASK', payload: false })
    }

    const payload = { data: req.data, id, parent_id, task, user: getState().user }
    dispatch({ type: 'DELETE_TASK_RES', payload: payload })
    if (parent_id){
      toastr.success('Подзадача удалена')
    } else {
      toastr.success('Задача удалена')
    }
  } catch (error) {
    dispatch({ type: 'DELETE_TASK_FAIL', payload: error.message })
    toastr.error('Не удалось удалить задачу')
  }
}









export const getSubtasks = (task_id) => async (dispatch, getState) => {
  dispatch({ type: 'GET_SUBTASKS_REQ' })

  try {
    const req = await api.subtasks.all(task_id)
    const payload = { data: req.data, task_id }
    dispatch({ type: 'GET_SUBTASKS_RES', payload })
    return payload.data
  } catch (error) {
    dispatch({ type: 'GET_SUBTASKS_FAIL', payload: error.message })
  }
}

// export const getTask = (id) => async (dispatch) => {
//   dispatch({ type: 'GET_TASK_REQ' })
//
//   try {
//     const req = await api.tasks.get(id)
//     const payload = { data: req.data }
//     dispatch({ type: 'GET_TASK_RES', payload: payload })
//     // dispatch(setCurrentTask(payload.data))
//   } catch (error) {
//     dispatch({ type: 'GET_TASK_FAIL', payload: error.message })
//   }
// }

const observerParams = (observers, task) => {
  let task_observers = observers || []

  if (task) {
    const deleted = differenceBy(task.task_observers, observers, 'account_id').map(o => ({...o, _destroy: true}))
    task_observers = observers.concat(deleted).map((o) => {
      let existing

      if (!o.id) {
        existing = task.task_observers.find(obs => obs.account_id === o.account_id)
      }

      return {
        id: o.id || existing && existing.id,
        account_id: o.value,
        _destroy: o._destroy
      }
    })
  }

  return task_observers
}

const subtasksParams = (subtasks) => {
  return subtasks && subtasks.filter(t => t.title).map(t => ({
    id: t.id,
    task_id: t.task_id,
    title: t.title,
    executor_id: t.executor && t.executor.value,
    priority: t.priority,
    executed_at: t.executed_at && t.executed_at.format().replace('T00:00', 'T23:59'),
    done: t.done
  }))
}

const taskParams = (values, options = {}) => {
  if (options.only === 'observers') {
    return {
      task: {
        task_observers_attributes: observerParams(values.observers, options.task)
      }
    }
  } else if (options.only === 'subtasks') {
    return {
      task: {
        subtasks_attributes: subtasksParams(values.subtasks)
      }
    }
  }

  const {
    task_id,
    title,
    executor,
    author,
    executed_at_date,
    executed_at_time,
    ends_at_date,
    ends_at_time,
    displayed_in_calendar,
    priority,
    description,
    observers,
    subtasks
  } = values

  if (executed_at_date && executed_at_time) {
    executed_at_date.hour(executed_at_time.hour()).minute(executed_at_time.minutes())
  }

  if (executed_at_date && !executed_at_time) {
    executed_at_date.hour(23).minute(59)
  }

  if (ends_at_date && ends_at_time) {
    ends_at_date.hour(ends_at_time.hour()).minute(ends_at_time.minutes())
  }

  if (ends_at_date && !ends_at_time) {
    ends_at_date.hour(23).minute(59)
  }

  return {
    [task_id ? 'subtask' : 'task']: {
      task_id,
      title,
      author_id: author && author.value,
      executor_id: executor && executor.value,
      executed_at: executed_at_date && executed_at_date.format(),
      ends_at: ends_at_date && ends_at_date.format(),
      displayed_in_calendar,
      priority,
      description,
      task_observers_attributes: observerParams(observers, options.task),
      subtasks_attributes: subtasksParams(subtasks)
    }
  }
}

export const createTask = () => async (dispatch, getState) => {
  dispatch({ type: 'CREATE_TASK_REQ' })

  const values = getState().form.Task.values
  const user = getState().user

  const path = getState().router.location.pathname
  const pathItems = path.match(/(\w+)\/(\d+)$/)
  let resourceName, resourceId

  if (pathItems) {
    resourceName = pathItems[1]
    resourceId = pathItems[2]
  }

  try {
    const req = await api.tasks.create(taskParams(values), resourceName, resourceId)
    const payload = { data: req.data, user }
    payload.data.subtasks = payload.data.subtasks_available_to_user
    dispatch({ type: 'CREATE_TASK_RES', payload: payload })
    // dispatch(setCurrentTask(payload.data))
    toastr.success('Задача успешно создана')
    return payload.data
  } catch (error) {
    dispatch({ type: 'CREATE_TASK_FAIL', payload: error.message })
    toastr.error('Не удалось создать задачу')
  }
}

export const updateTask = (task, options = {}) => async (dispatch, getState) => {
  let params, req
  const { parent_id, id } = task

  dispatch({ type: 'UPDATE_TASK_REQ' })

  if (options.done === undefined) {
    const values = getState().form.Task.values
    params = taskParams(values, { ...options, task })
  } else {
    params = {
      [parent_id ? 'subtask' : 'task']: {
        done: options.done
      }
    }
  }

  try {
    if (parent_id) { // subtask
      req = await api.subtasks.update(parent_id, id, params)
    } else {
      req = await api.tasks.update(id, params)
    }

    const payload = { data: req.data, user: getState().user }
    payload.data.subtasks = payload.data.subtasks_available_to_user
    dispatch({ type: 'UPDATE_TASK_RES', payload: payload })

    if ('done' in options) {
      toastr.success('Задача успешно выполнена')
    } else {
      toastr.success('Изменения успешно сохранены')
    }

    return payload.data
  } catch (error) {
    dispatch({ type: 'UPDATE_TASK_FAIL', payload: error.message })
    toastr.error('Не удалось сохранить изменения')
  }
}




export const searchTasks = (query, { loadMore } = {}) => async (dispatch, getState) => {
  dispatch({ type: 'SEARCH_TASKS_REQ', loadMore })

  const currentPage = getState().tasks.page
  const { perPage } = getState().tasks
  const size = getState().tasks.data.length

  query = query || getState().tasks.search.query

  try {
    // if last page has less items than perPage -> request it again
    const page = loadMore && (size % perPage === 0) ? currentPage + 1 : currentPage

    const req = await api.tasks.search(query, page, perPage)
    const payload = {data: req.data.tasks, query, page, loadMore }

    dispatch({ type: 'SEARCH_TASKS_RES', payload })
  } catch (error) {
    dispatch({ type: 'SEARCH_TASKS_FAIL', payload: error.message })
  }
}
