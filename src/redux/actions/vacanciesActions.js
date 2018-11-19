import path from 'ramda/src/pathOr'
import moment from 'moment'

import { toastr } from 'react-redux-toastr'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

import api from 'api-folder'
import type { Dispatch, ThunkAction } from 'types-folder/actions'
import { isEqual, get } from 'lodash'

function arrayToObject(arr, object) {
  arr.forEach(item => {
    object[item.value] = false
  })
  return object
}

export const createVacancy = ({ state, status }): ThunkAction => async (dispatch: Dispatch) => {
  const values = {
    ...path({}, ['createVacancyChangeFullForm', 'values'], state.form),
    ...path({}, ['createVacancyChangeInfoForm', 'values'], state.form),
  }

  // const employees = path([], ['recruiter', 'newRequest', 'employees'], state)

  if (values.ends_at) values.ends_at = moment(values.ends_at).format()
  if (values.type_of_salary) values.type_of_salary = values.type_of_salary.value
  if (values.type_of_contract) values.type_of_contract = values.type_of_contract.value
  if (values.creator_id) values.creator_id = values.creator_id.value
  if (values.owner_id) values.owner_id = values.owner_id.value
  if (values.account_vacancies_attributes && typeof values.account_vacancies_attributes[0] !== 'string') {
    values.account_vacancies_attributes = values.account_vacancies_attributes
      .filter(acc => (acc.full_name))
      .map(acc => ({
          full_name: acc.full_name.label,
          account_id: acc.full_name.value,
          comment: acc.comment,
        })
      )
  }
  if (values.level_of_salary_from && typeof values.level_of_salary_from === 'string') {
    values.level_of_salary_from = Number(values.level_of_salary_from.replace(/ /, ''))
  }
  if (values.level_of_salary_to && typeof values.level_of_salary_to === 'string') {
    values.level_of_salary_to = Number(values.level_of_salary_to.replace(/ /, ''))
  }

  dispatch({ type: 'CREATE_VACANCY_REQ' })

  try {
    const vacancy = { ...values, status }

    if (state.recruiter.newRequest.currentMilestonesTemplate) {
      const milestones = state.recruiter.newRequest.milestones.map((e, i) => {
        const element = e
        delete element.id
        delete element.active
        return { ...element, position: i + 1 }
      })

      vacancy.vacancy_stages_attributes = milestones
    }
    const req = await api.vacancies.findBy({ vacancy })
    await dispatch({ type: 'CREATE_VACANCY_RES', payload: req.data })
    if(req.data.status === 'new') {
      toastr.success('Заявка успешно отправлена')
    } else {
      toastr.success('Вакансия успешно создана')
    }
    await dispatch(getVacancies())
    await dispatch(push(`/recruitment/vacancies/${req.data.id}`))
  } catch (error) {
    dispatch({ type: 'CREATE_VACANCY_FAIL', payload: error.message })
  }
}

export const updateVacancy = ({ state, status }): ThunkAction => async (dispatch: Dispatch) => {
  const documents = state.vacancies.current.documents.map(item => {
    return {
      id: item.id,
      name: item.name,
      file: item.file.url,
    }
  })
  const filteredDocuments = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(nw => isEqual(old, nw))
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el) result.push({ ...el, id: old.id })
    })
    newArr.forEach(nw => {
      const el = oldArr.find(old => isEqual(old, nw))
      if (!el) result.push(nw)
    })
    return result
  }
  const values = {
    ...path({}, ['createVacancyChangeFullForm', 'values'], state.form),
    ...path({}, ['createVacancyChangeInfoForm', 'values'], state.form),
  }

  // const employees = path([], ['recruiter', 'newRequest', 'employees'], state)

  if (values.ends_at) values.ends_at = moment(values.ends_at).format()
  if (values.type_of_salary) values.type_of_salary = values.type_of_salary.value
  if (values.type_of_contract) values.type_of_contract = values.type_of_contract.value
  if (values.creator_id) values.creator_id = values.creator_id.value
  if (values.owner_id) values.owner_id = values.owner_id.value
  if (values.account_vacancies_attributes && typeof values.account_vacancies_attributes[0] !== 'string') {
    values.account_vacancies_attributes = values.account_vacancies_attributes.map(acc => {
      return {
        full_name: acc.full_name ? acc.full_name.label : '',
        account_id: acc.full_name ? acc.full_name.value : '',
        comment: acc.comment,
      }
    })
  }
  if (values.level_of_salary_from && typeof values.level_of_salary_from === 'string') {
    values.level_of_salary_from = Number(values.level_of_salary_from.replace(/ /, ''))
  }
  if (values.level_of_salary_to && typeof values.level_of_salary_to === 'string') {
    values.level_of_salary_to = Number(values.level_of_salary_to.replace(/ /, ''))
  }

  dispatch({ type: 'UPDATE_VACANCY_REQ' })

  try {
    let vacancy = {}

    if (values.documents_attributes) {
      vacancy = {
        ...values,
        status,
        documents_attributes: filteredDocuments(documents, values.documents_attributes),
      }
    } else {
      vacancy = { ...values, status }
    }

    if (state.recruiter.newRequest.currentMilestonesTemplate) {
      const milestones = state.recruiter.newRequest.milestones.map((e, i) => {
        const element = e
        // delete element.id
        delete element.active
        return { ...element, position: i + 1 }
      })

      vacancy.vacancy_stages_attributes = milestones
    }

    if (
      state.vacancies.current.vacancy_stages.length &&
      vacancy.vacancy_stages_attributes &&
      vacancy.vacancy_stages_attributes.length
    ) {
      state.vacancies.current.vacancy_stages.forEach(item => {
        if (!vacancy.vacancy_stages_attributes.find(el => el.id === item.id)) {
          vacancy.vacancy_stages_attributes.push({
            id: item.id,
            _destroy: true,
          })
        }
      })
    }
    if (state.vacancies.current.account_vacancies.length) {
      state.vacancies.current.account_vacancies.forEach(item => {
        if (!vacancy.account_vacancies_attributes.find(el => el.id === item.id)) {
          vacancy.account_vacancies_attributes.push({
            id: item.id,
            _destroy: true,
          })
        }
      })
    }

    const req = await api.vacancies.update(state.vacancies.current.id, { vacancy })
    dispatch({ type: 'UPDATE_VACANCY_RES', payload: req.data })
    toastr.success('Изменения успешно сохранены')
  } catch (error) {
    dispatch({ type: 'UPDATE_VACANCY_FAIL', payload: error.message })
  }
}

export const getCurrentVacancy = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_CURRENT_VACANCY_REQ' })

  // try {
    const req = await api.vacancies.findById(id)
    dispatch({ type: 'GET_CURRENT_VACANCY_RES', payload: req.data })
  // } catch (error) {
    // dispatch({ type: 'GET_CURRENT_VACANCY_FAIL', payload: error.message })
  // }
}

export const selectLinkedVacancies = (payload): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'SELECT_LINKED_VACANCIES', payload })
}

export const resetCurrentVacancy = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'RESET_CURRENT_VACANCY' })
}

export const resetVacancies = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'RESET_VACANCIES' })
}

export const getVacancies = (count, status): ThunkAction => async (dispatch: Dispatch) => {
  const page = count || 1
  const per_page = 30 //page === 1 ? 30 : 15
  try {
    dispatch({ type: 'GET_ALL_VACANCIES_REQ' })
    const req = await api.vacancies.all(page, per_page, status)
    dispatch({ type: 'GET_ALL_VACANCIES_RES', payload: req.data, page })
  } catch (error) {
    dispatch({ type: 'GET_ALL_VACANCIES_FAIL', payload: error.message })
  }
}

export const getMyVacancies = (page, status): ThunkAction => async (dispatch: Dispatch) => {
  const per_page = 15

  try {
    dispatch({ type: 'GET_MY_VACANCIES_REQ' })
    const req = await api.vacancies.my(page, per_page, status)
    dispatch({ type: 'GET_MY_VACANCIES_RES', payload: req.data, page, per_page })
  } catch (error) {
    dispatch({ type: 'GET_MY_VACANCIES_FAIL', payload: error.message })
  }
}

export const changeMyVacanciesTab = (tab): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'CHANGE_MY_VACANCIES_TAB', payload: tab })
  dispatch(getMyVacancies(1, tab))
}

export const getVacanciesStat = (scope): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_VACANCIES_STATS_REQ' })
    const req = await api.vacancies.stats(scope)
    dispatch({ type: 'GET_VACANCIES_STATS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_VACANCIES_STATS_FAIL', payload: error.message })
  }
}

export const getStageVacancies = (stage): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_VACANCIES_WITH_STAGE_REQ' })
    const req = await api.vacancies.withStages(stage)
    dispatch({ type: 'GET_VACANCIES_WITH_STAGE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_VACANCIES_WITH_STAGE_FAIL', payload: error.message })
  }
}

// export const getMyVacancies = (count): ThunkAction => async (dispatch: Dispatch) => {
//   const page = count || 1
//   try {
//     dispatch({ type: 'GET_MY_VACANCIES_REQ' })
//     const req = await api.vacancies.myVacancies(page)
//     dispatch({ type: 'GET_MY_VACANCIES_RES', payload: req.data })
//   } catch (error) {
//     dispatch({ type: 'GET_MY_VACANCIES_FAIL', payload: error.message })
//   }
// }

export const getAllMyVacancies = (count): ThunkAction => async (dispatch: Dispatch) => {
  const page = count || 1
  try {
    dispatch({ type: 'GET_VACANCIES_REQ' })
    const req = await api.vacancies.allMyVacancies(page)
    dispatch({ type: 'GET_VACANCIES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_VACANCIES_FAIL', payload: error.message })
  }
}

export const updateState = (id, state): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SET_VACANCY_STATE_REQ' })

  try {
    const req = await api.vacancies.changeState(id, state)
    await dispatch({ type: 'SET_VACANCY_STATE_RES', payload: {data: req.data, id: id} })
    toastr.success('Статус вакансии успешно изменен')
    dispatch(getVacanciesStat({scope: 'all'}))
  } catch (error) {
    dispatch({ type: 'SET_VACANCY_STATE_FAIL', payload: error.message })
    toastr.error('Статус вакансии не изменен')
  }
}

export const sendNotification = (params): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SEND_NOTIFICATION_REQ' })

  try {
    const req = await api.vacancies.emailNotifications(params)
    dispatch({ type: 'SEND_NOTIFICATION_RES', payload: req.data })
    dispatch(reset('NoticeWindowForm'))
    toastr.success('Письмо успешно отправлено')
  } catch (error) {
    dispatch({ type: 'SEND_NOTIFICATION_FAIL', payload: error.message })
    toastr.error(error.message || 'Произошла ошибка при отправке письма')
  }
}

export const linkCandidatesToVacancy = (payload): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'LINK_CANDIDATES_TO_VACANCY_REQ' })

  try {
    const { vacancyId, candidates } = payload

    const vacancy = {
      candidate_vacancies_attributes: candidates,
    }

    const req = await api.vacancies.update(vacancyId, { vacancy })
    if ( get(req, 'data.success') === false ){
      toastr.error('Один или несколько кандидатов уже привязаны к данной вакансии')
      dispatch({ type: 'LINK_CANDIDATES_TO_VACANCY_FAIL', payload: req.data })
    } else {
      dispatch({ type: 'LINK_CANDIDATES_TO_VACANCY_RES', payload: req.data })
      const selectCandidates = await api.candidates.selectIndex(candidates.map(({ candidate_id }) => candidate_id ).join())
      dispatch({ type: 'REPLACE_CANDIDATES_AFTER_VACANCY_LINK', payload: selectCandidates.data })
      toastr.success('Привязка кандидатов к вакансии прошла успешно')
    }
  } catch (error) {
    dispatch({
      type: 'LINK_CANDIDATES_TO_VACANCY_FAIL',
      payload: error.message,
    })
  }
}
