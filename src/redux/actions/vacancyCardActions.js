import api from 'api-folder'
import { toastr } from 'react-redux-toastr'
import moment from 'moment/moment'
import { differenceBy } from 'lodash'
import type { Dispatch, ThunkAction } from 'types-folder/actions'
import isEmpty from 'lodash/isEmpty'

moment.locale('ru')

function createSearchParams(params){
  const search = {}
  if (params && params !== ''){
    search.q = params
  }
  return search
}

function createFilterParams(params) {
  const filter = {}
  if (params) {
    params.vacancy_stage_id && (filter.vacancy_stage_id = params.vacancy_stage_id)
  }
  return filter
}

export const getVacancyStages = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_VACANCY_STAGES_REQ' })
  try {
    const req = await api.vacancyCard.getVacancyStages(id)
    dispatch({ type: 'GET_VACANCY_STAGES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_VACANCY_STAGES_FAIL', payload: error.message })
  }
}

export const getVacancyCandidates = (id, page): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'GET_VACANCY_CANDIDATES_REQ' })

  const filterParams = createFilterParams(getState().vacancyCard.filter)
  const searchParams = createSearchParams(getState().vacancyCard.searchParams)
  const perPage = getState().vacancyCard.perPage

  try {
    const req = await api.vacancyCard.getVacancyCandidates(id, page, perPage, searchParams, filterParams)
    dispatch({ type: 'GET_VACANCY_CANDIDATES_RES', payload: req.data, page })
  } catch (error) {
    dispatch({ type: 'GET_VACANCY_CANDIDATES_FAIL', payload: error.message })
  }
}

export const setFilterVacancyCandidates = (vacancyId, vacancyStageId): ThunkAction => async (
  dispatch: Dispatch
) => {
  await dispatch({type: 'SET_FILTER_VACANSY_CANDIDATES', payload: vacancyStageId})
  dispatch(getVacancyCandidates(vacancyId, 1))
}

export const setSearchVacancyCandidates = (value): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  await dispatch({type: 'SET_SEARCH_VACANSY_CANDIDATES', payload: value})
  dispatch(getVacancyCandidates(getState().vacancyCard.current.id, 1))
}

export const getVacancyCandidate = (vacancyId, candidateId): ThunkAction => async (
  dispatch: Dispatch,
) => {
  dispatch({ type: 'OPEN_VACANCY_CANDIDATE_CARD' })
  dispatch({ type: 'GET_VACANCY_CANDIDATE_REQ' })

  try {
    const req = await api.vacancyCard.getVacancyCandidate(vacancyId, candidateId)
    dispatch({ type: 'GET_VACANCY_CANDIDATE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_VACANCY_CANDIDATE_FAIL', payload: error.message })
  }
}

export const getVacancyCandidateWithoutLoader = (vacancyId, candidateId): ThunkAction => async (
  dispatch: Dispatch,
) => {
  try {
    const req = await api.vacancyCard.getVacancyCandidate(vacancyId, candidateId)
    dispatch({ type: 'GET_VACANCY_CANDIDATE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_VACANCY_CANDIDATE_FAIL', payload: error.message })
  }
}

export const sendCandidateRate = (value, vacancy_stage_id, candidate_vacancy_id): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const commenter_id = getState().user.id
  const params = {
    candidate_rating: {
      rating_type: 'passing',
      value,
      vacancy_stage_id,
      candidate_vacancy_id,
      commenter_id,
    }
  }

  dispatch({ type: 'POST_CANDIDATE_RATE_REQ' })

  try {
    const req = await api.vacancyCard.sendRate(params)
    if (req.data.success){
      dispatch({ type: 'POST_CANDIDATE_RATE_RES', payload: req.data.data })
      dispatch(getVacancyStages(getState().vacancyCard.current.id))
      dispatch(getVacancyCandidateWithoutLoader(
        getState().vacancyCard.current.id,
        getState().vacancyCard.currentCandidate.candidate.id
      ))
      toastr.success('Оценка кандидату успешно выставлена.')
    } else {
      toastr.error('Произошла ошибка на сервере.')
    }
  } catch (error) {
    toastr.error('Произошла ошибка на сервере.')
    dispatch({ type: 'POST_CANDIDATE_RATE_FAIL', payload: error.message })
  }
}

export const sendCandidateComment = (body, candidateVacancyId): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const account_id = getState().user.id

  const params = {
    comment: {
      body,
      account_id,
    }
  }

  dispatch({ type: 'POST_CANDIDATE_COMMENT_REQ' })

  try {
    const req = await api.vacancyCard.sendComment(candidateVacancyId, params)
    if (req.data.success){
      dispatch({ type: 'POST_CANDIDATE_COMMENT_RES', payload: req.data.data })
      await dispatch(getVacancyCandidateWithoutLoader(
        getState().vacancyCard.current.id,
        getState().vacancyCard.currentCandidate.candidate.id
      ))
      toastr.success('Комментарий успешно отправлен.')
    } else {
      toastr.error('Произошла ошибка на сервере.')
    }
  } catch (error) {
    toastr.error('Произошла ошибка на сервере.')
    dispatch({ type: 'POST_CANDIDATE_COMMENT_FAIL', payload: error.message })
  }
}

export const transferCandidate = (stage_id): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const candidateId = getState().vacancyCard.currentCandidate.candidate.id
  const vacancyId = getState().vacancyCard.current.id

  const params = {
    candidate_ids: [candidateId],
    stage_id,
  }

  dispatch({ type: 'TRANSFER_CANDIDATE_REQ' })

  try {
    const req = await api.vacancyCard.transferCandidate(vacancyId, params)
    if (req.data.success){
      await dispatch({ type: 'TRANSFER_CANDIDATE_RES', payload: {candidateId, stageId: stage_id} })
      dispatch(getVacancyStages(getState().vacancyCard.current.id))
      dispatch(getVacancyCandidateWithoutLoader(
        getState().vacancyCard.current.id,
        getState().vacancyCard.currentCandidate.candidate.id
      ))
      toastr.success('Кандидат успешно переведен на этап.')
    } else {
      toastr.error('Произошла ошибка на сервере.')
    }
  } catch (error) {
    toastr.error('Произошла ошибка на сервере.')
    dispatch({ type: 'TRANSFER_CANDIDATE_FAIL', payload: error.message })
  }
}

export const transferCandidates = (stage_id, linkedCandidates): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const vacancyId = getState().vacancyCard.current.id
  const params = {
    candidate_ids: linkedCandidates,
    stage_id,
  }
  dispatch({ type: 'TRANSFER_CANDIDATES_REQ' })

  try {
    const req = await api.vacancyCard.transferCandidate(vacancyId, params)
    if (req.data.success){
      await dispatch({ type: 'TRANSFER_CANDIDATES_RES', payload: {linkedCandidates, stageId: stage_id} })
      dispatch(getVacancyStages(getState().vacancyCard.current.id))
      dispatch({ type: 'TOGGLE_DISABLED_ALL_CHECKED_VACANCY_OF_CANDIDATES' })
      toastr.success('Кандидат успешно переведен на этап.')
    } else {
      toastr.error(req.data.errors)
    }
  } catch (error) {
    toastr.error('Произошла ошибка на сервере.')
    dispatch({ type: 'TRANSFER_CANDIDATES_FAIL', payload: error.message })
  }
}

export const toggleCheckVacancyCandidate = (vacancyCandidateId): ThunkAction => async (
  dispatch: Dispatch,
) => {
  dispatch({ type: 'TOGGLE_CHECK_VACANCY_CANDIDATE', payload: vacancyCandidateId })
}

