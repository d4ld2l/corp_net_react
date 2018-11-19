import { pathOr } from 'ramda'
import api from '../../api'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import unionBy from 'lodash/unionBy'
import getBase64 from '../../helpers/getFileBase64'

import type {Dispatch, ThunkAction, GetState, State} from '../../types/actions'

export const getSurveys = ({ scope = 'new', loadMore = false } = {}) => async (dispatch, getState) => {
  dispatch({ type: 'GET_SURVEYS_REQ', loadMore })

  const currentPage = getState().surveys.page
  const perPage = getState().surveys.perPage
  const size = getState().surveys.data.length
  scope = scope || getState().surveys.scope || 'new'
  const scopeWas = getState().surveys.scope

  let page

  if (scope === scopeWas) {
    // if last page has less items than perPage -> request it again
    page = loadMore && (size % perPage === 0) ? currentPage + 1 : currentPage
  } else {
    page = 1
  }

  try {
    const req = await api.surveys.all(scope, page, perPage)
    const payload = { data: req.data, scope, page, loadMore}
    dispatch({ type: 'GET_SURVEYS_RES', payload })
    return req.data
  } catch (error) {
    dispatch({ type: 'GET_SURVEYS_FAIL', payload: error.message })
  }
}

export const getCurrentSurvey = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_SURVEY_REQ' })

  try {
    const req = await api.surveys.findById(id)
    dispatch({ type: 'GET_SURVEY_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'GET_SURVEY_FAIL', payload: error.message })
  }
}

export const publicSurvey = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: 'PUBLIC_SURVEY_REQ' })
  try {
    const res = await api.surveys.save({ id, survey: { state: 'published' } })
    if (res.status === 200){
      dispatch({ type: 'PUBLIC_SURVEY_RES', payload: res.data })
    }
    return res.status
  } catch (error) {
    dispatch({ type: 'PUBLIC_SURVEY_FAIL', payload: error.message })
  }
}

export const unpublicSurvey = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: 'UNPUBLIC_SURVEY_REQ' })
  try {
    const res = await api.surveys.save({ id, survey: { state: 'unpublished' } })
    if (res.status === 200){
      dispatch({ type: 'UNPUBLIC_SURVEY_RES', payload: res.data })
    }
    return res.status
  } catch (error) {
    dispatch({ type: 'UNPUBLIC_SURVEY_FAIL', payload: error.message })
  }
}

export const saveSurveyResults = (survey_id: number, result: any) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'SAVE_SURVEY_RESULTS_REQ' })

  const user_id = getState().user.user_id

  const survey_answers_attributes = {}
  const keys = Object.keys(result)

  keys.forEach(
    it =>{
      const answers = {}
      if (typeof result[it].variant === 'string') {
        result[it].variant !== 'own_answer' ? answers[result[it].variant] = true : answers['own_answer'] = result[it].text
      } else {
        result[it].variant.forEach((v) => (v !== 'own_answer' ? answers[v] = true : answers['own_answer'] = result[it].text))
      }
      survey_answers_attributes[it] = {
        answers: answers,
      }
    }
  )

  try {
    const params = {
      survey_result: {
        user_id,
        survey_id,
        survey_answers_attributes,
      },
    }

    const req = await api.surveys.saveResults(params)
    dispatch({ type: 'POST_SAVE_SURVEY_RESULTS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'POST_SAVE_SURVEY_RESULTS_FAIL', payload: error.message })
  }
}

export const saveSurvey = (id: number) => async (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'SAVE_CREATE_SURVEY_REQ' })
  const form = getState().form
  const accounts = getState().searchParticipants
  const surveyCurrent = getState().surveys.current
  const account_projects = accounts.all ? [] :
    accounts.participants.map( (it) => {
      if (it.isUser()) {
        return ({ account_id: it.account_id || it.id })
      } else {
        return it.accounts.map( (it) => ({ account_id: it.id }) )
      }
    })

  const account_attributes = uniqBy(flatten(account_projects), 'account_id')

  try {
    const values = {
      ...pathOr({}, ['SurveyForm', 'values'], form),
      // ...searchParticipants,
    }

    const surveyType = values.type_survey && values.type_survey.value

    const available_to_all = accounts.all

    let document

    if (values.document) {
      const base64 = await getBase64(values.document[0])
      document = base64.target.result
    }

    let symbol

    if (values.symbol) {
      const base64 = await getBase64(values.symbol[0])
      symbol = base64.target.result
    }

    const questions = await Promise.all(
      values.questions.map(async (question, index) => {
        let image

        if (question.image) {
          const base64 = await getBase64(question.image[0])
          image = base64.target.result
        }

        const answers = await Promise.all(
          question.answer_group.map(async ({ id, answer, image }, index) => {
            let _image

            if (image) {
              const base64 = await getBase64(image[0])
              _image = base64.target.result
            }

            return {
              id,
              wording: answer,
              image: _image,
              position: index + 1,
            }
          })
        )

        const id = Number.isInteger(question.id) ? question.id : undefined

        // always single answer for complex type (polls)
        const questionType = surveyType === 'complex' ? 'single' : question.type_question && question.type_question.value

        return {
          id,
          // _destroy: !!id,
          wording: question.description,
          position: index + 1,
          image: image,
          question_type: questionType,
          ban_own_answer: question.ban_own_answer && question.ban_own_answer.length > 0,
          offered_variants_attributes: answers,
        }
      })
    )

    const survey = {
      name: values.name,
      survey_type: surveyType,
      ends_at: values.ends_at && new Date(values.ends_at),
      anonymous: values.anonymously && values.anonymously.length > 0,
      available_to_all: available_to_all,
      survey_participants_attributes: unionBy(surveyCurrent.participants_list, account_attributes, 'account_id').map( it => {
        if ( account_attributes.find( i => i.account_id === it.account_id ) ) {
          return {
            ...it,
          }
        } else {
          return ({
            ...it,
            _destroy: true,
          })
        }
      }),
      note: values.description,
      document: document,
      symbol: symbol,
      background: values.background || '#20c58f',
      questions_attributes: questions,
    }

    const req = await api.surveys.save({ id, survey })
    dispatch({ type: 'POST_SAVE_SURVEY_RES', payload: req.data })
    return req.status
  } catch (error) {
    dispatch({ type: 'POST_SAVE_SURVEY_FAIL', payload: error.message })
  }
}

export const searchSurveys = (query, scope, { loadMore } = {}) => async (dispatch, getState) => {
  dispatch({ type: 'SEARCH_SURVEYS_REQ', loadMore })

  const currentPage = getState().surveys.page
  const perPage = getState().surveys.perPage
  const size = getState().surveys.data.length
  const queryWas = getState().surveys.search.query

  let page

  if (queryWas === query) { //
    // if last page has less items than perPage -> request it again
    page = loadMore && (size % perPage === 0) ? currentPage + 1 : currentPage
  } else {
    page = 1
  }

  query = query || queryWas

  try {
    const req = await api.surveys.search(query, scope, page, perPage)
    const payload = { data: req.data, query, scope, page, loadMore }

    dispatch({ type: 'SEARCH_SURVEYS_RES', payload })
    return req.data
  } catch (error) {
    dispatch({ type: 'SEARCH_SURVEYS_FAIL', payload: error.message })
  }
}

export const deleteSurvey = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_SURVEY_REQ' })

  try {
    const res = await api.surveys.delete(id)
    dispatch({ type: 'DELETE_SURVEY_RES', payload: id })
    return res.status
  } catch (error) {
    dispatch({ type: 'DELETE_SURVEY_FAIL', payload: error.message })
  }
}

export const resetSearch = () => async (dispatch: Dispatch) => {
  dispatch({ type: 'RESET_SEARCH_SURVEYS' })
}

export const createSurvey = () => async (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'POST_CREATE_SURVEY_REQ' })
  const form = getState().form
  const accounts = getState().searchParticipants
  const account_projects = accounts.all ? [] :
    accounts.participants.map( (it) => {
      if (it.isUser()) {
        return ({ account_id: it.id })
      } else {
        return it.accounts.map( (it) => ({ account_id: it.id }) )
      }
    })

  const account_attributes = uniqBy(flatten(account_projects), 'account_id')

  try {
    const values = pathOr({}, ['SurveyForm', 'values'], form)
    let document

    if (values.document) {
      const base64 = await getBase64(values.document[0])
      document = base64.target.result
    }

    let symbol

    if (values.symbol) {
      const base64 = await getBase64(values.symbol[0])
      symbol = base64.target.result
    }

    const questions = await Promise.all(
      values.questions.map(async (question, index) => {
        let image

        if (question.image) {
          const base64 = await getBase64(question.image[0])
          image = base64.target.result
        }

        const answers = await Promise.all(
          question.answer_group.map(async ({ answer, image }, index) => {
            let _image

            if (image) {
              const base64 = await getBase64(image[0])
              _image = base64.target.result
            }

            return {
              wording: answer,
              image: _image,
              position: index + 1,
            }
          })
        )

        return {
          wording: question.description,
          position: index + 1,
          image: question.image,
          question_type: question.type_question && question.type_question.value,
          ban_own_answer: question.ban_own_answer && question.ban_own_answer.length > 0,
          offered_variants_attributes: answers,
        }
      })
    )

    const survey = {
      name: values.name,
      survey_type: values.type_survey && values.type_survey.value,
      ends_at: values.ends_at && new Date(values.ends_at),
      anonymous: values.anonymously && values.anonymously.length > 0,
      available_to_all: accounts.all,
      survey_participants_attributes: account_attributes,
      note: values.description,
      document: document,
      symbol: symbol,
      background: values.background || '#20c58f',
      questions_attributes: questions,
    }

    const req = await api.surveys.create({ survey })
    dispatch({ type: 'POST_CREATE_SURVEY_RES', payload: req.data })
    return req.status
  } catch (error) {
    dispatch({ type: 'POST_CREATE_SURVEY_FAIL', payload: error.message })
  }
}
